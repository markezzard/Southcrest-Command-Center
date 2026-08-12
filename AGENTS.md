# AGENTS.md

Instructions for any Cursor agent working in `Southcrest-Command-Center`.

## What this repo is

Home for the **Company OS** of Meridian Land and Southcrest Management: operating docs first, then integrations, apps, data models, and agents that support both companies.

## Read first

Before making recommendations or changes, read:

- `docs/company-os/README.md`
- `docs/company-os/VISION.md`
- `docs/company-os/DECISIONS.md`
- `docs/company-os/ROADMAP.md`

Also read any topic-specific docs you are touching (`DATA_MODEL.md`, `DRIVE_TREE.md`, `SYSTEM_MAP.md`, etc.).

## Standing rules

1. **Docs are durable memory.** If a conversation produces a decision, schema change, system-map change, or roadmap change, update `docs/company-os/` in the same unit of work.
2. **Do not invent production automations on live company data** unless the user explicitly asks for implementation and the relevant docs support it.
3. **Human-gated by default.** Prefer classify / propose / shadow mode over sending email or mutating Procore/Drive structure unattended.
4. **Identity before triage.** Project Master / identity work precedes broad email automation.
5. **Project-centric Drive.** Never reintroduce client-rooted project storage as the primary model.
6. **Preserve company boundaries.** Meridian and Southcrest can share identity and BD relationships, but ownership/stage must stay explicit.
7. **Prefer small vertical slices.** One workstream/agent run should deliver one coherent slice with clear done conditions.

## When starting a new workstream thread

1. State the goal and done conditions.
2. Link/read the relevant Company OS docs.
3. Implement or discuss only in scope.
4. Update docs with durable outcomes before finishing.

## Current phase

Phase 0: establish and maintain Company OS documentation. Implementation of Project Master and live integrations comes next only when the user directs it.
