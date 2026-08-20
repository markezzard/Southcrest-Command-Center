import { findKnownFold, normalizeOrgName } from "../aliases";
import { BUSINESS_DEVELOPMENT_ROLE } from "../config";
import { todayISO } from "../dates";
import { isPursuitStatus } from "../enums";
import { nextPrefixedCode, nextRelCode } from "./ids";
import {
  ACTIVITY_COLUMNS,
  CAMPUS_COLUMNS,
  CONTACT_COLUMNS,
  CONTACT_LINK_COLUMNS,
  OPPORTUNITY_COLUMNS,
  OWNERSHIP_COLUMNS,
  RELATIONSHIP_COLUMNS,
  REL_TASK_COLUMNS,
  TABS,
} from "./schema";
import type { LeadCaptureInput, LeadCapturePlan, MasterSnapshot, NextActionInput, PlannedWrite } from "./types";
import { valuesFromRow } from "./parse";

export function findDuplicateRelationship(snapshot: MasterSnapshot, organizationName: string) {
  const wanted = normalizeOrgName(organizationName);
  if (!wanted) return null;

  const exact = snapshot.relationships.find(
    (row) => normalizeOrgName(row["Organization Name"]) === wanted,
  );
  if (exact) {
    return {
      relCode: exact["REL Code"],
      organizationName: exact["Organization Name"],
      reason: "An organization with this name already exists on the Relationships tab.",
    };
  }

  const fold = findKnownFold(organizationName);
  if (fold) {
    const live = snapshot.relationships.find((row) => row["REL Code"] === fold.relCode);
    if (live) {
      return {
        relCode: live["REL Code"],
        organizationName: live["Organization Name"],
        reason: fold.note,
      };
    }
  }

  return null;
}

export function planLeadCapture(
  snapshot: MasterSnapshot,
  input: LeadCaptureInput,
  now = new Date(),
  timeZone = "America/New_York",
): LeadCapturePlan {
  const organizationName = input.organizationName.trim();
  if (!organizationName) {
    throw new Error("Organization name is required.");
  }
  if (!input.status.trim()) {
    throw new Error("Relationship status is required.");
  }
  if (!input.type.trim()) {
    throw new Error("Organization type is required.");
  }

  const duplicateOf = findDuplicateRelationship(snapshot, organizationName);
  if (duplicateOf) {
    return { relCode: duplicateOf.relCode, writes: [], duplicateOf };
  }

  const created = todayISO(now, timeZone);
  const relCode = nextRelCode(snapshot.relationships.map((row) => row["REL Code"]));
  const writes: PlannedWrite[] = [];

  writes.push({
    tab: TABS.Relationships,
    values: valuesFromRow(RELATIONSHIP_COLUMNS, {
      "REL Code": relCode,
      "Organization Name": organizationName,
      Type: input.type.trim(),
      "Relationship Status": input.status.trim(),
      "Relationship Owner Role": BUSINESS_DEVELOPMENT_ROLE,
      "Relationship Owner Name": "",
      Protected: "N",
      "Lead Source": input.leadSource.trim() || "BD-generated",
      "Relationship Strength": input.relationshipStrength?.trim() ?? "",
      "Last Meaningful Contact": created,
      "Next Action": input.nextAction?.trim() ?? "",
      "Next Action Date": input.nextActionDate?.trim() ?? "",
      Notes: input.notes?.trim() ?? "",
      "Created Date": created,
    }),
  });

  writes.push({
    tab: TABS.Ownership,
    values: valuesFromRow(OWNERSHIP_COLUMNS, {
      "REL Code": relCode,
      Role: BUSINESS_DEVELOPMENT_ROLE,
      "Person Name": "",
      Protected: "N",
    }),
  });

  if (input.campusName?.trim()) {
    const campusId = nextPrefixedCode(
      "CAM",
      snapshot.campuses.map((row) => row["Campus ID"]),
    );
    writes.push({
      tab: TABS.Campuses,
      values: valuesFromRow(CAMPUS_COLUMNS, {
        "Campus ID": campusId,
        "REL Code": relCode,
        "Campus Name": input.campusName.trim(),
        City: input.city?.trim() ?? "",
        County: input.county?.trim() ?? "",
        State: input.state?.trim() ?? "",
        Address: input.address?.trim() ?? "",
        Grades: input.grades?.trim() ?? "",
        Enrollment: input.enrollment?.trim() ?? "",
        Notes: input.campusNotes?.trim() ?? "",
      }),
    });
  }

  if (input.contactName?.trim()) {
    const existingContactIds = snapshot.contacts.map((row) => row["Contact ID"]);
    const contactId = nextPrefixedCode("CON", existingContactIds);
    writes.push({
      tab: TABS.Contacts,
      values: valuesFromRow(CONTACT_COLUMNS, {
        "Contact ID": contactId,
        "Full Name": input.contactName.trim(),
        Title: input.contactTitle?.trim() ?? "",
        Email: input.contactEmail?.trim() ?? "",
        Phone: input.contactPhone?.trim() ?? "",
        Notes: input.contactNotes?.trim() ?? "",
      }),
    });
    writes.push({
      tab: TABS.ContactLinks,
      values: valuesFromRow(CONTACT_LINK_COLUMNS, {
        "Contact ID": contactId,
        "REL Code": relCode,
        Role: input.contactRole?.trim() || "Key Contact",
        Primary: "Y",
      }),
    });
  }

  if (input.nextAction?.trim()) {
    const taskId = nextPrefixedCode(
      "TSK",
      snapshot.tasks.map((row) => row["Task ID"]),
    );
    writes.push({
      tab: TABS.RelTasks,
      values: valuesFromRow(REL_TASK_COLUMNS, {
        "Task ID": taskId,
        "REL Code": relCode,
        Task: input.nextAction.trim(),
        "Owner Role": BUSINESS_DEVELOPMENT_ROLE,
        "Owner Name": "",
        Status: "Open",
        Priority: "Normal",
        "Due Date": input.nextActionDate?.trim() ?? "",
        Notes: "",
        "Created Date": created,
        "Completed Date": "",
      }),
    });
  }

  writes.push({
    tab: TABS.Activities,
    values: valuesFromRow(ACTIVITY_COLUMNS, {
      "Activity ID": nextPrefixedCode(
        "ACT",
        snapshot.activities.map((row) => row["Activity ID"]),
      ),
      "REL Code": relCode,
      "SC Code": "",
      Type: "Lead captured",
      Date: created,
      Notes: input.notes?.trim() ?? `Captured ${organizationName} as ${input.status}.`,
      "Next Action": input.nextAction?.trim() ?? "",
      "Next Action Date": input.nextActionDate?.trim() ?? "",
    }),
  });

  const shouldWriteOpportunity =
    input.createOpportunity !== false &&
    (input.createOpportunity === true ||
      isPursuitStatus(input.status) ||
      Boolean(input.campusName?.trim()) ||
      Boolean(input.opportunityName?.trim()));

  if (shouldWriteOpportunity) {
    const opportunityName =
      input.opportunityName?.trim() ||
      (input.campusName?.trim() ? `${organizationName} — ${input.campusName.trim()}` : `${organizationName} — new pursuit`);
    writes.push({
      tab: TABS.Opportunities,
      values: valuesFromRow(OPPORTUNITY_COLUMNS, {
        "OPP Code": nextPrefixedCode(
          "OPP",
          snapshot.opportunities.map((row) => row["OPP Code"]),
        ),
        "REL Code": relCode,
        "Opportunity Name": opportunityName,
        Type: input.opportunityType?.trim() || "Expansion",
        Stage: "Identified",
        "Estimated Value": "",
        Probability: "",
        "Opportunity Lead Role": BUSINESS_DEVELOPMENT_ROLE,
        "SC Code": "",
        "Next Action": input.nextAction?.trim() ?? "",
        "Next Action Date": input.nextActionDate?.trim() ?? "",
        Notes: "Pursuit only. No SC code. Job codes are minted on the jobs book through the existing human gate.",
      }),
    });
  }

  return { relCode, writes };
}

