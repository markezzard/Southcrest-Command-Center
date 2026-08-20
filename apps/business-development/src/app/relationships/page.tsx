import Link from "next/link";
import { CredentialNotice } from "@/components/CredentialNotice";
import { StatusChip } from "@/components/StatusChip";
import { loadSnapshotSafe } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function RelationshipsPage() {
  const result = await loadSnapshotSafe();
  if (!result.ok) {
    return <CredentialNotice message={result.message} />;
  }

  const rows = [...result.data.relationships].sort((a, b) =>
    a["Organization Name"].localeCompare(b["Organization Name"]),
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--copper)]">
          Company relationships
        </p>
        <h1 className="font-serif text-3xl md:text-4xl">Relationships</h1>
        <p className="mt-1 text-[var(--ink-soft)]">
          Live REL records. Plato Academy is REL-0002. Somerset lives under Academica.
        </p>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {rows.map((row) => (
          <li key={row["REL Code"]}>
            <Link
              href={`/relationships/${row["REL Code"]}`}
              className="block rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm hover:border-[var(--copper)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-2xl">{row["Organization Name"]}</p>
                  <p className="text-sm text-[var(--ink-soft)]">
                    {row["REL Code"]} · {row.Type}
                  </p>
                </div>
                <StatusChip status={row["Relationship Status"]} />
              </div>
              <p className="mt-3 text-sm text-[var(--ink-soft)]">
                Next: {row["Next Action"] || "Not set"}
                {row["Next Action Date"] ? ` · ${row["Next Action Date"]}` : ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
