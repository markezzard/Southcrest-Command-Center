/**
 * Fold / rename guards from Mark's 18 Aug 2026 Relationship Master cleanup.
 * These are identity rules, not a second store.
 */
export const RETIRED_REL_NUMBERS = [3, 7, 8, 10, 11, 13] as const;

export const RETIRED_REL_CODES = RETIRED_REL_NUMBERS.map(
  (n) => `REL-${String(n).padStart(4, "0")}`,
);

export const KNOWN_FOLDS: ReadonlyArray<{
  pattern: RegExp;
  relCode: string;
  canonicalName: string;
  note: string;
}> = [
  {
    pattern: /\bsomerset\b/i,
    relCode: "REL-0001",
    canonicalName: "Academica",
    note: "Somerset folded into Academica on 18 Aug 2026.",
  },
  {
    pattern: /\bplato\b/i,
    relCode: "REL-0002",
    canonicalName: "Plato Academy",
    note: "Plato Academy is REL-0002. Do not put Plato on Academica (REL-0001).",
  },
  {
    pattern: /\bcambo\b/i,
    relCode: "REL-0009",
    canonicalName: "Alliance Development",
    note: "Cambo / Robert Cambo folded into Alliance Development on 18 Aug 2026.",
  },
  {
    pattern: /\bmason classical\b|\bmason academy\b/i,
    relCode: "REL-0012",
    canonicalName: "Mason Classical Academy",
    note: "Gym and K-8 jobs completed; the relationship stays Active Client.",
  },
];

export function normalizeOrgName(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

export function findKnownFold(organizationName: string) {
  const text = organizationName.trim();
  return KNOWN_FOLDS.find((fold) => fold.pattern.test(text)) ?? null;
}
