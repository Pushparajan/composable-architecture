---
title: 'Content Supply Chain series: article intros'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'A 19-part series plus a bonus on designing an enterprise content supply chain across the Adobe stack, one decision at a time.'
image: '/assets/images/posts/ContentSupplyChain/csc-02-the-capability-map.png'
tags:
  - Adobe
  - Content Supply Chain
  - Architecture
  - GenStudio
---

Enterprise content supply chains fail less from missing tools than from unclear ownership between them. This series walks through how to design one across the Adobe stack without collapsing it into a single product: nineteen articles plus a bonus, each taking one design decision, showing the pattern, naming the anti-pattern, and ending with a rule you can test your own architecture against. Read them in order, or jump to the layer you own.

## Part 1: Foundations

- **1. [GenStudio for Performance Marketing is one loop, not the whole chain](/contentsupplychain/posts/csc-01-one-app-is-not-the-suite)**
  A project scoped as "implement GenStudio" can quietly become a project that never touches planning, the DAM or measurement. This article separates the one loop the product implements from the twelve-layer chain you may have been asked to transform, so you can fix the scope before build starts.
- **2. [Design the content supply chain as 12 layers with one system of record each](/contentsupplychain/posts/csc-02-the-capability-map)**
  Integrations get messy when nobody can say which system owns which data. This article introduces a twelve-layer model for the content supply chain, assigns each layer a system of record, and gives you a one-question test you can run against any data type in your stack.
- **3. [IMS org membership is authentication, not authorization](/contentsupplychain/posts/csc-03-why-a-new-hire-cant-open-genstudio)**
  A user can be in the Adobe org and still land on a blank screen in GenStudio. This article explains the difference between IMS authentication and product-profile entitlements, and what to automate so that access is a group-membership check instead of a day-one support ticket.
- **4. [One IMS org, one Workfront instance: isolate with groups, not tenants](/contentsupplychain/posts/csc-04-one-org-many-brands-and-agencies)**
  Multi-brand and multi-agency designs often start with a tenant per brand. This article shows why that fragments identity, reporting and workflow, and lays out the alternative: one IMS org, one Workfront instance, and isolation through groups, product profiles, workspaces and permissions.

## Part 2: The work system

- **5. [Model workspaces after real teams, and standardize the taxonomy underneath](/contentsupplychain/posts/csc-05-workspaces-should-mirror-your-org)**
  Rolling one platform out to several functions is a data-model problem before it's a training problem. This article covers how to shape workspaces around real teams, keep a shared core taxonomy underneath them, and avoid the personal workspaces that quietly break reporting.
