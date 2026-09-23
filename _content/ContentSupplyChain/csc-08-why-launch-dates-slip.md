---
title: 'Dependencies across teams need one graph, not many spreadsheets'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Why cross-team and cross-agency dates slip when each team tracks its own deliverables, and how unified templates and metadata fix the model.'
image: '/assets/images/posts/ContentSupplyChain/csc-08-why-launch-dates-slip.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-08-why-launch-dates-slip.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Workfront
  - Agentic AI
  - Solution Architecture
---

If every team tracks its own deliverables, nobody owns the dependency graph. A slip in legal review doesn't propagate to the agency's schedule, and no one finds out until the date has already moved.

A weekly reconciliation meeting is a human cron job. It doesn't fix the model. Neither does making an agency's PM tool the system of record, because then you have two graphs.

What works: centralize planning and execution in Workfront, with unified project templates, shared task structures and standardized metadata. That's what makes cross-team and cross-agency predecessors expressible in one place.

Templates are the underrated part. If every team structures work differently, you can't link across them cleanly, however good the tool is.

The agentic angle: Adobe positions Workfront's agents to inspect project health and surface risks early, but they can only see the dependencies you've modeled. Reports also describe agents as assignable resources, so give agent tasks real predecessors.

Are your project templates standardized across teams, or does every team have its own?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Adobe describes the Workflow Optimization Agent as inspecting project health and surfacing issues before they escalate, and reports say AI collaborators can be added to plans as assignable resources. That helps only if dependencies live in one graph. An agent looking at five team-specific spreadsheets sees five partial pictures.

**Adobe tools to know**

- **Workflow Optimization Agent**: project health inspection and risk surfacing.
- **AI Collaborators as assignable resources**: agent work appears in the project plan.
- **Workfront insights**: on-demand questions about work data.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Standardize templates and metadata first so agents can reason across teams and agencies.
- Assign agent work as normal tasks with predecessors so it appears in the same dependency graph.
- Treat agent risk flags as prompts for a human to confirm, not as decisions.

## Sources

- [Adobe planning and operations agents](https://business.adobe.com/products/experience-platform/agent-orchestrator/planning-operations.html)
- [UC Today: Workfront AI as an assignable resource](https://www.uctoday.com/project-management/adobe-workfront-makes-ai-an-assignable-project-resource/)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-08-why-launch-dates-slip.pdf)
