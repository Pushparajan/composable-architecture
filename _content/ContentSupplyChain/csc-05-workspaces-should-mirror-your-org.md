---
title: 'Model workspaces after real teams, and standardize the taxonomy underneath'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Rolling out to many functions: shared core taxonomy, tailored forms and permissions per team, and why personal workspaces break reporting.'
image: '/assets/images/posts/ContentSupplyChain/csc-05-workspaces-should-mirror-your-org.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-05-workspaces-should-mirror-your-org.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - GenStudio
  - Agentic AI
  - Solution Architecture
---

Rolling one platform out to Creative, Brand, Product Marketing, Field Marketing and Compliance? Don't ship a generic workspace and hope teams adapt.

Design it the way you'd design any multi-tenant app: shared core, tailored edges.

Shared core: intake workflow, terminology, core record types and field names.
Tailored edges: forms, groups and permissions per team, mapped to real roles and processes.

Separate Planning workspaces per business unit are fine. They only work if the core taxonomy is identical, because that's what lets you report across them. If one BU calls it "Channel" and another calls it "Media Type," no query will reconcile that for you.

And skip unconstrained personal workspaces. They quietly break operational reporting.

The agentic angle: Adobe's Workflow Optimization Agent can build Planning workspaces from plain-language descriptions. It builds on whatever taxonomy you already have, so publish the shared core first and let the agent generate against it.

Does your taxonomy have a single owner, or does each BU keep its own copy?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Workfront's Workflow Optimization Agent can set up and maintain Planning workspaces from everyday-language descriptions, and Planning includes basic Workfront AI Assistant functions. That speeds setup, but one analyst view is blunt: an agent inherits inconsistent field names, record types and status models. The core taxonomy is a prerequisite, not a follow-up.

**Adobe tools to know**

- **Workflow Optimization Agent**: builds structured plans and workspaces, speeds approvals, surfaces insights. Announced at Summit April 2026. One report says it was rebranded into AI Collaborators, so verify naming and scope in your tenant.
- **Workfront AI Assistant** in Planning: basic functions included with Planning.
- **AI Collaborators**: assignable agent teammates.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Publish core record types, field names and statuses before any agent-generated workspace.
- Review agent-created workspaces against the shared core before other teams use them.
- Keep personal workspaces out of scope so agent-created structure doesn't bypass reporting.

## Sources

- [Adobe blog: Workflow Optimization Agent](https://business.adobe.com/blog/intent-into-intelligent-execution-adobe-workflow-optimization-agent)
- [Antegma: Workfront 2026 and AI orchestration (third party)](https://www.antegma.com/en/blog/2026/04/23/adobe-workfront-2026-system-of-record-ai-orchestration-layer/)
- [Adobe Workfront product description](https://helpx.adobe.com/in/legal/product-descriptions/adobe-workfront.html)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-05-workspaces-should-mirror-your-org.pdf)
