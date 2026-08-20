# System Map

## Current systems

| System | Role today | Likely future role |
|---|---|---|
| **Gmail** | Primary communication; owner receives copies of all employee sent/received email | Source for triage, extraction, commitment detection |
| **Google Drive** | Document storage | Project-centric file system of record + AI control area |
| **Google Sheets** | Working data | Project Master v1 and controlled registries |
| **Google Docs** | Documents / briefs | Project briefs, specs, narrative artifacts |
| **Procore** | Schedules and project tracking from prospecting/preliminary DD through turnover | Long-lifecycle operational schedule spine |
| **Meridian App (custom)** | Custom tasks and project management for Meridian work | BD/deal/task layer; identity consumer/producer |
| **This repo (`Southcrest-Command-Center`)** | Early home for Company OS | Agent instructions, apps, integrations, clean DB over time |
| **SPI Relationship Master** | School/operator relationship workbook in `01_Project Controls` | Source of truth for BD relationships, campuses, contacts, REL tasks, activities, opportunities, and related SC jobs |
| **BD lead-capture app** (`apps/business-development/`) | V1 field workbench + lead capture | Role-native UI on Relationship Master. Does not mint SC codes |

## Source-of-truth leanings (v1)

| Concern | Source of truth |
|---|---|
| Project / phase identity | Project Master (Sheet v1 → DB later) |
| Documents | Google Drive |
| Email content | Gmail |
| Construction/site schedules | Procore |
| Meridian tasks / BD workflow | Meridian App |
| School / operator relationships, BD leads, REL tasks | SPI Relationship Master |
| Agent operating brain | Git docs in `docs/company-os/` |

## Join keys

Everything should eventually resolve through:

1. `project_id` / `project_code`
2. `phase_id` (when applicable)
3. Meridian App IDs
4. Procore project IDs
5. Drive folder IDs
6. Alias values (names, APN, permit #, addresses, etc.)

## Data flows (target, not all built)

```text
Gmail (all employee copies)
  → Email Triage Agent
    → Project Master match
    → Drive filing (attachments + provenance)
    → Meridian tasks / notes (when warranted)
    → Human review queue (ambiguous / high risk)

Procore
  → Schedule / status sync
    → Clean DB
    → Role agents (PM, superintendent, exec briefings)

Meridian App
  ↔ Project Master IDs
  ↔ Tasks / deal state

Drive
  ↔ Project folders
  ↔ Project Master folder IDs
```

## Companies and shared functions

- Meridian and Southcrest are distinct operating companies.
- Shared functions include Business Development, accounting, and other company-wide admin.
- Intercompany and shared control artifacts live under a Shared company area in Drive.
- Project execution docs live under the project tree regardless of which company is active.
