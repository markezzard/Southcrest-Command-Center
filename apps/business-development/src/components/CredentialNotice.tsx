import { SPI_RELATIONSHIP_MASTER_URL } from "@/lib/config";

export function CredentialNotice({ message }: { message: string }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-5 shadow-sm">
      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--copper)]">
        Missing sanctioned write path
      </p>
      <h2 className="mt-1 font-serif text-2xl">SPI Relationship Master is the store</h2>
      <p className="mt-3 max-w-3xl text-[var(--ink-soft)]">{message}</p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[var(--ink-soft)]">
        <li>Create a Google Cloud service account with Sheets access.</li>
        <li>
          Share{" "}
          <a className="underline" href={SPI_RELATIONSHIP_MASTER_URL} target="_blank" rel="noreferrer">
            SPI Relationship Master
          </a>{" "}
          with that service account as Editor.
        </li>
        <li>
          Set <code className="rounded bg-[var(--paper-2)] px-1">GOOGLE_SERVICE_ACCOUNT_JSON</code> in
          the app environment. Do not commit the key.
        </li>
      </ol>
      <p className="mt-4 text-sm text-[var(--ink-soft)]">
        Live REL rows are not faked here. Once the credential is present, Academica, Plato Academy,
        DAS, Mason, and the rest load from the Relationships tab.
      </p>
    </section>
  );
}