- **6. [Don't use Workflow as a strategy tool: split Planning from execution](/contentsupplychain/posts/csc-06-the-shadow-spreadsheet)**
  If your campaign calendar lives in a spreadsheet next to a Workflow project tree, one layer is doing two jobs. This article splits strategy from execution between Workfront Planning and Workflow, and explains why adding Planning is cheaper than rebuilding Workflow.
- **7. [Automate the Planning to Workflow handoff: convert the record, pre-populate the form](/contentsupplychain/posts/csc-07-type-it-once)**
  Re-typing audience, campaign ID, market and channel at handoff is a missing data contract. This article covers the two building blocks that close it: converting Planning records into Workflow programs or projects, and pre-populating custom forms from the originating record.
- **8. [Dependencies across teams need one graph, not many spreadsheets](/contentsupplychain/posts/csc-08-why-launch-dates-slip)**
  When every team tracks its own deliverables, nobody owns the dependency graph. This article looks at why cross-team and cross-agency dates slip, and how unified templates, shared task structures and standardized metadata put those dependencies in one place.
- **9. [Controlled vocabularies are a schema decision, not a reporting fix](/contentsupplychain/posts/csc-09-free-text-breaks-reports)**
  Free-text fields push every typo and abbreviation into your reports, and no view filter can undo it. This article treats controlled vocabularies as a schema decision, and shows how to bring ERP and PIM attributes into Workfront through Fusion without asking anyone to re-key them.

## Part 3: Content and creation

- **10. [Reference approved assets from AEM; don't copy them into projects](/contentsupplychain/posts/csc-10-attach-dont-upload-again)**
  Every duplicated asset is a stale copy waiting to happen. This article shows how to attach approved AEM Assets from Workfront with Asset Selector or Content Advisor, keep metadata aligned with the native connector, and model legal clearance as a governed status instead of an email.
- **11. [Federate your DAMs; don't migrate them](/contentsupplychain/posts/csc-11-unified-view-without-migration)**
  A request for one view across all your repositories doesn't have to become a migration project. This article compares AEM federated asset management, Fusion-based copying and App Builder references, and explains which of them actually solves the single-view requirement.
- **12. [ESM for work in progress, AEM for approved: keep the lifecycle boundary](/contentsupplychain/posts/csc-12-in-flight-vs-approved)**
  Drafts in the DAM and approved assets on a laptop are the same bug seen from opposite sides. This article separates Enterprise Storage Model for work in progress from AEM Assets for approved content, and treats promotion between them as a lifecycle event.
- **13. [Enforce brand at generation time, not in review](/contentsupplychain/posts/csc-13-brand-at-generation)**
  Reviewers shouldn't be your brand-enforcement layer. This article moves the constraints into the generation flow: Brand Guidelines in the Create canvas, Firefly Custom Models, a governed claims library, and Firefly Services for bulk multi-market work.

## Part 4: Connect, activate, measure

- **14. [Make approval an event: Frame.io webhooks to Fusion to Workfront and AEM](/contentsupplychain/posts/csc-14-approval-should-be-an-event)**
  An approval in Frame.io should trigger work, not start an email relay. This article walks through an event-driven pattern using webhooks or Custom Actions and Fusion, shows what to update in Workfront and AEM, and calls out the polling and email anti-patterns to design out.
- **15. [Integration decision order: native, then App Builder or Fusion, then custom](/contentsupplychain/posts/csc-15-native-first-fusion-second-custom-last)**
  Custom integration code is code you maintain for as long as the system lives. This article gives you a four-question filter to run first, and clarifies the split between App Builder for UI inside products and Fusion for systems exchanging data.
- **16. [Paid and owned activation run on different planes](/contentsupplychain/posts/csc-16-paid-and-owned-are-different-planes)**
  GenStudio for Performance Marketing covers paid activation, and owned channels run on a different plane. This article maps paid and owned to their systems, and shows how Workfront and Fusion carry approved assets and metadata across the boundary.
- **17. [Asset-level measurement starts with a durable ID](/contentsupplychain/posts/csc-17-which-asset-drove-the-outcome)**
  Asset-level measurement breaks when an asset's identifier changes along the way. This article treats the asset ID as a primary key carried from Planning through AEM into activation, and explains where GenStudio Insights ends and Content Analytics with Customer Journey Analytics begins.

## Finale

- **18. [Architecture anti-patterns that look like governance](/contentsupplychain/posts/csc-18-anti-patterns)**
  Some designs look like governance on a diagram and fragment in production. This article lists six of them, shows the arithmetic against point-to-point integration, and describes the common shape of the fixes.
- **19. [A 7-phase rollout order, with acceptance tests](/contentsupplychain/posts/csc-19-the-seven-phase-rollout)**
  Order of implementation matters more than speed. This article lays out a seven-phase rollout sequence for the content supply chain, from identity and taxonomy through scale, and gives you acceptance tests to check whether the result is healthy.

## Bonus

- **20. [You don't need to replace your stack to use this architecture](/contentsupplychain/posts/csc-20-bonus-value-without-going-all-in)**
  Adopting this architecture doesn't mean replacing Jira, Salesforce, ERP, PIM or your agencies' tools. This article shows how Fusion, native connectors and App Builder fit around the systems you keep, so the gain is fewer manual handoffs, not a bigger migration.
