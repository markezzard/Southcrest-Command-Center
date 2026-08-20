import { BD_STALE_CONTACT_DAYS, BD_TIMEZONE } from "./config";
import { todayISO } from "./dates";
import { MissingSheetCredentialError } from "./errors";
import { getMasterClient } from "./sheet/client";
import { hasSheetCredential } from "./sheet/credentials";
import type { MasterSnapshot, RelationshipRecord } from "./sheet/types";
import { buildWorkbench, type WorkbenchModel } from "./workbench";

export type LoadState<T> =
  | { ok: true; data: T }
  | { ok: false; missingCredential: true; message: string }
  | { ok: false; missingCredential: false; message: string };

export async function loadSnapshotSafe(): Promise<LoadState<MasterSnapshot>> {
  if (!hasSheetCredential()) {
    return {
      ok: false,
      missingCredential: true,
      message: new MissingSheetCredentialError().message,
    };
  }
  try {
    const data = await getMasterClient().loadSnapshot();
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      missingCredential: error instanceof MissingSheetCredentialError,
      message: error instanceof Error ? error.message : "Failed to read SPI Relationship Master.",
    };
  }
}

export async function loadWorkbenchSafe(): Promise<LoadState<WorkbenchModel>> {
  const snapshot = await loadSnapshotSafe();
  if (!snapshot.ok) return snapshot;
  return {
    ok: true,
    data: buildWorkbench(snapshot.data, todayISO(new Date(), BD_TIMEZONE), BD_STALE_CONTACT_DAYS),
  };
}

export async function loadRelationshipSafe(
  relCode: string,
): Promise<LoadState<RelationshipRecord | null>> {
  const snapshot = await loadSnapshotSafe();
  if (!snapshot.ok) return snapshot;
  const { assembleRelationshipRecord } = await import("./sheet/record");
  return { ok: true, data: assembleRelationshipRecord(snapshot.data, relCode) };
}
