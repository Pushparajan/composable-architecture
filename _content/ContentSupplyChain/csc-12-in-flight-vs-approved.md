---
title: 'ESM for work in progress, AEM for approved: keep the lifecycle boundary'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Two storage concerns, two systems: Enterprise Storage Model for in-flight files and AEM Assets for approved content, with promotion as a lifecycle event.'
image: '/assets/images/posts/ContentSupplyChain/csc-12-in-flight-vs-approved.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-12-in-flight-vs-approved.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - ESM
  - Agentic AI
  - Solution Architecture
---

Two storage concerns, two systems. Mixing them is how you end up with drafts in the DAM or approved assets living on someone's laptop.

Enterprise Storage Model: a single home for in-flight files across Workfront, Frame.io and Creative Cloud. Work in progress stops living on local disks and in email.

AEM Assets: approved, searchable, rights-managed content.

The boundary is a lifecycle event. When work is approved, it graduates into AEM. Before that, it stays in ESM. Don't dump every draft into the DAM, and don't leave approved assets in WIP storage.

A quick diagnostic. WIP files scattered outside the platform? That's an ESM gap. Approved assets living outside AEM? That's a DAM gap, not an ESM one.

The agentic angle: work in progress and approved content need different agents. Frame.io's natural-language search helps with drafts, and Content Advisor Agent belongs on approved AEM content. Keep each on the right side of the boundary.

Where does draft-to-approved promotion happen in your process today, and what triggers it?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Frame.io supports natural-language search on paid plans, with visual search in beta for Teams and Enterprise, which helps people find in-flight media. Content Advisor Agent works on approved content in AEM Assets. If a reuse agent can see drafts, it will suggest them, so promotion into AEM should be the event that makes an asset discoverable for reuse.

**Adobe tools to know**

- **Frame.io natural-language search** (paid plans) and **visual search** (beta, Teams and Enterprise).
- **Content Advisor Agent**: approved content in AEM Assets.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Scope reuse agents to approved AEM content.
- Use in-flight search only for the production team working on that project.
- Promote into AEM with a status change that agents can filter on.

## Sources

- [Frame.io updates, September 2026](https://releasebot.io/updates/adobe/frameio)
- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-12-in-flight-vs-approved.pdf)