export function planNextActionUpdate(
  snapshot: MasterSnapshot,
  input: NextActionInput,
  now = new Date(),
  timeZone = "America/New_York",
): { writes: PlannedWrite[]; updates: Array<{ tab: string; rowNumber: number; values: string[] }> } {
  const relationship = snapshot.relationships.find((row) => row["REL Code"] === input.relCode);
  if (!relationship) {
    throw new Error(`Relationship ${input.relCode} was not found on the Relationships tab.`);
  }
  if (!input.nextAction.trim()) {
    throw new Error("Next action is required.");
  }

  const today = todayISO(now, timeZone);
  const updatedRelationship = {
    ...relationship,
    "Next Action": input.nextAction.trim(),
    "Next Action Date": input.nextActionDate.trim(),
    "Last Meaningful Contact": input.markContacted === false ? relationship["Last Meaningful Contact"] : today,
  };

  const writes: PlannedWrite[] = [];
  writes.push({
    tab: TABS.RelTasks,
    values: valuesFromRow(REL_TASK_COLUMNS, {
      "Task ID": nextPrefixedCode(
        "TSK",
        snapshot.tasks.map((row) => row["Task ID"]),
      ),
      "REL Code": input.relCode,
      Task: input.nextAction.trim(),
      "Owner Role": BUSINESS_DEVELOPMENT_ROLE,
      "Owner Name": "",
      Status: "Open",
      Priority: "Normal",
      "Due Date": input.nextActionDate.trim(),
      Notes: input.notes?.trim() ?? "",
      "Created Date": today,
      "Completed Date": "",
    }),
  });
  writes.push({
    tab: TABS.Activities,
    values: valuesFromRow(ACTIVITY_COLUMNS, {
      "Activity ID": nextPrefixedCode(
        "ACT",
        snapshot.activities.map((row) => row["Activity ID"]),
      ),
      "REL Code": input.relCode,
      "SC Code": "",
      Type: "Next action set",
      Date: today,
      Notes: input.notes?.trim() ?? "",
      "Next Action": input.nextAction.trim(),
      "Next Action Date": input.nextActionDate.trim(),
    }),
  });

  return {
    writes,
    updates: [
      {
        tab: TABS.Relationships,
        rowNumber: relationship.rowNumber,
        values: valuesFromRow(RELATIONSHIP_COLUMNS, updatedRelationship),
      },
    ],
  };
}
