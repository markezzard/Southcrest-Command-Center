# Decisions

Append-only log of locked decisions. Newest first within each section is fine; keep rationale short.

## Process and memory

### D-017 — Classic school delivery pattern confirmed with real examples
- **Decision:** Treat “Meridian finds land → approvals/permits → Southcrest builds → closeout” as a primary project pattern in Project Master.
- **Evidence:** Mater Davenport K-8 (Academica) and Mason Academy (Naples, FL).
- **Implication:** Parent project + at least two company-owned phases is the default for these jobs; superintendent may change over time, so staffing needs primary and/or history.
- **Date:** 2026-08-12

### D-018 — Mason Vanderbilt is the deep-dive reference project
- **Decision:** Use Mason Academy Vanderbilt K-8 as the primary end-to-end reference for lifecycle, assemblage, permits, and org roles.
- **Why:** Owner provided a full narrative from pitch through turnover (~4 years), including four-parcel Vanderbilt Road assemblage and major offsite/wetland complexity.
- **Implication:** Project Master must support multi-parcel contracts under one parent project; lifecycle must include outreach, LOI/contract, DD, approvals package, then Southcrest site/building/turnover.
- **Date:** 2026-08-12

### D-019 — Official lifecycle stages + gate artifacts + Procore spine
- **Decision:** Full school projects use this stage sequence: Prospecting → LOI → Contract → Due diligence → Government approvals → Handover to GC → Development → Vertical construction → Final inspections and punch-out → Client turnover → Warranty.
- **Gate rule:** Each stage has required artifacts/documents/reports/permits (or equivalent) that must be completed before advancing.
- **System rule:** Procore schedule monitors the project across this entire lifecycle.
- **Agent rule:** Agents should monitor stage progress and help responsible people obtain the required items to advance stages.
- **Date:** 2026-08-12

### D-001 — Establish Company OS docs as durable memory
- **Decision:** Store vision, decisions, system map, data model, Drive tree, roadmap, and glossary in `docs/company-os/`.
- **Why:** Chat threads compress and are not reliable six-month memory.
- **Date:** 2026-08-12

### D-002 — Hub thread + workstream threads
- **Decision:** Keep a pinned strategy hub for direction; use separate threads/agents per workstream or deliverable.
- **Why:** Context windows are finite; focused agents perform better.
- **Date:** 2026-08-12

### D-003 — Docs update obligation
- **Decision:** Any thread that creates durable decisions must update these repo docs. Agents should treat docs updates as part of done.
- **Why:** Continuity across agents and months.
- **Date:** 2026-08-12

### D-004 — Git docs + Drive control area
- **Decision:** Architecture/operating brain lives in git. Google Drive holds business artifacts, Project Master sheet, exports, and an AI control working area (`Company_OS_AI` or equivalent). Do not keep the only copy of the operating brain only in Drive.
- **Why:** Agents reliably read the repo; Drive is the business file system.
- **Date:** 2026-08-12

### D-005 — Human-gated autonomy
- **Decision:** Start with read/classify/file/propose. Do not auto-send email or unsupervised high-impact mutations until explicitly approved per capability.
- **Why:** Land + construction errors are expensive and long-lived.
- **Date:** 2026-08-12

## Identity and data foundation

### D-010 — Start with Project Master before email triage
- **Decision:** Build Project Master (identity layer) first.
- **Why:** Email triage requires stable project resolution.
- **Date:** 2026-08-12

### D-011 — Project-centric Drive tree (not client-centric)
- **Decision:** Projects are rooted under `/02_Projects/{Project Code} - {Short Name}`, not under client folders.
- **Why:** Clients may be absent, change, drop a site, or be replaced during a multi-year lifecycle.
- **Date:** 2026-08-12

### D-012 — Parent project + phases
- **Decision:** Model parent project and phases. Operational links (especially Procore/staffing) often live at phase level.
- **Why:** Multi-phase school projects can extend beyond 10 years.
- **Date:** 2026-08-12

### D-013 — Company participation is metadata, not separate project trees
- **Decision:** A project may be Meridian-only, Southcrest-only, or both. Same project folder/identity; ownership/stage tracked in Project Master.
- **Why:** Avoid duplicate trees and broken handoffs.
- **Date:** 2026-08-12

### D-014 — Client is relationship history, not folder identity
- **Decision:** Track `current_client` as nullable + client history. Project folder naming should prefer project code + site/project short name, not client name.
- **Why:** Client churn must not force Drive migrations.
- **Date:** 2026-08-12

### D-015 — Sheets as Project Master v1
- **Decision:** Use a controlled Google Sheet as Project Master v1, with path toward a clean database later.
- **Why:** Fast to stand up; migrate once the model stabilizes.
- **Date:** 2026-08-12

### D-016 — Shared BD, separate funnels
- **Decision:** Business Development is a shared function feeding Meridian expansion pursuits and Southcrest remodel/maintenance/positioning work. Leads are not automatically projects.
- **Why:** Same school relationships span both companies and different lifecycle lengths.
- **Date:** 2026-08-12

## Deferred (directionally agreed, not fully designed)

### D-100 — Future employee agents
- **Direction:** After clean shared data exists, create role agents (superintendent, PM, etc.), then personal instances per employee.
- **Not decided yet:** exact permissions, notification channels, photo QA workflow details.
- **Date:** 2026-08-12

### D-101 — Future Account / School Relationship object
- **Direction:** Likely need an account/school layer above projects for BD and long-term relationship continuity.
- **Not decided yet:** schema and Drive representation.
- **Date:** 2026-08-12
