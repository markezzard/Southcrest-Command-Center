import { CaptureForm } from "@/components/CaptureForm";
import { CredentialNotice } from "@/components/CredentialNotice";
import { hasSheetCredential } from "@/lib/sheet/credentials";

export default function NewLeadPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--copper)]">
          Field capture
        </p>
        <h1 className="font-serif text-3xl md:text-4xl">New lead</h1>
        <p className="mt-1 text-[var(--ink-soft)]">
          Saves to Relationships, Campuses, Contacts, Contact Links, Ownership, REL Tasks,
          Activities, and Opportunities as needed. Never writes Project Master or an SC-####.
        </p>
      </div>
      {hasSheetCredential() ? (
        <CaptureForm />
      ) : (
        <CredentialNotice message="A sanctioned Google service account is required before a new lead can persist on SPI Relationship Master." />
      )}
    </div>
  );
}
