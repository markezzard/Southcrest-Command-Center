import type {
  LinkedContact,
  MasterSnapshot,
  RelationshipRecord,
} from "./types";

export function assembleRelationshipRecord(
  snapshot: MasterSnapshot,
  relCode: string,
): RelationshipRecord | null {
  const relationship = snapshot.relationships.find((row) => row["REL Code"] === relCode);
  if (!relationship) return null;

  const links = snapshot.contactLinks.filter((link) => link["REL Code"] === relCode);
  const contacts: LinkedContact[] = links.flatMap((link) => {
    const contact = snapshot.contacts.find((row) => row["Contact ID"] === link["Contact ID"]);
    if (!contact) return [];
    return [
      {
        ...contact,
        role: link.Role,
        primary: link.Primary.trim().toUpperCase() === "Y",
      },
    ];
  });

  return {
    relationship,
    campuses: snapshot.campuses.filter((row) => row["REL Code"] === relCode),
    contacts,
    ownership: snapshot.ownership.filter((row) => row["REL Code"] === relCode),
    opportunities: snapshot.opportunities.filter((row) => row["REL Code"] === relCode),
    tasks: snapshot.tasks.filter((row) => row["REL Code"] === relCode),
    activities: snapshot.activities.filter((row) => row["REL Code"] === relCode),
    jobs: snapshot.jobs.filter((row) => row["REL Code"] === relCode),
  };
}
