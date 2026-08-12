# Data Model (v1 draft)

Status: draft refined with Mason Academy Vanderbilt K-8 deep dive.

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

### Lead / BD record (future detail)
Not fully designed. Direction:
- Shared BD produces leads for Meridian expansion and Southcrest remodel/maintenance/positioning.
- Leads are not automatically Projects.
- Promote to Project when identity/docs/email matching need a stable home.

### Account / School relationship (future)
Directional need: long-lived school/district relationship spanning multiple leads and projects across both companies.

### Parcel / assemblage (needed from Mason example)
One project may include multiple parcels and sellers.

Suggested fields:
- `parcel_id`
- `project_id`
- APN / address
- seller/contact link
- contract/LOI status
- assemblage group / rank
- notes (wetlands, access, estate parcel, etc.)

### Permit register (needed from Mason example)
Track major permits/conditions under a project/phase:
- permit type (ERP, SDP, FDEP offsite, construction, etc.)
- agency
- status / issued date
- document link in Drive
- related offsite obligations (e.g. traffic signal / intersection)

### Outreach / LOI pipeline (Meridian)
Not full CRM yet, but Project Master should not pretend land search is a single step. Minimum future support:
- search boundary notes
- candidate sites
- outreach attempts across call/email/letter/text
- LOI/contract status per parcel

## Project Master workbook (Sheet v1)

Proposed tabs:
1. `Projects`
2. `Phases`
3. `Aliases`
4. `Contacts`
5. `Client_History`
6. `Lists` (enums)

## Lifecycle stages (authoritative enum)

Use owner-defined stages from `LIFECYCLE_SCHOOL_DELIVERY.md`:

1. Prospecting  
2. LOI  
3. Contract  
4. Due diligence  
5. Government approvals  
6. Handover to GC  
7. Development  
8. Vertical construction  
9. Final inspections and punch-out  
10. Client turnover  
11. Warranty  

Each stage has required exit artifacts before advancement. Procore monitors the full lifecycle schedule.

Southcrest-only small jobs may use a shorter subset later; do not invent a different full-school sequence.

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
