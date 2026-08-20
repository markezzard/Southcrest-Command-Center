# Data Model (v1 draft)

Status: draft from strategy discussions. Refine with real project examples before implementation lock.

## Core entities

### Project (parent)
Stable engagement around a site/school effort across years.

Important properties:
- `project_id` (canonical, immutable once issued)
- `project_code` (used in folder names)
- `project_name` / short name
- site identity fields (site name, address, city/county/state)
- `current_client_id` (nullable)
- `client_status` (`None`, `Prospective`, `Active`, `Former`)
- `companies_involved` (`Meridian`, `Southcrest`, `Both`)
- `originating_company`
- `current_operating_company`
- `lifecycle_stage`
- `status` (`Active`, `On Hold`, `Lost`, `Complete`, `Archived`)
- `meridian_app_id` (if parent-level)
- `drive_folder_id` + path
- staffing at parent level when useful (e.g. BD lead, overall PM)
- prospect/turnover dates
- notes

### Phase
Delivery/operating segment under a project.

Important properties:
- `phase_id`
- `project_id`
- `phase_number` / `phase_name`
- `phase_type` (Land, Entitlements, Site Development, Building, Remodel, Maintenance, Other)
- `company_owner` (Meridian or Southcrest)
- `status`
- `meridian_app_id` (optional)
- `procore_project_id` / name
- `superintendent`
- `project_manager`
- `drive_phase_folder_id`
- schedule start/finish
- `is_primary_active_phase`

### Alias
All alternate identities used for matching email/docs/systems.

Important properties:
- `alias_id`
- `project_id`
- optional `phase_id`
- `alias_type` (project_name, short_name, old_name, procore_name, meridian_name, address, apn, permit_no, entitlement_case, email_subject_token, other)
- `alias_value`
- `normalized_value`
- `match_strength` (`exact_unique`, `strong`, `weak`)
- `active`

### Contact
People/orgs associated with projects/phases for routing and triage.

Important properties:
- project/phase links
- org, person, role
- email, domain, phone
- `is_primary`

### Client history
Because clients change.

Important properties:
- `project_id`
- `client_id` / name
- role (`Prospect`, `Primary`, `Former`, `Buyer`, etc.)
- start/end dates
- reason (`Dropped site`, `Sold to new client`, `Awarded`, etc.)

### Lead / BD record
Shared BD produces leads for Meridian expansion and Southcrest remodel/maintenance/positioning. Leads are not automatically Projects.

V1 capture writes a REL row (and related campus/contact/task/activity/opportunity rows) on SPI Relationship Master. Promotion to an `SC-####` / Project Master row is a separate human gate on the jobs book.

### Account / School relationship
Canonical object is a **REL** on SPI Relationship Master.

Live Relationships headings (verified 2026-08-20):  
`REL Code`, `Organization Name`, `Type`, `Relationship Status`, `Relationship Owner Role`, `Relationship Owner Name`, `Protected`, `Lead Source`, `Relationship Strength`, `Last Meaningful Contact`, `Next Action`, `Next Action Date`, `Notes`, `Created Date`.

Related tabs: Campuses, Contacts, Contact Links, Ownership, Opportunities, REL Tasks, Activities. Jobs are read by `REL Code` and are not written by the BD app.

Status set for V1: Target, Prospect, Developing Relationship, Active Client, On Hold, Dormant.  
Lead sources: BD-generated, Company-generated.  
Types observed live: CMO, Operator, School, Other (Board / District / Developer scaffolded).

## Project Master workbook (Sheet v1)

Proposed tabs:
1. `Projects`
2. `Phases`
3. `Aliases`
4. `Contacts`
5. `Client_History`
6. `Lists` (enums)

## Lifecycle stages (draft enum)

`Prospecting → Preliminary DD → Under Contract → Due Diligence → Entitlements → Permitting → Permitted/Handoff → Site Development → Construction → Closeout → Turnover → Complete`

Southcrest-only small jobs may use a shorter subset (e.g. pursuit → active work → closeout).

## Matching rules for future email triage

Priority order:
1. Explicit IDs (project code, Procore ID, Meridian ID, permit #, case #, APN)
2. Unique alias marked `exact_unique`
3. Contact email/domain + active project association
4. Address / site name strong alias
5. Fuzzy project name (human confirm if multiple candidates)
6. If multiple phases match → `is_primary_active_phase`, else parent + human ask

Never auto-file on weak fuzzy-only matches.

## Operating rules

- IDs are immutable once issued.
- Renames update display name and add old names to Aliases; do not recycle codes.
- Archived projects remain in the registry for historical matching.
- Schema changes are controlled; aliases/contacts can be added more freely.
