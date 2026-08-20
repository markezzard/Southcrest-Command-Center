import { describe, expect, it } from "vitest";
import { assertHeaders } from "./parse";
import {
  CAMPUS_COLUMNS,
  CONTACT_COLUMNS,
  CONTACT_LINK_COLUMNS,
  JOB_COLUMNS,
  OPPORTUNITY_COLUMNS,
  OWNERSHIP_COLUMNS,
  RELATIONSHIP_COLUMNS,
  REL_TASK_COLUMNS,
  ACTIVITY_COLUMNS,
} from "./schema";

describe("live Relationship Master headings", () => {
  it("locks the headings verified on the live workbook", () => {
    assertHeaders("Relationships", RELATIONSHIP_COLUMNS, [...RELATIONSHIP_COLUMNS]);
    assertHeaders("Campuses", CAMPUS_COLUMNS, [...CAMPUS_COLUMNS]);
    assertHeaders("Contacts", CONTACT_COLUMNS, [...CONTACT_COLUMNS]);
    assertHeaders("Contact Links", CONTACT_LINK_COLUMNS, [...CONTACT_LINK_COLUMNS]);
    assertHeaders("Ownership", OWNERSHIP_COLUMNS, [...OWNERSHIP_COLUMNS]);
    assertHeaders("Opportunities", OPPORTUNITY_COLUMNS, [...OPPORTUNITY_COLUMNS]);
    assertHeaders("REL Tasks", REL_TASK_COLUMNS, [...REL_TASK_COLUMNS]);
    assertHeaders("Activities", ACTIVITY_COLUMNS, [...ACTIVITY_COLUMNS]);
    assertHeaders("Jobs", JOB_COLUMNS, [...JOB_COLUMNS]);

    expect(RELATIONSHIP_COLUMNS[0]).toBe("REL Code");
    expect(JOB_COLUMNS[0]).toBe("SC Code");
    expect(OPPORTUNITY_COLUMNS.includes("SC Code")).toBe(true);
  });
});
