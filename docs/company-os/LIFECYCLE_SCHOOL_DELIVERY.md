# Lifecycle — School Delivery Stages (owner-defined)

This is the **authoritative lifecycle stage list** for full Meridian → Southcrest school projects, as defined by ownership during the Mason Vanderbilt deep dive.

Earlier draft stage lists in this folder should defer to this document.

## Official stage sequence

| # | Stage | Typical company focus | Notes |
|---|---|---|---|
| 1 | **Prospecting** | Meridian | Land search, outreach, targeting, early client/site pursuit |
| 2 | **LOI** | Meridian | Letter of intent / deal structuring with land sellers |
| 3 | **Contract** | Meridian | Purchase/option contracts executed (may be multiple parcels) |
| 4 | **Due diligence** | Meridian | Formal DD period and investigations |
| 5 | **Government approvals** | Meridian | Entitlements/permits package (ERP, SDP, FDEP, offsite, etc.) |
| 6 | **Handover to GC** | Bridge | Transfer executable permitted project to GC — preferably Southcrest |
| 7 | **Development** | Southcrest | Site development / sitework |
| 8 | **Vertical construction** | Southcrest | Building construction |
| 9 | **Final inspections and punch-out** | Southcrest | Inspections, punch list, completion cleanup |
| 10 | **Client turnover** | Southcrest | Deliver/turn over to client |
| 11 | **Warranty** | Southcrest | Post-turnover warranty period/obligations |

> Numbering note: Prospecting is stage 1. LOI is stage 2. The list continues through Warranty.

## Gate rule (critical)

**Each stage has required artifacts** — documents, reports, permits, approvals, or other proof — that must be accomplished before the project can move to the next stage.

Examples of gate artifact types (not yet fully enumerated per stage):
- reports
- contracts / LOIs
- diligence deliverables
- permits / agency approvals
- handover package items
- inspection sign-offs
- turnover documents
- warranty setup / closeout records

Until those stage-exit requirements are satisfied, the project should not be treated as advanced.

## Procore role

- Procore contains the schedule that monitors the project **through this whole lifecycle**.
- Lifecycle is not only a Meridian concept or only a construction concept — it is one continuous staged journey.
- Future agents should use Procore schedule + stage gates together:
  1. know current lifecycle stage
  2. know required artifacts to exit that stage
  3. monitor schedule/email/docs for missing or at-risk items
  4. assist the responsible people in getting those items done
  5. help the project advance cleanly to the next stage

## Agent responsibility (directional)

Company/project agents are not just note-takers. Their job includes:

- monitoring lifecycle progress
- knowing what “done” means for the current stage
- helping gather/complete the required stage artifacts
- surfacing blockers early
- assisting handoff quality at stage 6 (Handover to GC)

Detailed per-stage artifact checklists still need to be laid out with ownership.

## Relationship to Project Master

Project Master should store at least:
- `lifecycle_stage` using this enum
- links to Procore schedule/project IDs
- eventual checklist/artifact status per stage (Sheet v1 may start simple; DB can deepen later)

## Open work

Sit down stage by stage and define the required exit artifacts for:
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
