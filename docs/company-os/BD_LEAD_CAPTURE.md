# Business Development lead-capture app (V1)

Package: [`apps/business-development/`](../../apps/business-development/)

## Goal

A field browser app for the **Business Development** role to capture a school / operator lead and see what to do today.

## Store

**SPI Relationship Master** is the only store.

- Sheet ID: `1mE1Y2vJ5uKRW-VcQ6oMs9yUhmlwc-q91vXlFp7caMCg`
- Folder: `01_Project Controls`
- Verified live 2026-08-20

Do not use Pedro’s Meridian Project Command Center (`1mdxjkRs4UwUzI3vJvoatPp5aWiEDOl2TL7DDibmMLoU`) as a store. Do not write Project Master / PCF from this app.

## Live REL codes (18 Aug 2026 cleanup)

| Code | Organization | Status | Notes |
|---|---|---|---|
| REL-0001 | Academica | Active Client | Somerset folded here |
| REL-0002 | Plato Academy | On Hold | Not “Plato”. Not on REL-0001 |
| REL-0004 | Discovery Science | Active Client | |
| REL-0005 | DAS | Active Client | |
| REL-0006 | Imagine Schools | Active Client | |
| REL-0009 | Alliance Development | On Hold | Cambo / Robert Cambo folded here |
| REL-0012 | Mason Classical Academy | Active Client | Gym and K-8 jobs completed; REL is not Completed |

Retired, never reuse: 0003 Meridian, 0007 Southcrest, 0008 Cambo, 0010 old Plato Academy, 0011 Robert Cambo, 0013 Somerset.

## Entity rules

- **REL** = school / operator relationship. Stays open when jobs close.
- **Opportunity** = a REL pursuit with no `SC-####` yet. This app never writes an SC code onto Opportunities.
- **Job** = already has an SC code. Lives on the Jobs tab and shows on the parent REL as a related job.
- A real lead becomes Prospecting on the existing jobs book through the existing human gate, not automatically from this app.

## V1 screens

1. Workbench — overdue / due / upcoming next actions; no recent contact; needs a next action.
2. New lead — organization, type, status, campus/site, key contact, next action, notes.
3. Relationship record — identity, owner role, prominent next action, related jobs (Jobs tab read).

UI uses the role **Business Development**. Do not hard-code employee names into pages, buttons, nav, or workflows.

## Writes

Lead capture may append to: Relationships, Campuses, Contacts, Contact Links, Ownership, REL Tasks, Activities, Opportunities.

Read-only: Jobs, Rules.

Credential: `GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS`. No secrets in the repo.

## Later phases (do not block V1)

Full AI summaries, geographic trip optimizer, work-order engine, SAP/ERP, automatic tasking on protected relationships, company Grok logins for other people.
