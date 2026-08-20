export class MissingSheetCredentialError extends Error {
  readonly code = "MISSING_SHEET_CREDENTIAL";

  constructor() {
    super(
      "SPI Relationship Master reads and writes need a sanctioned Google service account. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS. Do not put the key in the repo.",
    );
    this.name = "MissingSheetCredentialError";
  }
}

export class SheetSchemaError extends Error {
  readonly code = "SHEET_SCHEMA_MISMATCH";

  constructor(tab: string, expected: readonly string[], actual: readonly string[]) {
    super(
      `SPI Relationship Master tab "${tab}" headings do not match the typed client. Expected: ${expected.join(" | ")}. Actual: ${actual.join(" | ")}.`,
    );
    this.name = "SheetSchemaError";
  }
}

export class RetiredRelCodeError extends Error {
  readonly code = "RETIRED_REL_CODE";

  constructor(code: string) {
    super(`${code} is retired and must not be reused.`);
    this.name = "RetiredRelCodeError";
  }
}
