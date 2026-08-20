import Link from "next/link";
import type { WorkbenchItem } from "@/lib/workbench";
import { StatusChip } from "./StatusChip";

export function ActionList({
  title,
  empty,
  items,
  tone = "default",
}: {
  title: string;
  empty: string;
  items: WorkbenchItem[];
  tone?: "default" | "danger";
}) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-white/75 p-4 shadow-sm">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-serif text-xl">{title}</h2>
        <span className={`chip ${tone === "danger" && items.length ? "chip-overdue" : "chip-target"}`}>
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-[var(--ink-soft)]">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={`${item.kind}-${item.source}-${item.relCode}-${item.title}`}>
              <Link
                href={item.href}
                className="block rounded-xl border border-[var(--line)] bg-[var(--paper)]/60 px-3 py-3 hover:border-[var(--copper)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.organizationName}</p>
                    <p className="text-sm text-[var(--ink-soft)]">{item.title}</p>
                  </div>
                  <StatusChip status={item.status} />
                </div>
                <p className="mt-2 text-xs uppercase tracking-wide text-[var(--ink-soft)]">
                  {item.relCode}
                  {item.dueDate ? ` · ${item.dueDate}` : ""}
                  {item.source === "task" ? " · REL task" : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
