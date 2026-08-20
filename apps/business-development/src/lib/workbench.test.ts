import { describe, expect, it } from "vitest";
import { liveSnapshotFixture } from "./sheet/fixtures";
import { buildWorkbench } from "./workbench";

describe("workbench", () => {
  it("lists live relationships with no recent contact and no next action", () => {
    const board = buildWorkbench(liveSnapshotFixture(), "2026-08-20", 30);
    const names = board.relationships.map((row) => row["Organization Name"]);
    expect(names).toContain("Academica");
    expect(names).toContain("Plato Academy");
    expect(names).toContain("DAS");
    expect(names).toContain("Mason Classical Academy");
    expect(board.staleContact.map((item) => item.relCode)).toContain("REL-0001");
    expect(board.noNextAction.map((item) => item.relCode)).toContain("REL-0002");
  });

  it("splits overdue, due today, and upcoming next actions", () => {
    const snapshot = liveSnapshotFixture();
    snapshot.relationships[0]["Next Action"] = "Call Academica development";
    snapshot.relationships[0]["Next Action Date"] = "2026-08-18";
    snapshot.relationships[1]["Next Action"] = "Check Plato hold";
    snapshot.relationships[1]["Next Action Date"] = "2026-08-20";
    snapshot.relationships[2]["Next Action"] = "Visit Discovery site";
    snapshot.relationships[2]["Next Action Date"] = "2026-08-24";

    const board = buildWorkbench(snapshot, "2026-08-20", 30);
    expect(board.overdue[0]?.relCode).toBe("REL-0001");
    expect(board.dueToday[0]?.relCode).toBe("REL-0002");
    expect(board.upcoming[0]?.relCode).toBe("REL-0004");
  });
});
