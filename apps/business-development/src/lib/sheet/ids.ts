import { RETIRED_REL_NUMBERS } from "../aliases";
import { RetiredRelCodeError } from "../errors";

const CODE_PATTERN = /^(REL|CAM|CON|OPP|TSK|ACT)-(\d{4})$/;

export function parsePrefixedCode(code: string): { prefix: string; number: number } | null {
  const match = code.trim().toUpperCase().match(CODE_PATTERN);
  if (!match) return null;
  return { prefix: match[1], number: Number(match[2]) };
}

export function formatPrefixedCode(prefix: string, number: number): string {
  return `${prefix}-${String(number).padStart(4, "0")}`;
}

export function isRetiredRelNumber(number: number): boolean {
  return (RETIRED_REL_NUMBERS as readonly number[]).includes(number);
}

export function isRetiredRelCode(code: string): boolean {
  const parsed = parsePrefixedCode(code);
  return parsed?.prefix === "REL" && isRetiredRelNumber(parsed.number);
}

export function assertReusableRelCode(code: string): void {
  if (isRetiredRelCode(code)) {
    throw new RetiredRelCodeError(code);
  }
}

export function nextPrefixedCode(prefix: "CAM" | "CON" | "OPP" | "TSK" | "ACT", existing: string[]): string {
  const used = existing
    .map(parsePrefixedCode)
    .filter((parsed): parsed is { prefix: string; number: number } => parsed?.prefix === prefix)
    .map((parsed) => parsed.number);
  const next = used.length === 0 ? 1 : Math.max(...used) + 1;
  return formatPrefixedCode(prefix, next);
}

/**
 * Next live REL code. Never reuses retired codes from the 18 Aug 2026 cleanup:
 * 0003 Meridian, 0007 Southcrest, 0008 Cambo, 0010 old Plato Academy,
 * 0011 Robert Cambo, 0013 Somerset.
 */
export function nextRelCode(existing: string[]): string {
  const used = new Set(
    existing
      .map(parsePrefixedCode)
      .filter((parsed): parsed is { prefix: string; number: number } => parsed?.prefix === "REL")
      .map((parsed) => parsed.number),
  );
  let number = 1;
  while (used.has(number) || isRetiredRelNumber(number)) {
    number += 1;
  }
  return formatPrefixedCode("REL", number);
}

export function looksLikeScCode(value: string): boolean {
  return /^SC-\d{4}$/i.test(value.trim());
}
