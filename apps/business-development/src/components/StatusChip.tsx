const TONE: Record<string, string> = {
  "Active Client": "chip-active",
  Prospect: "chip-target",
  Target: "chip-target",
  "Developing Relationship": "chip-target",
  "On Hold": "chip-hold",
  Dormant: "chip-dormant",
};

export function StatusChip({ status }: { status: string }) {
  return <span className={`chip ${TONE[status] ?? "chip-target"}`}>{status || "Unknown"}</span>;
}
