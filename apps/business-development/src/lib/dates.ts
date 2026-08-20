export function todayISO(now = new Date(), timeZone = "America/New_York"): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function parseISODate(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

export function daysBetween(fromISO: string, toISO: string): number {
  const from = Date.parse(`${fromISO}T00:00:00Z`);
  const to = Date.parse(`${toISO}T00:00:00Z`);
  return Math.round((to - from) / 86_400_000);
}

export function compareISODate(a: string, b: string): number {
  return a.localeCompare(b);
}
