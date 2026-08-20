# Business Development

Field app for **Southcrest Management** and **Meridian Land** Business Development.

Capture a school / operator lead, see what to do today, and open the relationship record. This is not a generic CRM and not Pedro’s Meridian Project Command Center.

## Store

**SPI Relationship Master** is the only store.

- Sheet ID: `1mE1Y2vJ5uKRW-VcQ6oMs9yUhmlwc-q91vXlFp7caMCg`
- Drive folder: `01_Project Controls`
- Tabs used: Relationships, Campuses, Contacts, Contact Links, Ownership, Opportunities, REL Tasks, Activities, Jobs (read-only)

The app does **not** mint `SC-####` codes, write Project Master, or close a relationship because a job completed.

## Run

```bash
cd apps/business-development
cp .env.example .env.local
npm install
npm test
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Credential (required for live REL data and writes)

This environment can read the workbook through Drive MCP, but the browser app needs its own sanctioned Sheets path.

1. Create a Google Cloud service account.
2. Share the Relationship Master with that service account as **Editor**.
3. Put the JSON key in `GOOGLE_SERVICE_ACCOUNT_JSON` (preferred) or point `GOOGLE_APPLICATION_CREDENTIALS` at a local key file.
4. Never commit the key.

Without that credential the UI ships and the typed client matches the live tab headings, but it will **not** invent Academica / Plato / DAS rows. Live RELs appear only from the sheet.

The `archive@` Apps Script write-helper used elsewhere in SPI was not exposed as a callable URL in this repo. The sanctioned path for this app is the service account above.

## Screens

1. **Workbench** — overdue and due next actions, relationships with no recent contact, needs-a-next-action.
2. **New lead** — school/operator, status, campus/site, key contact, next action.
3. **Relationship** — who they are, owner role (Business Development), prominent next action, related jobs from the Jobs tab.

Role names only. No employee names on pages, buttons, or nav.

## REL codes

After the 18 Aug 2026 cleanup, live codes include REL-0001 Academica, REL-0002 Plato Academy, REL-0004 Discovery Science, REL-0005 DAS, REL-0006 Imagine Schools, REL-0009 Alliance Development, REL-0012 Mason Classical Academy.

Retired, never reused: 0003 Meridian, 0007 Southcrest, 0008 Cambo, 0010 old Plato Academy, 0011 Robert Cambo, 0013 Somerset.

New leads allocate the next unused non-retired code (REL-0014 if the live set is unchanged).
