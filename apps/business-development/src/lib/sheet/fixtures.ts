import type { MasterSnapshot, SheetRow } from "./types";
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
} from "./schema";

/** Live Relationships headings + rows as read 20 Aug 2026. Tests only — not a runtime store. */
export const LIVE_RELATIONSHIP_HEADERS = [...RELATIONSHIP_COLUMNS];

export const LIVE_RELATIONSHIP_ROWS = [
  [
    "REL-0001",
    "Academica",
    "CMO",
    "Active Client",
    "",
    "",
    "N",
    "",
    "",
    "",
    "",
    "",
    "Somerset Academy (former REL-0013) is an Academica school, folded here 2026-08-18 per Mark.",
    "2026-08-18",
  ],
  [
    "REL-0002",
    "Plato Academy",
    "Operator",
    "On Hold",
    "",
    "",
    "N",
    "",
    "",
    "",
    "",
    "",
    "Plato Academy (former REL-0010) merged here; code moved from REL-0001 to REL-0002 2026-08-18 per Mark so Academica could be REL-0001.",
    "2026-08-18",
  ],
  [
    "REL-0004",
    "Discovery Science",
    "Operator",
    "Active Client",
    "",
    "",
    "N",
    "",
    "",
    "",
    "",
    "",
    "",
    "2026-08-18",
  ],
  ["REL-0005", "DAS", "Operator", "Active Client", "", "", "N", "", "", "", "", "", "", "2026-08-18"],
  ["REL-0006", "Imagine Schools", "CMO", "Active Client", "", "", "N", "", "", "", "", "", "", "2026-08-18"],
  [
    "REL-0009",
    "Alliance Development",
    "Other",
    "On Hold",
    "",
    "",
    "N",
    "",
    "",
    "",
    "",
    "",
    "Cambo (former REL-0008) and Robert Cambo (former REL-0011) merged here 2026-08-18 per Mark.",
    "2026-08-18",
  ],
  [
    "REL-0012",
    "Mason Classical Academy",
    "School",
    "Active Client",
    "",
    "",
    "N",
    "",
    "",
    "",
    "",
    "",
    "Gym and K-8 completed; plan to continue work. Status set Active Client 2026-08-18 per Mark.",
    "2026-08-18",
  ],
];

export const LIVE_JOB_ROWS = [
  ["SC-0001", "REL-0002", "19th St", "", "On Hold", "Palm Harbor", "FL", ""],
  ["SC-0002", "REL-0001", "23rd St SW", "Prospecting", "Active", "Lehigh Acres", "FL", ""],
  ["SC-0048", "REL-0012", "Mason Classical Academy - Vanderbilt K-8", "Completed", "Completed", "Naples", "FL", ""],
  ["SC-0049", "REL-0001", "Somerset Academy - Avenir", "Completed", "Completed", "", "FL", ""],
  ["SC-0022", "", "Autism Collier Charter School", "Prospecting", "Active", "Naples", "FL", ""],
];

function toRows<C extends readonly string[]>(columns: C, rows: string[][], startRow = 2): SheetRow<C>[] {
  return rows.map((cells, index) => {
    const record = { rowNumber: startRow + index } as SheetRow<C>;
    for (const [colIndex, column] of columns.entries()) {
      (record as Record<string, string | number>)[column] = cells[colIndex] ?? "";
    }
    return record;
  });
}

export function liveSnapshotFixture(): MasterSnapshot {
  return {
    relationships: toRows(RELATIONSHIP_COLUMNS, LIVE_RELATIONSHIP_ROWS),
    campuses: toRows(CAMPUS_COLUMNS, []),
    contacts: toRows(CONTACT_COLUMNS, []),
    contactLinks: toRows(CONTACT_LINK_COLUMNS, []),
    ownership: toRows(OWNERSHIP_COLUMNS, []),
    opportunities: toRows(OPPORTUNITY_COLUMNS, []),
    tasks: toRows(REL_TASK_COLUMNS, []),
    activities: toRows(ACTIVITY_COLUMNS, []),
    jobs: toRows(JOB_COLUMNS, LIVE_JOB_ROWS),
  };
}
