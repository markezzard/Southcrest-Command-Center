import { google } from "googleapis";
import { SPI_RELATIONSHIP_MASTER_SHEET_ID } from "../config";
import { MissingSheetCredentialError } from "../errors";
import { planLeadCapture, planNextActionUpdate } from "./capture";
import { loadSheetCredentials } from "./credentials";
import { rowsFromValues } from "./parse";
import { assembleRelationshipRecord } from "./record";
import {
  ACTIVITY_COLUMNS,
  CAMPUS_COLUMNS,
  CONTACT_COLUMNS,
  CONTACT_LINK_COLUMNS,
  JOB_COLUMNS,
  OPPORTUNITY_COLUMNS,
  OWNERSHIP_COLUMNS,
  RELATIONSHIP_COLUMNS,
  REL_TASK_COLUMNS,
  TABS,
} from "./schema";
import type {
  LeadCaptureInput,
  LeadCaptureResult,
  MasterSnapshot,
  NextActionInput,
  PlannedWrite,
  RelationshipRecord,
} from "./types";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

type SheetsApi = ReturnType<typeof google.sheets>;

function quoteRange(tab: string, a1: string): string {
  return `'${tab.replace(/'/g, "''")}'!${a1}`;
}

export class RelationshipMasterClient {
  constructor(
    private readonly sheets: SheetsApi,
    private readonly spreadsheetId: string = SPI_RELATIONSHIP_MASTER_SHEET_ID,
  ) {}

  static fromEnv(): RelationshipMasterClient {
    const credentials = loadSheetCredentials();
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: SCOPES,
    });
    return new RelationshipMasterClient(google.sheets({ version: "v4", auth }));
  }

  async loadSnapshot(): Promise<MasterSnapshot> {
    const ranges = [
      quoteRange(TABS.Relationships, "A:N"),
      quoteRange(TABS.Campuses, "A:J"),
      quoteRange(TABS.Contacts, "A:F"),
      quoteRange(TABS.ContactLinks, "A:D"),
      quoteRange(TABS.Ownership, "A:D"),
      quoteRange(TABS.Opportunities, "A:L"),
      quoteRange(TABS.RelTasks, "A:K"),
      quoteRange(TABS.Activities, "A:H"),
      quoteRange(TABS.Jobs, "A:H"),
    ];

    const response = await this.sheets.spreadsheets.values.batchGet({
      spreadsheetId: this.spreadsheetId,
      ranges,
    });
    const valueRanges = response.data.valueRanges ?? [];

    return {
      relationships: rowsFromValues(RELATIONSHIP_COLUMNS, asGrid(valueRanges[0]?.values), TABS.Relationships),
      campuses: rowsFromValues(CAMPUS_COLUMNS, asGrid(valueRanges[1]?.values), TABS.Campuses),
      contacts: rowsFromValues(CONTACT_COLUMNS, asGrid(valueRanges[2]?.values), TABS.Contacts),
      contactLinks: rowsFromValues(CONTACT_LINK_COLUMNS, asGrid(valueRanges[3]?.values), TABS.ContactLinks),
      ownership: rowsFromValues(OWNERSHIP_COLUMNS, asGrid(valueRanges[4]?.values), TABS.Ownership),
      opportunities: rowsFromValues(OPPORTUNITY_COLUMNS, asGrid(valueRanges[5]?.values), TABS.Opportunities),
      tasks: rowsFromValues(REL_TASK_COLUMNS, asGrid(valueRanges[6]?.values), TABS.RelTasks),
      activities: rowsFromValues(ACTIVITY_COLUMNS, asGrid(valueRanges[7]?.values), TABS.Activities),
      jobs: rowsFromValues(JOB_COLUMNS, asGrid(valueRanges[8]?.values), TABS.Jobs),
    };
  }

  async getRelationship(relCode: string): Promise<RelationshipRecord | null> {
    const snapshot = await this.loadSnapshot();
    return assembleRelationshipRecord(snapshot, relCode);
  }

  async captureLead(input: LeadCaptureInput): Promise<LeadCaptureResult> {
    const snapshot = await this.loadSnapshot();
    const plan = planLeadCapture(snapshot, input);
    if (plan.duplicateOf) {
      const error = new Error(plan.duplicateOf.reason);
      (error as Error & { duplicateOf: typeof plan.duplicateOf }).duplicateOf = plan.duplicateOf;
      throw error;
    }
    await this.commitWrites(plan.writes);
    return { relCode: plan.relCode, writes: plan.writes };
  }

  async updateNextAction(input: NextActionInput): Promise<void> {
    const snapshot = await this.loadSnapshot();
    const plan = planNextActionUpdate(snapshot, input);
    await this.commitUpdates(plan.updates);
    await this.commitWrites(plan.writes);
  }

  private async commitWrites(writes: PlannedWrite[]): Promise<void> {
    for (const write of writes) {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: quoteRange(write.tab, "A:Z"),
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [write.values] },
      });
    }
  }

  private async commitUpdates(
    updates: Array<{ tab: string; rowNumber: number; values: string[] }>,
  ): Promise<void> {
    if (updates.length === 0) return;
    await this.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        valueInputOption: "USER_ENTERED",
        data: updates.map((update) => ({
          range: quoteRange(update.tab, `A${update.rowNumber}:Z${update.rowNumber}`),
          values: [update.values],
        })),
      },
    });
  }
}

function asGrid(values: unknown): string[][] {
  if (!Array.isArray(values)) return [];
  return values.map((row) => (Array.isArray(row) ? row.map((cell) => String(cell ?? "")) : []));
}

export function getMasterClient(): RelationshipMasterClient {
  try {
    return RelationshipMasterClient.fromEnv();
  } catch (error) {
    if (error instanceof MissingSheetCredentialError) {
      throw error;
    }
    throw error;
  }
}
