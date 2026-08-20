import { describe, expect, it } from "vitest";
import { isRetiredRelCode, looksLikeScCode, nextPrefixedCode, nextRelCode } from "./ids";

describe("REL code allocation", () => {
  it("skips retired codes from the 18 Aug 2026 cleanup", () => {
    const next = nextRelCode([
      "REL-0001",
      "REL-0002",
      "REL-0004",
      "REL-0005",
      "REL-0006",
      "REL-0009",
      "REL-0012",
    ]);
    expect(next).toBe("REL-0014");
    expect(isRetiredRelCode("REL-0003")).toBe(true);
    expect(isRetiredRelCode("REL-0007")).toBe(true);
    expect(isRetiredRelCode("REL-0008")).toBe(true);
    expect(isRetiredRelCode("REL-0010")).toBe(true);
    expect(isRetiredRelCode("REL-0011")).toBe(true);
    expect(isRetiredRelCode("REL-0013")).toBe(true);
    expect(isRetiredRelCode(next)).toBe(false);
  });

  it("never emits an SC job code", () => {
    expect(looksLikeScCode(nextRelCode(["REL-0001"]))).toBe(false);
    expect(looksLikeScCode(nextPrefixedCode("OPP", []))).toBe(false);
    expect(looksLikeScCode(nextPrefixedCode("CAM", []))).toBe(false);
    expect(looksLikeScCode("SC-0002")).toBe(true);
  });
});
