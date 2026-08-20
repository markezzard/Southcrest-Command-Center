import { SheetSchemaError } from "../errors";
import type { SheetRow } from "./types";

export function assertHeaders(tab: string, expected: readonly string[], actual: readonly string[]): void {
  const normalizedExpected = expected.map((h) => h.trim());
  const normalizedActual = actual.slice(0, expected.length).map((h) => String(h ?? "").trim());
  const matches = normalizedExpected.every((heading, index) => heading === normalizedActual[index]);
  if (!matches) {
    throw new SheetSchemaError(tab, normalizedExpected, normalizedActual);
  }
}

export function rowsFromValues<C extends readonly string[]>(
  columns: C,
  values: string[][],
  tab = "unknown",
): SheetRow<C>[] {
  if (values.length === 0) return [];
  const [header, ...body] = values;
  assertHeaders(tab, columns, header);
  return body
    .map((cells, index) => {
      const record = { rowNumber: index + 2 } as SheetRow<C>;
      for (const [colIndex, column] of columns.entries()) {
        (record as Record<string, string | number>)[column] = String(cells[colIndex] ?? "").trim();
      }
      return record;
    })
    .filter((row) => columns.some((column) => String((row as Record<string, string | number>)[column]).trim() !== ""));
}

export function valuesFromRow<C extends readonly string[]>(
  columns: C,
  record: Record<string, string | number>,
): string[] {
  return columns.map((column) => String(record[column] ?? ""));
}
