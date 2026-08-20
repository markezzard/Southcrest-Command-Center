import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6">
      <h1 className="font-serif text-3xl">Relationship not found</h1>
      <p className="mt-2 text-[var(--ink-soft)]">
        That REL code is not on the live Relationships tab. Retired codes are not reused.
      </p>
      <Link href="/" className="mt-4 inline-block underline">
        Back to the workbench
      </Link>
    </div>
  );
}
