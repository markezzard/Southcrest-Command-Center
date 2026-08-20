import type {
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

export type ColumnRecord<C extends readonly string[]> = {
  [K in C[number]]: string;
};

export type SheetRow<C extends readonly string[]> = ColumnRecord<C> & {
  rowNumber: number;
};

export type RelationshipRow = SheetRow<typeof RELATIONSHIP_COLUMNS>;
export type CampusRow = SheetRow<typeof CAMPUS_COLUMNS>;
export type ContactRow = SheetRow<typeof CONTACT_COLUMNS>;
export type ContactLinkRow = SheetRow<typeof CONTACT_LINK_COLUMNS>;
export type OwnershipRow = SheetRow<typeof OWNERSHIP_COLUMNS>;
export type OpportunityRow = SheetRow<typeof OPPORTUNITY_COLUMNS>;
export type RelTaskRow = SheetRow<typeof REL_TASK_COLUMNS>;
export type ActivityRow = SheetRow<typeof ACTIVITY_COLUMNS>;
export type JobRow = SheetRow<typeof JOB_COLUMNS>;

export type MasterSnapshot = {
  relationships: RelationshipRow[];
  campuses: CampusRow[];
  contacts: ContactRow[];
  contactLinks: ContactLinkRow[];
  ownership: OwnershipRow[];
  opportunities: OpportunityRow[];
  tasks: RelTaskRow[];
  activities: ActivityRow[];
  jobs: JobRow[];
};

export type LinkedContact = ContactRow & {
  role: string;
  primary: boolean;
};

export type RelationshipRecord = {
  relationship: RelationshipRow;
  campuses: CampusRow[];
  contacts: LinkedContact[];
  ownership: OwnershipRow[];
  opportunities: OpportunityRow[];
  tasks: RelTaskRow[];
  activities: ActivityRow[];
  jobs: JobRow[];
};

export type LeadCaptureInput = {
  organizationName: string;
  type: string;
  status: string;
  leadSource: string;
  relationshipStrength?: string;
  notes?: string;
  campusName?: string;
  city?: string;
  county?: string;
  state?: string;
  address?: string;
  grades?: string;
  enrollment?: string;
  campusNotes?: string;
  contactName?: string;
  contactTitle?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactRole?: string;
  contactNotes?: string;
  nextAction?: string;
  nextActionDate?: string;
  opportunityName?: string;
  opportunityType?: string;
  createOpportunity?: boolean;
};

export type NextActionInput = {
  relCode: string;
  nextAction: string;
  nextActionDate: string;
  notes?: string;
  markContacted?: boolean;
};

export type PlannedWrite = {
  tab: string;
  values: string[];
};

export type LeadCapturePlan = {
  relCode: string;
  writes: PlannedWrite[];
  duplicateOf?: { relCode: string; organizationName: string; reason: string };
};

export type LeadCaptureResult = {
  relCode: string;
  writes: PlannedWrite[];
};
