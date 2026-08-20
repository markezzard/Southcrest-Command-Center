import { compareISODate, daysBetween, parseISODate } from "./dates";
import type { MasterSnapshot, RelationshipRow, RelTaskRow } from "./sheet/types";

export type WorkbenchItem = {
  relCode: string;
  organizationName: string;
  status: string;
  title: string;
  dueDate: string | null;
  kind: "overdue" | "due-today" | "upcoming" | "no-next-action" | "stale-contact";
  source: "relationship" | "task";
  href: string;
};

export type WorkbenchModel = {
  asOf: string;
  overdue: WorkbenchItem[];
  dueToday: WorkbenchItem[];
  upcoming: WorkbenchItem[];
  noNextAction: WorkbenchItem[];
  staleContact: WorkbenchItem[];
  relationships: RelationshipRow[];
};

function openTasks(snapshot: MasterSnapshot): RelTaskRow[] {
  return snapshot.tasks.filter((task) => {
    const status = task.Status.trim().toLowerCase();
    return status !== "done" && status !== "complete" && status !== "completed" && status !== "cancelled";
  });
}

export function buildWorkbench(
  snapshot: MasterSnapshot,
  asOf: string,
  staleAfterDays = 30,
): WorkbenchModel {
  const overdue: WorkbenchItem[] = [];
  const dueToday: WorkbenchItem[] = [];
  const upcoming: WorkbenchItem[] = [];
  const noNextAction: WorkbenchItem[] = [];
  const staleContact: WorkbenchItem[] = [];

  for (const relationship of snapshot.relationships) {
    const href = `/relationships/${relationship["REL Code"]}`;
    const nextAction = relationship["Next Action"].trim();
    const dueDate = parseISODate(relationship["Next Action Date"]);
    const lastContact = parseISODate(relationship["Last Meaningful Contact"]);
    const dormant = relationship["Relationship Status"].trim().toLowerCase() === "dormant";

    if (nextAction && dueDate) {
      const item: WorkbenchItem = {
        relCode: relationship["REL Code"],
        organizationName: relationship["Organization Name"],
        status: relationship["Relationship Status"],
        title: nextAction,
        dueDate,
        kind: dueDate < asOf ? "overdue" : dueDate === asOf ? "due-today" : "upcoming",
        source: "relationship",
        href,
      };
      if (item.kind === "overdue") overdue.push(item);
      else if (item.kind === "due-today") dueToday.push(item);
      else if (daysBetween(asOf, dueDate) <= 7) upcoming.push(item);
    } else if (!nextAction && !dormant) {
      noNextAction.push({
        relCode: relationship["REL Code"],
        organizationName: relationship["Organization Name"],
        status: relationship["Relationship Status"],
        title: "Set a next action",
        dueDate: null,
        kind: "no-next-action",
        source: "relationship",
        href,
      });
    }

    const stale =
      !dormant &&
      (!lastContact || daysBetween(lastContact, asOf) > staleAfterDays);
    if (stale) {
      staleContact.push({
        relCode: relationship["REL Code"],
        organizationName: relationship["Organization Name"],
        status: relationship["Relationship Status"],
        title: lastContact
          ? `No meaningful contact since ${lastContact}`
          : "No meaningful contact recorded",
        dueDate: lastContact,
        kind: "stale-contact",
        source: "relationship",
        href,
      });
    }
  }

  for (const task of openTasks(snapshot)) {
    const dueDate = parseISODate(task["Due Date"]);
    if (!dueDate) continue;
    const relationship = snapshot.relationships.find((row) => row["REL Code"] === task["REL Code"]);
    const item: WorkbenchItem = {
      relCode: task["REL Code"],
      organizationName: relationship?.["Organization Name"] ?? task["REL Code"],
      status: relationship?.["Relationship Status"] ?? "",
      title: task.Task,
      dueDate,
      kind: dueDate < asOf ? "overdue" : dueDate === asOf ? "due-today" : "upcoming",
      source: "task",
      href: `/relationships/${task["REL Code"]}`,
    };
    if (item.kind === "overdue") overdue.push(item);
    else if (item.kind === "due-today") dueToday.push(item);
    else if (daysBetween(asOf, dueDate) <= 7) upcoming.push(item);
  }

  const byKey = (a: WorkbenchItem, b: WorkbenchItem) =>
    compareISODate(a.dueDate ?? "9999-12-31", b.dueDate ?? "9999-12-31") ||
    a.organizationName.localeCompare(b.organizationName);

  return {
    asOf,
    overdue: overdue.sort(byKey),
    dueToday: dueToday.sort(byKey),
    upcoming: upcoming.sort(byKey),
    noNextAction: noNextAction.sort((a, b) => a.organizationName.localeCompare(b.organizationName)),
    staleContact: staleContact.sort((a, b) => a.organizationName.localeCompare(b.organizationName)),
    relationships: [...snapshot.relationships].sort((a, b) =>
      a["Organization Name"].localeCompare(b["Organization Name"]),
    ),
  };
}
