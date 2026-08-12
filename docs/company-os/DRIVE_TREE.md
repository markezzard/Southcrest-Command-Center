# Drive Tree (v1 draft)

## Principles

1. **Project-centric storage** — projects do not live under client folders.
2. **Client is metadata** — optional `/03_Clients` area uses shortcuts/links, not master file storage for project docs.
3. **Company areas hold entity-wide functions** — accounting, HR, legal, shared BD, templates.
4. **Same project folder** whether Meridian-only, Southcrest-only, or both.
5. **AI control area** is separate from project execution files.

## Proposed top level

```text
/01_Companies
  /Meridian_Land
    /Admin
    /Accounting
    /HR
    /Legal
    /Templates
    /Business_Development_Intake
  /Southcrest_Management
    /Admin
    /Accounting
    /HR
    /Safety
    /Templates
    /Business_Development_Intake
    /Operations_General
  /Shared
    /Accounting_Intercompany
    /Business_Development
      /Lead_Generation
      /School_Relationships
      /Campaigns_Outreach
      /Passed_to_Meridian
      /Passed_to_Southcrest
      /Templates
    /Project_Master
    /Company_OS_AI
      /00_Control
      /01_Inbox_Working
      /02_Exports_Snapshots
      /03_Prompts_Specs
      /99_Archive
    /Vendor_Master
    /Standards_SOPs
    /Templates

/02_Projects
  /{Project Code} - {Short Name}
    /_Meta
    /00_Admin
    /01_Correspondence
    /02_Land_Acquisition
    /03_Contracts
    /04_Due_Diligence
    /05_Entitlements_Permitting
    /06_Design
    /07_Handoff
    /08_Site_Development
    /09_Construction
    /10_Closeout_Turnover
    /90_Accounting_Project
    /99_Archive
    /_Phases
      /P01_...
      /P02_...

/03_Clients
  /{Client Name}
    /_Profile
    /Contracts_Master
    /Correspondence_General
    /Links_to_Projects

/04_Sites_Land_Bank          ← optional pre-project holding area
  /{Site Code} - {Site Name}
```

## Naming

Preferred project folder pattern:

`PRJ-0418 - Westfield ES Site`

Avoid putting current client name in the folder title when client churn is likely.

## Filing notes

- Email attachments (future): prefer `01_Correspondence/YYYY/MM/` plus metadata links to project/phase.
- Do not over-sort into many microfolders on day one.
- Store Drive **folder IDs** in Project Master, not only paths.
- Phase subfolders are created when needed.

## Promotion rule

- Immature BD outreach can live in Shared BD / company intake areas.
- Create a `/02_Projects` record when a site/pursuit needs stable identity for docs, aliases, or email matching.
