# Decisions

Append-only log of locked decisions. Newest first within each section is fine; keep rationale short.

## Process and memory

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

## Business Development and Relationship Master

### D-017 — SPI Relationship Master is the BD / school-relationship store
- **Decision:** Business Development lead capture and relationship continuity use the existing SPI Relationship Master Google Sheet in `01_Project Controls` (`1mE1Y2vJ5uKRW-VcQ6oMs9yUhmlwc-q91vXlFp7caMCg`). Do not invent a parallel database or use Pedro’s Meridian Project Command Center as the store.
- **Why:** Relationships, campuses, contacts, ownership, opportunities, REL tasks, activities, and related jobs already live there. One store.
- **Date:** 2026-08-20

### D-018 — Opportunity vs job
- **Decision:** An Opportunity is a REL pursuit with no `SC-####` yet. Once a job has an SC code it lives only on the Jobs tab and shows on the parent REL as a related job. This app never mints SC codes or copies signed-up jobs onto Opportunities.
- **Why:** Mark 18 Aug 2026: do not mint SC-#### from a lead. Promotion to Prospecting stays on the existing jobs book through the existing human gate.
- **Date:** 2026-08-20

### D-019 — Relationships stay open when jobs close
- **Decision:** Completing a job does not complete or close the parent relationship. Mason Classical Academy remains Active Client after Gym and K-8 completion.
- **Why:** The company relationship outlives individual projects.
- **Date:** 2026-08-20

### D-020 — Retired REL codes are never reused
- **Decision:** Do not reuse REL-0003, 0007, 0008, 0010, 0011, or 0013. Plato Academy is REL-0002, not REL-0001. Somerset is folded into Academica (REL-0001). Cambo / Robert Cambo are folded into Alliance Development (REL-0009).
- **Why:** 18 Aug 2026 cleanup. Recycled codes break history.
- **Date:** 2026-08-20

### D-021 — Role names in the BD app
- **Decision:** The BD app uses the role Business Development. Do not hard-code employee names into page names, buttons, nav, or workflows.
- **Why:** Company-based product, not employee-based. Ownership is a role; opportunity participation is separate.
- **Date:** 2026-08-20

### D-022 — BD app is its own package
- **Decision:** V1 lives at `apps/business-development/`. It is not bolted onto a field book or Command Center rebuild.
- **Why:** This repo was Company OS docs; the BD slice is a clear app package on the existing store.
- **Date:** 2026-08-20

## Deferred (directionally agreed, not fully designed)

### D-100 — Future employee agents
- **Direction:** After clean shared data exists, create role agents (superintendent, PM, etc.), then personal instances per employee.
- **Not decided yet:** exact permissions, notification channels, photo QA workflow details.
- **Date:** 2026-08-12

### D-101 — Future Account / School Relationship object
- **Direction:** Implemented in V1 as SPI Relationship Master REL records. See D-017 and [BD_LEAD_CAPTURE.md](./BD_LEAD_CAPTURE.md).
- **Date:** 2026-08-12; locked 2026-08-20
