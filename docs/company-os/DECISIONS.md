# Decisions

Append-only log of locked decisions. Newest first within each section is fine; keep rationale short.

## Process and memory

### D-001 — Establish Company OS docs as durable memory
- **Decision:** Store vision, decisions, system map, data model, Drive tree, roadmap, glossary, and agent charters (including Owner Assistant) in `docs/company-os/`.
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

## Owner Assistant

### D-020 — Owner Assistant is a parallel personal track
- **Decision:** Mark's Owner Assistant (Phase 0.5) may be chartered — and later run in brief/propose mode — without waiting for Project Master or employee agents. Scope is **his** assistant, not a rollout of agents for everyone.
- **Why:** He already receives all employee sent/received copies; calendar + inbox + owner tasks are useful immediately. Employee agents still need the company data spine.
- **Date:** 2026-08-12

### D-021 — Owner Assistant stays drafts-only until a capability is granted in the charter
- **Decision:** OA may read, classify, and propose. It may not send email, mutate calendar, file Drive project trees, write Meridian App/Procore, or spawn agents until Mark grants that capability in `OWNER_ASSISTANT.md`. Read-loop implementation is on (2026-08-12). Calendar writes stay off until recommendations look right, then may run without per-item review after a written grant.
- **Why:** Same as D-005. Trust is earned per action type. Mark asked to implement the read loop and earn calendar-write trust next.
- **Date:** 2026-08-12

### D-022 — Keep Owner Assistant, company email triage, and executive briefing as three layers
- **Decision:** (1) Owner Assistant = Mark's personal EA (inbox attention, calendar, owner-level tasks). (2) Company Email Triage = Phase 3 shared agent after Project Master, shadow mode, filing + provenance. (3) Executive / role agent = Phase 6 company rollup. OA may later feed (3); it must not impersonate (2).
- **Why:** Mixing them either delays the personal loop or skips identity work required for company filing.
- **Date:** 2026-08-12

### D-024 — Owner Assistant identity, tone, and attention filter
- **Decision:** Name **Owner Assistant** / **OA**, neutral persona. Tone: direct, no fluff. Attention filter: cash → clients → permits → people → schedule risk. Timezone: America/New_York.
- **Why:** Mark said lock the draft defaults.
- **Date:** 2026-08-12

### D-025 — Calendars: work and personal, read-only until trust
- **Decision:** OA reads **both** work and personal calendars. v1 is read-only. After Mark sees correct recommendations, unattended calendar writes may be granted in the charter without per-item review.
- **Why:** Mark, 2026-08-12.
- **Date:** 2026-08-12

### D-026 — 6:00 AM ET scheduled brief in Cursor; Gmail is a source not the chat
- **Decision:** Daily brief at **6:00 AM America/New_York** via a Cursor Automation (Private, runs as Mark). Conversation stays in the Owner Assistant Cursor thread. Gmail is read-only input. OA does not live in Gmail and does not send. A dated Google Doc in the Owner Assistant Drive folder is the phone-readable copy.
- **Why:** Mark asked where the interaction happens and asked to implement a 6:00 AM brief.
- **Date:** 2026-08-12

### D-027 — Owner Assistant task system of record
- **Decision:** v1 tasks live in Google Doc `Owner Assistant — Tasks`. Intended SoT is Google Tasks once that access exists.
- **Why:** Drive is already connected; Google Tasks is not.
- **Date:** 2026-08-12

## Identity and data foundation

### D-010 — Start with Project Master before email triage
- **Decision:** Build Project Master (identity layer) first. This gates **company** email triage and filing (Phase 3), not Mark's Owner Assistant attention loop (D-020).
- **Why:** Company filing requires stable project resolution. OA personal triage does not file.
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
- **Direction:** After clean shared data exists, create role agents (superintendent, PM, etc.), then personal instances per employee. Mark's Owner Assistant is not the template for that rollout.
- **Not decided yet:** exact permissions, notification channels, photo QA workflow details.
- **Date:** 2026-08-12

### D-101 — Future Account / School Relationship object
- **Direction:** Likely need an account/school layer above projects for BD and long-term relationship continuity.
- **Not decided yet:** schema and Drive representation.
- **Date:** 2026-08-12

### D-102 — Employee-copy mail as a sensor (Owner Assistant)
- **Decision:** Mail to/from Mark is the default brief pool. Copies of employee sent/received mail that land in Mark's inbox are skipped unless cash, clients, permits, people, schedule risk, legal, LOI, or municipal/political means he must step in.
- **Why:** Otherwise the 6:00 AM brief is unusable. Mark asked what "employee copy email" meant; this is the locked plain-language rule.
- **Date:** 2026-08-12
