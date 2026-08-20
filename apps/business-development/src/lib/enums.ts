/** Live Relationship Status values plus the V1 capture set. */
export const RELATIONSHIP_STATUSES = [
  "Target",
  "Prospect",
  "Developing Relationship",
  "Active Client",
  "On Hold",
  "Dormant",
] as const;

export type RelationshipStatus = (typeof RELATIONSHIP_STATUSES)[number];

/** Types observed on the live Relationships tab, plus later-phase scaffolds. */
export const RELATIONSHIP_TYPES = [
  "CMO",
  "Operator",
  "School",
  "Other",
  "Board",
  "District",
  "Developer",
] as const;

export type RelationshipType = (typeof RELATIONSHIP_TYPES)[number];

export const LEAD_SOURCES = ["BD-generated", "Company-generated"] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export const RELATIONSHIP_STRENGTHS = ["Cold", "Warm", "Strong"] as const;

export type RelationshipStrength = (typeof RELATIONSHIP_STRENGTHS)[number];

export const OPPORTUNITY_TYPES = [
  "Expansion",
  "New Campus",
  "Land Search",
  "Remodel",
  "Maintenance",
  "Other",
] as const;

export type OpportunityType = (typeof OPPORTUNITY_TYPES)[number];

export const OPPORTUNITY_STAGES = [
  "Identified",
  "Qualifying",
  "Active Pursuit",
] as const;

export type OpportunityStage = (typeof OPPORTUNITY_STAGES)[number];

export const PURSUIT_STATUSES: readonly RelationshipStatus[] = [
  "Target",
  "Prospect",
  "Developing Relationship",
];

export function isPursuitStatus(status: string): boolean {
  return (PURSUIT_STATUSES as readonly string[]).includes(status);
}
