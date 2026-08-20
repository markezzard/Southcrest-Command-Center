import { describe, expect, it } from "vitest";
import { planLeadCapture } from "./capture";
import { liveSnapshotFixture } from "./fixtures";
import { FORBIDDEN_WRITE_TABS, OPPORTUNITY_COLUMNS, TABS } from "./schema";
import { assembleRelationshipRecord } from "./record";

describe("lead capture write plan", () => {
  it("writes a new Target onto Relationship Master tabs and never onto Jobs", () => {
    const plan = planLeadCapture(liveSnapshotFixture(), {
      organizationName: "Harbor Charter Network",
      type: "Operator",
      status: "Target",
      leadSource: "BD-generated",
      campusName: "Palm Harbor site",
      city: "Palm Harbor",
      state: "FL",
      contactName: "Jordan Lee",
      contactTitle: "Board chair",
      contactRole: "Board",
      nextAction: "Call board chair",
      nextActionDate: "2026-08-22",
      notes: "Met at conference.",
    });

    expect(plan.duplicateOf).toBeUndefined();
    expect(plan.relCode).toBe("REL-0014");
    expect(plan.writes.map((write) => write.tab)).toEqual([
      TABS.Relationships,
      TABS.Ownership,
      TABS.Campuses,
      TABS.Contacts,
      TABS.ContactLinks,
      TABS.RelTasks,
      TABS.Activities,
      TABS.Opportunities,
    ]);
    expect(plan.writes.some((write) => (FORBIDDEN_WRITE_TABS as readonly string[]).includes(write.tab))).toBe(
      false,
    );

    const opportunity = plan.writes.find((write) => write.tab === TABS.Opportunities);
    const scIndex = OPPORTUNITY_COLUMNS.indexOf("SC Code");
    expect(opportunity?.values[scIndex]).toBe("");
    expect(opportunity?.values.join(" ")).not.toMatch(/SC-\d{4}/);
  });

  it("refuses to create a second Plato or put Plato on Academica", () => {
    const snapshot = liveSnapshotFixture();
    const plato = planLeadCapture(snapshot, {
      organizationName: "Plato",
      type: "Operator",
      status: "Prospect",
      leadSource: "BD-generated",
    });
    expect(plato.duplicateOf?.relCode).toBe("REL-0002");
    expect(plato.duplicateOf?.organizationName).toBe("Plato Academy");
    expect(plato.writes).toEqual([]);

    const somerset = planLeadCapture(snapshot, {
      organizationName: "Somerset Academy",
      type: "School",
      status: "Prospect",
      leadSource: "Company-generated",
    });
    expect(somerset.duplicateOf?.relCode).toBe("REL-0001");
  });

  it("does not copy signed-up Jobs onto Opportunities", () => {
    const snapshot = liveSnapshotFixture();
    const academicaJobs = snapshot.jobs.filter((job) => job["REL Code"] === "REL-0001");
    expect(academicaJobs.some((job) => job["SC Code"] === "SC-0002")).toBe(true);

    const plan = planLeadCapture(snapshot, {
      organizationName: "Academica",
      type: "CMO",
      status: "Active Client",
      leadSource: "BD-generated",
    });
    expect(plan.duplicateOf?.relCode).toBe("REL-0001");
    expect(plan.writes.filter((write) => write.tab === TABS.Opportunities)).toEqual([]);
  });
});

describe("related jobs", () => {
  it("shows Jobs-tab SC codes on the parent REL and leaves completed jobs from changing status", () => {
    const mason = assembleRelationshipRecord(liveSnapshotFixture(), "REL-0012");
    expect(mason?.relationship["Relationship Status"]).toBe("Active Client");
    expect(mason?.jobs.map((job) => job["SC Code"])).toEqual(["SC-0048"]);
    expect(mason?.jobs[0]["Life Cycle Status"]).toBe("Completed");
    expect(mason?.relationship["Relationship Status"]).not.toBe("Completed");

    const plato = assembleRelationshipRecord(liveSnapshotFixture(), "REL-0002");
    expect(plato?.jobs.every((job) => job["REL Code"] === "REL-0002")).toBe(true);
    expect(plato?.jobs.some((job) => job["REL Code"] === "REL-0001")).toBe(false);
  });
});
