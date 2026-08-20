"use server";

import { redirect } from "next/navigation";
import { getMasterClient } from "@/lib/sheet/client";
import type { LeadCaptureInput } from "@/lib/sheet/types";

export type FormState = {
  error?: string;
  duplicateRelCode?: string;
};

function field(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

function isNextRedirect(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
  );
}

export async function captureLeadAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const input: LeadCaptureInput = {
    organizationName: field(formData, "organizationName"),
    type: field(formData, "type"),
    status: field(formData, "status"),
    leadSource: field(formData, "leadSource"),
    relationshipStrength: field(formData, "relationshipStrength"),
    notes: field(formData, "notes"),
    campusName: field(formData, "campusName"),
    city: field(formData, "city"),
    county: field(formData, "county"),
    state: field(formData, "state"),
    address: field(formData, "address"),
    grades: field(formData, "grades"),
    enrollment: field(formData, "enrollment"),
    campusNotes: field(formData, "campusNotes"),
    contactName: field(formData, "contactName"),
    contactTitle: field(formData, "contactTitle"),
    contactEmail: field(formData, "contactEmail"),
    contactPhone: field(formData, "contactPhone"),
    contactRole: field(formData, "contactRole"),
    contactNotes: field(formData, "contactNotes"),
    nextAction: field(formData, "nextAction"),
    nextActionDate: field(formData, "nextActionDate"),
    opportunityName: field(formData, "opportunityName"),
    opportunityType: field(formData, "opportunityType"),
  };

  try {
    const result = await getMasterClient().captureLead(input);
    redirect(`/relationships/${result.relCode}`);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    const duplicate = (error as { duplicateOf?: { relCode: string; reason: string } }).duplicateOf;
    if (duplicate) {
      return { error: duplicate.reason, duplicateRelCode: duplicate.relCode };
    }
    return {
      error: error instanceof Error ? error.message : "Could not write to SPI Relationship Master.",
    };
  }
}

export async function updateNextActionAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const relCode = field(formData, "relCode");
  try {
    await getMasterClient().updateNextAction({
      relCode,
      nextAction: field(formData, "nextAction"),
      nextActionDate: field(formData, "nextActionDate"),
      notes: field(formData, "notes"),
      markContacted: field(formData, "markContacted") === "yes",
    });
    redirect(`/relationships/${relCode}`);
  } catch (error) {
    if (isNextRedirect(error)) throw error;
    return {
      error: error instanceof Error ? error.message : "Could not update the next action.",
    };
  }
}
