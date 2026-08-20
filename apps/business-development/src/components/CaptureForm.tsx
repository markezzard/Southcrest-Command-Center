"use client";

import Link from "next/link";
import { useActionState } from "react";
import { captureLeadAction, type FormState } from "@/app/actions";
import {
  LEAD_SOURCES,
  OPPORTUNITY_TYPES,
  RELATIONSHIP_STATUSES,
  RELATIONSHIP_STRENGTHS,
  RELATIONSHIP_TYPES,
} from "@/lib/enums";

const initial: FormState = {};

const fieldClass =
  "mt-1 w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--copper)]";

export function CaptureForm() {
  const [state, action, pending] = useActionState(captureLeadAction, initial);

  return (
    <form action={action} className="space-y-6">
      {state.error ? (
        <div className="rounded-xl border border-[var(--rose)]/30 bg-white p-4 text-[var(--rose)]">
          <p>{state.error}</p>
          {state.duplicateRelCode ? (
            <Link className="mt-2 inline-block underline" href={`/relationships/${state.duplicateRelCode}`}>
              Open {state.duplicateRelCode}
            </Link>
          ) : null}
        </div>
      ) : null}

      <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
        <h2 className="font-serif text-xl">School / operator</h2>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Relationships stay open. This does not mint an SC job code.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2 text-sm">
            Organization name
            <input required name="organizationName" className={fieldClass} placeholder="Operator or school" />
          </label>
          <label className="text-sm">
            Type
            <select name="type" className={fieldClass} defaultValue="Operator">
              {RELATIONSHIP_TYPES.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Status
            <select name="status" className={fieldClass} defaultValue="Target">
              {RELATIONSHIP_STATUSES.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Lead source
            <select name="leadSource" className={fieldClass} defaultValue="BD-generated">
              {LEAD_SOURCES.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Relationship strength
            <select name="relationshipStrength" className={fieldClass} defaultValue="">
              <option value="">Not set</option>
              {RELATIONSHIP_STRENGTHS.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
        <h2 className="font-serif text-xl">Campus or site</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2 text-sm">
            Campus / site name
            <input name="campusName" className={fieldClass} placeholder="Campus, site, or search area" />
          </label>
          <label className="text-sm">
            City
            <input name="city" className={fieldClass} />
          </label>
          <label className="text-sm">
            County
            <input name="county" className={fieldClass} />
          </label>
          <label className="text-sm">
            State
            <input name="state" className={fieldClass} placeholder="FL" />
          </label>
          <label className="text-sm">
            Address
            <input name="address" className={fieldClass} />
          </label>
          <label className="text-sm">
            Grades
            <input name="grades" className={fieldClass} placeholder="K-8" />
          </label>
          <label className="text-sm">
            Enrollment
            <input name="enrollment" className={fieldClass} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
        <h2 className="font-serif text-xl">Key contact</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Full name
            <input name="contactName" className={fieldClass} />
          </label>
          <label className="text-sm">
            Title
            <input name="contactTitle" className={fieldClass} />
          </label>
          <label className="text-sm">
            Role at the relationship
            <input name="contactRole" className={fieldClass} placeholder="Board, operator, campus leader" />
          </label>
          <label className="text-sm">
            Email
            <input type="email" name="contactEmail" className={fieldClass} />
          </label>
          <label className="text-sm">
            Phone
            <input name="contactPhone" className={fieldClass} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white/80 p-4 shadow-sm">
        <h2 className="font-serif text-xl">Next action</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2 text-sm">
            What should Business Development do next?
            <input name="nextAction" className={fieldClass} placeholder="Call, visit campus, send intro" />
          </label>
          <label className="text-sm">
            Next-action date
            <input type="date" name="nextActionDate" className={fieldClass} />
          </label>
          <label className="text-sm">
            Opportunity type
            <select name="opportunityType" className={fieldClass} defaultValue="Expansion">
              {OPPORTUNITY_TYPES.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="md:col-span-2 text-sm">
            Notes
            <textarea name="notes" rows={4} className={fieldClass} />
          </label>
        </div>
      </section>

      <div className="sticky bottom-3 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[var(--navy)] px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving to Relationship Master…" : "Save lead to Relationship Master"}
        </button>
      </div>
    </form>
  );
}
