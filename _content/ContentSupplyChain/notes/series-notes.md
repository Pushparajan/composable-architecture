# Content supply chain series: notes (architect-to-developer edition)

Working notes for each post: alternate hooks and a suggested first comment.
The post text itself is in each `.md` file. Carousel PDFs were rebuilt with cover illustrations, a diagram page, and Agentic angle, Best practices and Sources pages.

## Index

| # | Post | File |
|---|---|---|
| 1 | GenStudio for Performance Marketing is one loop, not the whole chain | `csc-01-one-app-is-not-the-suite.md` |
| 2 | Design the content supply chain as 12 layers with one system of record each | `csc-02-the-capability-map.md` |
| 3 | IMS org membership is authentication, not authorization | `csc-03-why-a-new-hire-cant-open-genstudio.md` |
| 4 | One IMS org, one Workfront instance: isolate with groups, not tenants | `csc-04-one-org-many-brands-and-agencies.md` |
| 5 | Model workspaces after real teams, and standardize the taxonomy underneath | `csc-05-workspaces-should-mirror-your-org.md` |
| 6 | Don't use Workflow as a strategy tool: split Planning from execution | `csc-06-the-shadow-spreadsheet.md` |
| 7 | Automate the Planning to Workflow handoff: convert the record, pre-populate the form | `csc-07-type-it-once.md` |
| 8 | Dependencies across teams need one graph, not many spreadsheets | `csc-08-why-launch-dates-slip.md` |
| 9 | Controlled vocabularies are a schema decision, not a reporting fix | `csc-09-free-text-breaks-reports.md` |
| 10 | Reference approved assets from AEM; don't copy them into projects | `csc-10-attach-dont-upload-again.md` |
| 11 | Federate your DAMs; don't migrate them | `csc-11-unified-view-without-migration.md` |
| 12 | ESM for work in progress, AEM for approved: keep the lifecycle boundary | `csc-12-in-flight-vs-approved.md` |
| 13 | Enforce brand at generation time, not in review | `csc-13-brand-at-generation.md` |
| 14 | Make approval an event: Frame.io webhooks to Fusion to Workfront and AEM | `csc-14-approval-should-be-an-event.md` |
| 15 | Integration decision order: native, then App Builder or Fusion, then custom | `csc-15-native-first-fusion-second-custom-last.md` |
| 16 | Paid and owned activation run on different planes | `csc-16-paid-and-owned-are-different-planes.md` |
| 17 | Asset-level measurement starts with a durable ID | `csc-17-which-asset-drove-the-outcome.md` |
| 18 | Architecture anti-patterns that look like governance | `csc-18-anti-patterns.md` |
| 19 | A 7-phase rollout order, with acceptance tests | `csc-19-the-seven-phase-rollout.md` |
| Bonus | You don't need to replace your stack to use this architecture | `csc-20-bonus-value-without-going-all-in.md` |

## 1. GenStudio for Performance Marketing is one loop, not the whole chain

**Alternate hooks**

1. 'Implement GenStudio' and 'transform the content supply chain' are two different scope statements.
2. GenStudio for Performance Marketing is one loop: create, activate to paid, learn. Here's what sits outside it.

**First comment**

Quick exercise for your next kickoff: list the twelve layers of the chain, then mark which ones the current scope actually touches. Happy to share the layer list if useful.

## 2. Design the content supply chain as 12 layers with one system of record each

**Alternate hooks**

1. Before you draw an integration arrow, name a system of record for every layer.
2. When two systems can both be 'the truth' for a field, you've built a reconciliation job.

**First comment**

Try it on your own stack: pick three data types (campaign, asset, product attributes) and name the system of record for each. Where did you hesitate?

## 3. IMS org membership is authentication, not authorization

**Alternate hooks**

1. User is in the IMS org. User still can't open GenStudio. Check the product profile.
2. Authentication says who you are. A product profile says what you can use.

**First comment**

If you script onboarding, do you assert on group membership or on individual profile assignments? I'd pick groups every time.

## 4. One IMS org, one Workfront instance: isolate with groups, not tenants

**Alternate hooks**

1. Onboarding a new brand should mean new groups and a workspace, not a new tenant.
2. A tenant per brand looks like isolation. It's really split identity, split reporting and split workflow.

**First comment**

For anyone who's inherited a multi-tenant setup: what was the hardest thing to reconcile across tenants, identity or reporting?

## 5. Model workspaces after real teams, and standardize the taxonomy underneath

**Alternate hooks**

1. Shared core, tailored edges. It's the same rule for a multi-tenant app and a multi-team rollout.
2. If one BU says 'Channel' and another says 'Media Type,' no query will reconcile that for you.

**First comment**

Who owns the core taxonomy in your org: central ops, a platform team, or nobody in particular?

## 6. Don't use Workflow as a strategy tool: split Planning from execution

**Alternate hooks**

