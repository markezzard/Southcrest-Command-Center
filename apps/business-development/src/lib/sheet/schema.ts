/**
 * Live SPI Relationship Master headings, verified 20 Aug 2026 against
 * https://docs.google.com/spreadsheets/d/1mE1Y2vJ5uKRW-VcQ6oMs9yUhmlwc-q91vXlFp7caMCg
 * Folder: 01_Project Controls. Do not invent parallel columns.
 */
export const TABS = {
  Rules: "Rules",
  Relationships: "Relationships",
  Campuses: "Campuses",
  Contacts: "Contacts",
  ContactLinks: "Contact Links",
  Ownership: "Ownership",
  Opportunities: "Opportunities",
  RelTasks: "REL Tasks",
  Activities: "Activities",
  Jobs: "Jobs",
} as const;

export type TabName = (typeof TABS)[keyof typeof TABS];

export const RELATIONSHIP_COLUMNS = [
  "REL Code",
  "Organization Name",
  "Type",
  "Relationship Status",
  "Relationship Owner Role",
  "Relationship Owner Name",
  "Protected",
  "Lead Source",
  "Relationship Strength",
  "Last Meaningful Contact",
  "Next Action",
  "Next Action Date",
  "Notes",
  "Created Date",
] as const;

export const CAMPUS_COLUMNS = [
  "Campus ID",
  "REL Code",
  "Campus Name",
  "City",
  "County",
  "State",
  "Address",
  "Grades",
  "Enrollment",
  "Notes",
] as const;

export const CONTACT_COLUMNS = [
  "Contact ID",
  "Full Name",
  "Title",
  "Email",
  "Phone",
  "Notes",
] as const;

export const CONTACT_LINK_COLUMNS = ["Contact ID", "REL Code", "Role", "Primary"] as const;

export const OWNERSHIP_COLUMNS = ["REL Code", "Role", "Person Name", "Protected"] as const;

export const OPPORTUNITY_COLUMNS = [
  "OPP Code",
  "REL Code",
  "Opportunity Name",
  "Type",
  "Stage",
  "Estimated Value",
  "Probability",
  "Opportunity Lead Role",
  "SC Code",
  "Next Action",
  "Next Action Date",
  "Notes",
] as const;

export const REL_TASK_COLUMNS = [
  "Task ID",
  "REL Code",
  "Task",
  "Owner Role",
  "Owner Name",
  "Status",
  "Priority",
  "Due Date",
  "Notes",
  "Created Date",
  "Completed Date",
] as const;

export const ACTIVITY_COLUMNS = [
  "Activity ID",
  "REL Code",
  "SC Code",
  "Type",
  "Date",
  "Notes",
  "Next Action",
  "Next Action Date",
] as const;

export const JOB_COLUMNS = [
  "SC Code",
  "REL Code",
  "Project Name",
  "Master Stage",
  "Life Cycle Status",
  "City",
  "State",
  "Notes",
] as const;

export const TAB_COLUMNS = {
  [TABS.Relationships]: RELATIONSHIP_COLUMNS,
  [TABS.Campuses]: CAMPUS_COLUMNS,
  [TABS.Contacts]: CONTACT_COLUMNS,
  [TABS.ContactLinks]: CONTACT_LINK_COLUMNS,
  [TABS.Ownership]: OWNERSHIP_COLUMNS,
  [TABS.Opportunities]: OPPORTUNITY_COLUMNS,
  [TABS.RelTasks]: REL_TASK_COLUMNS,
  [TABS.Activities]: ACTIVITY_COLUMNS,
  [TABS.Jobs]: JOB_COLUMNS,
} as const;

export type WritableTab = keyof typeof TAB_COLUMNS;

export const ID_PREFIXES = {
  REL: "REL",
  CAM: "CAM",
  CON: "CON",
  OPP: "OPP",
  TSK: "TSK",
  ACT: "ACT",
} as const;

/** This app never mints job codes. Jobs are read-only from the Jobs tab. */
export const FORBIDDEN_WRITE_TABS = [TABS.Jobs, TABS.Rules] as const;
