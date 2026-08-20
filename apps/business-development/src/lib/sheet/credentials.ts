import { existsSync, readFileSync } from "node:fs";
import { MissingSheetCredentialError } from "../errors";

export type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
  [key: string]: unknown;
};

export function hasSheetCredential(): boolean {
  return Boolean(readSheetCredentialJson());
}

export function loadSheetCredentials(): ServiceAccountCredentials {
  const raw = readSheetCredentialJson();
  if (!raw) {
    throw new MissingSheetCredentialError();
  }
  let parsed: ServiceAccountCredentials;
  try {
    parsed = JSON.parse(raw) as ServiceAccountCredentials;
  } catch {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON / GOOGLE_APPLICATION_CREDENTIALS is not valid JSON.");
  }
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Service account JSON must include client_email and private_key.");
  }
  parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
  return parsed;
}

function readSheetCredentialJson(): string | null {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) return inline;
  const filePath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (filePath && existsSync(filePath)) {
    return readFileSync(filePath, "utf8");
  }
  return null;
}
