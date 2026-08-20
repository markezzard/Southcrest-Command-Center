import Link from "next/link";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[var(--navy)] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="min-w-0">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/60">
              Southcrest / Meridian
            </p>
            <p className="truncate font-serif text-xl leading-tight">Business Development</p>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link className="rounded-full px-3 py-1.5 hover:bg-white/10" href="/">
              Workbench
            </Link>
            <Link className="rounded-full px-3 py-1.5 hover:bg-white/10" href="/relationships">
              Relationships
            </Link>
            <Link
              className="rounded-full bg-[var(--copper)] px-3 py-1.5 font-semibold text-white hover:bg-[var(--copper-2)]"
              href="/leads/new"
            >
              New lead
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
