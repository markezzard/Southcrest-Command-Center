# Roadmap

## Current phase

**Phase 1 — Project Master identity (starting)**  
Phase 0 docs foundation is in place. Now pressure-testing the identity model with real projects, then create the Project Master Sheet and Drive template.

### Progress notes
- 2026-08-12: Captured two closed-out full-lifecycle examples (Mater Davenport K-8; Mason Academy Naples).
- 2026-08-12: Deep-dived Mason Academy Vanderbilt K-8 from pitch → land search/assemblage → DD → permits → construction → turnover; derived lifecycle + org-role docs.
- 2026-08-12: Defined Prospecting exit gate (draft LOI sent; seller interest/terms, site look, fit test, feasibility, internal sign-off).
- 2026-08-12: Defined LOI exit gate (executed LOI signed by buyer and seller).
- 2026-08-12: Defined Contract/PSA exit gate (fully executed purchase and sale agreement after form send + redline negotiation).
- 2026-08-12: Defined Due Diligence gate (starts on PI letter; contractual ~90-day package with client sign-off; Procore schedule vs deadline dates).
- 2026-08-12: Defined Government Approvals gate (starts on written move-forward letter; ~240-day class contractual period; full permit package including ERP/SDP/FDEP/off-site).

## Intended build order

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

## Next discussion targets

1. Continue Mason deep dive: define **required exit artifacts per lifecycle stage**
2. Map those stage gates to Procore schedule monitoring responsibilities
3. Lock v1 Project Master Sheet tabs/columns from Mason-derived model
4. Project code format
5. Whether to create the Drive `Company_OS_AI` root + Project Master Sheet now