1. The campaign calendar lives in a spreadsheet next to a Workflow project tree. That's a data-model smell.
2. Workflow runs work. It was never meant to be your planning layer.

**First comment**

If you're doing this migration, start by listing which objects in your Workflow tree are really strategy records. That list is your Planning schema.

## 7. Automate the Planning to Workflow handoff: convert the record, pre-populate the form

**Alternate hooks**

1. A handoff without a data contract will always drift. Here's the fix for Planning to Workflow.
2. Enter metadata once, at the point of origin. Everything downstream inherits it.

**First comment**

Which single field causes the most rework when it's typed twice? Mine would be campaign ID.

## 8. Dependencies across teams need one graph, not many spreadsheets

**Alternate hooks**

1. A weekly reconciliation meeting is a human cron job. It doesn't fix the model.
2. If every team tracks its own deliverables, nobody owns the dependency graph.

**First comment**

Where do cross-agency dependencies live in your setup: in the work system, or in someone's head?

## 9. Controlled vocabularies are a schema decision, not a reporting fix

**Alternate hooks**

1. You can't filter your way out of free-text data. It's a schema problem.
2. 'Paid Social,' 'paid-social,' 'PS.' Your reporting layer inherits all three.

**First comment**

Audit tip: export one dimension (channel is a good one) and count the distinct values. The number is usually a good argument for a controlled list.

## 10. Reference approved assets from AEM; don't copy them into projects

**Alternate hooks**

1. Reference semantics beat value semantics, even for brand assets.
2. Every duplicate asset is a stale copy waiting to happen.

**First comment**

Where does the first copy of an approved asset get made in your process: download, upload, or an email attachment?

## 11. Federate your DAMs; don't migrate them

**Alternate hooks**

1. 'One view across all repositories' does not mean 'migrate everything.'
2. Solve the single-view requirement at the presentation layer before you touch storage.

**First comment**

If you have an external DAM that has to stay, how are you exposing it to creators today: manual links, or something built into the tool?

## 12. ESM for work in progress, AEM for approved: keep the lifecycle boundary

**Alternate hooks**

1. Drafts in the DAM and approved assets on a laptop are the same bug from opposite directions.
2. Promotion from work in progress to approved should be a lifecycle event, not a habit.

**First comment**

Who or what triggers promotion into AEM in your setup: a person, a workflow step, or an automation?

## 13. Enforce brand at generation time, not in review

**Alternate hooks**

1. Same principle as input validation in code: reject bad input at the boundary.
2. If brand compliance only happens in review, your reviewers are the enforcement layer.

**First comment**

For regulated content, where does claims validation sit in your flow: before generation, during, or at legal review?

## 14. Make approval an event: Frame.io webhooks to Fusion to Workfront and AEM

**Alternate hooks**

1. Frame.io approval → webhook → Fusion → Workfront and AEM. One human step, zero downloads.
2. Polling for something you can subscribe to is latency you chose.

**First comment**

If you've built this, how are you handling duplicate events? I'd want the scenario to be idempotent from day one.

## 15. Integration decision order: native, then App Builder or Fusion, then custom

**Alternate hooks**

1. Native first, Fusion second, custom last. Four questions, asked in order.
2. Fusion doesn't render product UI. App Builder isn't your orchestrator.

**First comment**

Think of your last integration. Which of the four questions did you skip?

## 16. Paid and owned activation run on different planes

**Alternate hooks**

1. 'Can GenStudio for Performance Marketing run our email journeys?' Not natively. Here's what does.
2. If someone re-enters offers into Target by hand, the handoff is missing a data contract.

**First comment**

Which side of the paid/owned boundary has the messier handoff in your stack today?

## 17. Asset-level measurement starts with a durable ID

**Alternate hooks**

1. You can't join what you can't identify. Asset measurement starts with a primary key.
2. If an asset gets re-uploaded along the way, the join key is gone.

**First comment**

Take one live asset and trace it. At which system does its identifier change or disappear?

## 18. Architecture anti-patterns that look like governance

**Alternate hooks**

1. Six systems can need up to fifteen pairwise integrations. Every new system adds more.
2. Some designs look careful on a diagram and fragment in production.

**First comment**

Which of the six is closest to your current design? Most stacks I'd review would have at least one.

## 19. A 7-phase rollout order, with acceptance tests

**Alternate hooks**

1. If you scale volume onto loose identity and free-text metadata, you scale the mess.
2. Seven phases in a deliberate order, and five tests to tell if it's healthy.

**First comment**

Which acceptance test would your current setup fail first? I'd bet on the metadata-typed-once one.

## Bonus. You don't need to replace your stack to use this architecture

**Alternate hooks**

1. 'We're keeping Jira.' Good. This design doesn't need you to replace it.
2. The win isn't consolidation. It's removing re-keying between systems that stay.

**First comment**

Which non-Adobe system is the hardest to keep in sync today: Jira, Salesforce, ERP, PIM, or an agency tool?
