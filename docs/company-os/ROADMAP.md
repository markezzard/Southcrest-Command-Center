# Roadmap

## Current phase

**Phase 0 — Company OS foundation (docs + operating model)**  
In progress. Capture vision, decisions, systems, data model, Drive tree, and agent working agreements.

**Phase 0.5 — Owner Assistant charter (parallel, Mark only)**  
In progress as a docs/charter track. Daily brief + email/calendar/tasks design. **No live automations until Mark says so.** Does not replace Phase 1–3 for company-wide mail.

## Intended build order

### Phase 0.5 — Owner Assistant (parallel; does not block Phase 1)
- Charter: name/tone, daily loop, email + calendar + tasks, hard limits (`OWNER_ASSISTANT.md`)
- Later, only when Mark directs implementation: Calendar auth → task SoT → email access path → brief/propose mode
- Stay drafts-only until each capability is granted in the charter
- Do not treat this as deploying employee agents

### Phase 1 — Project Master identity
- Finalize parent/phase rules with real examples
- Create controlled Project Master Google Sheet
- Stand up Drive roots + project folder template
- Define code/ID issuance rules
- Seed aliases/contacts enough to support later triage

### Phase 2 — Systems Analyst pack
- Formal Systems Analyst charter
- Source inventory depth (Gmail, Drive, Sheets, Docs, Procore, Meridian App)
- Approval boundaries and agent registry
- Gap list and first builder tickets

### Phase 3 — Email triage + document librarian (shadow mode)
- Classify emails against Project Master
- Attachment review and Drive filing proposals
- Provenance + idempotency
- Human review queue; no autonomous sending

### Phase 4 — Clean database blend
- Migrate/sync identity from Sheet v1 into a real DB
- Ingest Procore project/schedule essentials
- Index Drive folder/doc links
- Store email-derived facts with source IDs

### Phase 5 — Meridian / Southcrest workflow agents
- BD lead vs project promotion flows
- Diligence / entitlements package helpers
- Handoff package Meridian → Southcrest
- Southcrest ops helpers on schedule variance / missing docs

### Phase 6 — Role agents, then personal employee agents
- Shared role agents first (Superintendent, PM, BD, Exec)
- Then per-employee instances scoped to their jobs
- Superintendent photo/plan verification loop is a flagship use case

## Explicit non-goals right now

- Unsupervised outbound email
- Fully autonomous agent spawning into production
- Personal employee agents before clean identity + data spine
- Replacing Procore schedules with a homegrown scheduler
- Live Owner Assistant automations (calendar writes, sending mail, unattended loops) until Mark says so

## Next discussion targets

1. Real project examples to pressure-test parent/phase + no-client cases
2. Exact lifecycle enums used in practice
3. Project code format
4. Whether to create the Drive `Company_OS_AI` root now
5. Systems Analyst interview outline
6. Lock Owner Assistant open items (name/tone, task SoT, email path, calendars in scope)
