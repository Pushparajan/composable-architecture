---
title: 'Paid and owned activation run on different planes'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'GenStudio for Performance Marketing covers paid activation; Journey Optimizer and Target cover owned channels, with Workfront and Fusion handling the handoff.'
image: '/assets/images/posts/ContentSupplyChain/csc-16-paid-and-owned-are-different-planes.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-16-paid-and-owned-are-different-planes.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - GenStudio
  - Agentic AI
  - Solution Architecture
---

A common question after a GenStudio for Performance Marketing rollout: can it also run our email journeys?

Not natively. Its center of gravity is paid activation, with native activation to paid destinations such as Meta and LinkedIn, and performance returning to GenStudio Insights when the third-party connectors are configured.

Owned channels live on a different plane. Adobe Journey Optimizer runs the journeys. Adobe Target runs the tests. Workfront coordinates the work in between, and approved assets and metadata pass across natively or through Fusion.

The detail worth designing for: Target tests should be created from structured Workfront deliverables. If someone is re-entering offers into Target by hand, the handoff is missing a data contract.

Two planes, two systems of record, one defined handoff.

The agentic angle: agent scopes should follow the planes. Content Production Agent and the GenStudio MCP on the paid side. Journey, Audience and Experimentation agents on the owned side. Target's MCP is read-only for now.

Which owned-channel handoff in your stack still involves manual re-entry?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Adobe's agents split along the same line as the article. For owned channels there are the Journey Agent, the Audience Agent and, in the Journey Optimizer Experimentation Accelerator, an Experimentation Agent, plus the Target MCP server. Target's MCP is in public beta and read-only, with write tools planned for general availability.

**Adobe tools to know**

- **Paid:** Content Production Agent; GenStudio for Performance Marketing MCP tool.
- **Owned:** Journey Agent, Audience Agent, Experimentation Agent; Target MCP (public beta, read-only).
- **Adobe Marketing Agent MCP**: audience analysis, AEP diagnostics, AJO B2B journey building.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Use one agent scope per plane.
- Don't design agent write flows into Target yet. (Adobe: only read tools today)
- Let Workfront carry approved assets and metadata across the boundary, and have agents read from there.

## Sources

- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)
- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-16-paid-and-owned-are-different-planes.pdf)
