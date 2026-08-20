import Link from "next/link";
import { notFound } from "next/navigation";
import { CredentialNotice } from "@/components/CredentialNotice";
import { NextActionForm } from "@/components/NextActionForm";
import { StatusChip } from "@/components/StatusChip";
import { loadRelationshipSafe } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function RelationshipPage({
  params,
}: {
  params: Promise<{ relCode: string }>;
}) {
  const { relCode } = await params;
  const result = await loadRelationshipSafe(relCode);

  if (!result.ok) {
    return <CredentialNotice message={result.message} />;
  }
  if (!result.data) {
    notFound();
  }

  const record = result.data;
  const rel = record.relationship;
  const owner =
    record.ownership[0] ||
    ({
      Role: rel["Relationship Owner Role"],
      "Person Name": rel["Relationship Owner Name"],
    } as const);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/relationships" className="text-sm text-[var(--ink-soft)] underline">
            All relationships
          </Link>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--copper)]">
            {rel["REL Code"]} · {rel.Type || "Type unset"}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl">{rel["Organization Name"]}</h1>
        </div>
        <StatusChip status={rel["Relationship Status"]} />
      </div>

      <section className="rounded-2xl border border-[var(--copper)]/40 bg-white p-5 shadow-sm">
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--copper)]">Next action</p>
        <p className="mt-2 font-serif text-2xl">{rel["Next Action"] || "No next action set"}</p>
        <p className="text-[var(--ink-soft)]">{rel["Next Action Date"] || "No date"}</p>
        <div className="mt-4 border-t border-[var(--line)] pt-4">
          <NextActionForm
            relCode={rel["REL Code"]}
            currentAction={rel["Next Action"]}
            currentDate={rel["Next Action Date"]}
          />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
          <h2 className="font-serif text-xl">Who they are</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Status" value={rel["Relationship Status"]} />
            <Row label="Type" value={rel.Type} />
            <Row label="Lead source" value={rel["Lead Source"]} />
            <Row label="Strength" value={rel["Relationship Strength"]} />
            <Row label="Protected" value={rel.Protected || "N"} />
            <Row label="Last meaningful contact" value={rel["Last Meaningful Contact"] || "None recorded"} />
            <Row label="Created" value={rel["Created Date"]} />
          </dl>
          {rel.Notes ? <p className="mt-4 text-sm text-[var(--ink-soft)]">{rel.Notes}</p> : null}
        </section>

        <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
          <h2 className="font-serif text-xl">Ownership</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Relationship ownership is a role, not an employee page. Opportunity participation is
            separate.
          </p>
          <p className="mt-3 font-medium">{owner.Role || "Unassigned"}</p>
          <p className="text-sm text-[var(--ink-soft)]">
            {owner["Person Name"] || "Person name left blank on purpose — company-based, not employee-based."}
          </p>
        </section>
      </div>

      <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
        <h2 className="font-serif text-xl">Campuses / sites</h2>
        {record.campuses.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--ink-soft)]">No campus rows yet on the Campuses tab.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {record.campuses.map((campus) => (
              <li key={campus["Campus ID"]} className="rounded-xl bg-[var(--paper)] px-3 py-2">
                <p className="font-medium">{campus["Campus Name"]}</p>
                <p className="text-sm text-[var(--ink-soft)]">
                  {[campus.City, campus.County, campus.State].filter(Boolean).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
        <h2 className="font-serif text-xl">Key contacts</h2>
        {record.contacts.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--ink-soft)]">No contacts linked yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {record.contacts.map((contact) => (
              <li key={contact["Contact ID"]} className="rounded-xl bg-[var(--paper)] px-3 py-2">
                <p className="font-medium">
                  {contact["Full Name"]}
                  {contact.primary ? " · Primary" : ""}
                </p>
                <p className="text-sm text-[var(--ink-soft)]">
                  {[contact.role, contact.Title, contact.Email, contact.Phone].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
        <h2 className="font-serif text-xl">Related jobs</h2>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Read from the Jobs tab. This app does not mint SC codes or copy signed jobs onto
          Opportunities.
        </p>
        {record.jobs.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--ink-soft)]">No SC jobs linked to this REL.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-[var(--ink-soft)]">
                <tr>
                  <th className="py-2 pr-3">SC</th>
                  <th className="py-2 pr-3">Project</th>
                  <th className="py-2 pr-3">Master stage</th>
                  <th className="py-2 pr-3">Life cycle</th>
                  <th className="py-2">Place</th>
                </tr>
              </thead>
              <tbody>
                {record.jobs.map((job) => (
                  <tr key={job["SC Code"]} className="border-t border-[var(--line)]">
                    <td className="py-2 pr-3 font-medium">{job["SC Code"]}</td>
                    <td className="py-2 pr-3">{job["Project Name"]}</td>
                    <td className="py-2 pr-3">{job["Master Stage"] || "—"}</td>
                    <td className="py-2 pr-3">{job["Life Cycle Status"]}</td>
                    <td className="py-2">
                      {[job.City, job.State].filter(Boolean).join(", ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {record.opportunities.length > 0 ? (
        <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
          <h2 className="font-serif text-xl">Open pursuits</h2>
          <ul className="mt-3 space-y-2">
            {record.opportunities.map((opp) => (
              <li key={opp["OPP Code"]} className="rounded-xl bg-[var(--paper)] px-3 py-2">
                <p className="font-medium">
                  {opp["OPP Code"]} · {opp["Opportunity Name"]}
                </p>
                <p className="text-sm text-[var(--ink-soft)]">
                  {opp.Type} · {opp.Stage}
                  {opp["SC Code"] ? ` · linked job ${opp["SC Code"]}` : " · no SC code"}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-[var(--ink-soft)]">{label}</dt>
      <dd>{value || "—"}</dd>
    </div>
  );
}
