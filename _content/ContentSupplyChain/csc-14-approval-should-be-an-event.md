---
title: 'Make approval an event: Frame.io webhooks to Fusion to Workfront and AEM'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'An event-driven handoff for Frame.io approvals using webhooks or Custom Actions and Fusion scenarios, plus the polling and email anti-patterns to avoid.'
image: '/assets/images/posts/ContentSupplyChain/csc-14-approval-should-be-an-event.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-14-approval-should-be-an-event.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Frame.io
  - Agentic AI
  - Solution Architecture
---

Approval in Frame.io should be a trigger, not the start of a manual relay.

The event-driven pattern:

Frame.io approval → webhook or Custom Action → Fusion scenario → update task status in Workfront, attach the approved version, write metadata to Workfront and AEM.

No download, no email, no re-upload. The human decision is the only manual step.

Two anti-patterns I'd design out. First, scheduled polling of Frame.io as the main integration pattern: you add latency and wasted calls when events are available. Second, email as the transport for embargoed work, which sits outside your permission model.

If you build this, assume an event can arrive more than once and make the scenario safe to re-run.

The agentic angle: put an agent reviewer before the human step, keep the human approval as the trigger, and make the Fusion scenario safe to re-run. Workfront's reviewer AI collaborator and the Frame.io integration make that pattern practical.

What does the handoff between Frame.io approval and the DAM look like in your setup today?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Workfront's unified review and approval joins Workfront and Frame.io, and its first AI Collaborator, the Content Reviewer, checks content against brand guidelines. A pre-check like that can shorten the human review, but the approval itself should remain a human decision that fires the Fusion handoff. Workfront's Change History now also captures unified review activity, which gives you an audit trail for agent-assisted approvals.

**Adobe tools to know**

- **Unified review and approval** (Workfront and Frame.io).
- **AI Collaborator, Content Reviewer**: brand-guideline check during review.
- **Fusion MCP Agent module** and **Workfront/AEM MCP connectors**: prompt-driven steps in the handoff scenario.
- **Workfront Change History**: governance trail for approval, stage and participant actions.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Run the agent reviewer first, then a human approval that fires the event.
- Make the Fusion scenario idempotent, since events can arrive more than once.
- Keep the audit trail: record what the agent checked and what the human decided. (Adobe adds review activity to Change History)

## Sources

- [The Workfront Wire, May 2026](https://experienceleaguecommunities.adobe.com/adobe-workfront-23/the-workfront-wire-may-2026-your-go-to-source-for-news-updates-events-250232)
- [Workfront Third Quarter 2026 release overview](https://experienceleague.adobe.com/en/docs/workfront/using/product-announcements/product-releases/release-26-q3/26-q3-release-overview)
- [Fusion release activity, week of 2026-08-17](https://experienceleague.adobe.com/en/docs/workfront-fusion/using/fusion-release-activity/fusion-releases-2026/fusion-2026-8-17)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-14-approval-should-be-an-event.pdf)
