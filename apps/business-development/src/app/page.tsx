import Link from "next/link";
import { ActionList } from "@/components/ActionList";
import { CredentialNotice } from "@/components/CredentialNotice";
import { StatusChip } from "@/components/StatusChip";
import { SPI_RELATIONSHIP_MASTER_URL } from "@/lib/config";
import { loadWorkbenchSafe } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function WorkbenchPage() {
  const result = await loadWorkbenchSafe();

  if (!result.ok) {
    return (
      <div className="space-y-4">
        <PageIntro />
        <CredentialNotice message={result.message} />
      </div>
    );
  }

  const board = result.data;

  return (
    <div className="space-y-6">
      <PageIntro asOf={board.asOf} />
      <div className="grid gap-4 lg:grid-cols-2">
        <ActionList
          title="Overdue"
          empty="Nothing overdue."
          items={board.overdue}
          tone="danger"
        />
        <ActionList title="Due today" empty="No next actions due today." items={board.dueToday} />
        <ActionList title="Coming up" empty="No next actions in the next 7 days." items={board.upcoming} />
        <ActionList
          title="No recent contact"
          empty="Every open relationship has a recent contact."
          items={board.staleContact}
        />
      </div>
      <ActionList
        title="Needs a next action"
        empty="Every open relationship has a next action."
        items={board.noNextAction}
      />
      <section className="rounded-2xl border border-[var(--line)] bg-white/75 p-4 shadow-sm">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-serif text-xl">Relationships</h2>
          <a className="text-sm underline" href={SPI_RELATIONSHIP_MASTER_URL} target="_blank" rel="noreferrer">
            Open SPI Relationship Master
          </a>
        </div>
        <ul className="divide-y divide-[var(--line)]">
          {board.relationships.map((row) => (
            <li key={row["REL Code"]} className="py-3">
              <Link href={`/relationships/${row["REL Code"]}`} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{row["Organization Name"]}</p>
                  <p className="text-sm text-[var(--ink-soft)]">
                    {row["REL Code"]} · {row.Type || "Type unset"}
                  </p>
                </div>
                <StatusChip status={row["Relationship Status"]} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PageIntro({ asOf }: { asOf?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--copper)]">
          What to do today
        </p>
        <h1 className="font-serif text-3xl md:text-4xl">Workbench</h1>
        <p className="mt-1 max-w-2xl text-[var(--ink-soft)]">
          School and operator relationships from SPI Relationship Master. Jobs stay on the Jobs tab.
          Relationships stay open when a job closes.
        </p>
      </div>
      {asOf ? <p className="text-sm text-[var(--ink-soft)]">As of {asOf}</p> : null}
    </div>
  );
}
