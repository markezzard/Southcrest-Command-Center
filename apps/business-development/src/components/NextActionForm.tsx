"use client";

import { useActionState } from "react";
import { updateNextActionAction, type FormState } from "@/app/actions";

const initial: FormState = {};
const fieldClass =
  "mt-1 w-full rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 outline-none focus:border-[var(--copper)]";

export function NextActionForm({
  relCode,
  currentAction,
  currentDate,
}: {
  relCode: string;
  currentAction: string;
  currentDate: string;
}) {
  const [state, action, pending] = useActionState(updateNextActionAction, initial);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="relCode" value={relCode} />
      {state.error ? <p className="text-sm text-[var(--rose)]">{state.error}</p> : null}
      <label className="block text-sm">
        Next action
        <input name="nextAction" required defaultValue={currentAction} className={fieldClass} />
      </label>
      <label className="block text-sm">
        Date
        <input type="date" name="nextActionDate" required defaultValue={currentDate} className={fieldClass} />
      </label>
      <label className="block text-sm">
        Note
        <textarea name="notes" rows={2} className={fieldClass} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="markContacted" defaultChecked value="yes" />
        Record meaningful contact today
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[var(--copper)] px-4 py-2 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Saving…" : "Update next action"}
      </button>
    </form>
  );
}
