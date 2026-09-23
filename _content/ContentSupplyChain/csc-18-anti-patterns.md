---
title: 'Architecture anti-patterns that look like governance'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Six designs that look careful on a diagram and fragment in production, the math against point-to-point integration, and the shared shape of the fixes.'
image: '/assets/images/posts/ContentSupplyChain/csc-18-anti-patterns.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-18-anti-patterns.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Architecture
  - Governance
  - Agentic AI
---

Some designs look careful on a diagram and fragment in production:

An IMS org per brand, or a Workfront instance per agency.
Point-to-point APIs between every pair of systems.
Free-text fields for campaign and channel.
A spreadsheet as the Planning to Workflow handoff.
A weekly BI export as the "single picture."
Custom UI built in Fusion.

The math on point-to-point is worth showing stakeholders: six systems can need up to fifteen pairwise integrations, and every new system adds more. A hub with native connectors doesn't scale that way.

The fixes share a shape: one org with groups and profiles, one Workfront instance with group permissions, Fusion plus native connectors, controlled vocabularies, records that convert, sync in the work path, and App Builder for product UI.

The agentic angle: these anti-patterns have agent versions. One broad service account across brands. Point-to-point agent wiring. Treating agent output as a source of truth. Dropping human approval to save a step.

Which one is closest to something in your current design?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Each design mistake in the article has an agent-era twin. Adobe's own architecture pushes the other way: agents follow the user's permissions, plans are visible and can be intervened on, CX Coworker Gateway offers one endpoint instead of many, and Workfront describes a governed registry for AI collaborators.

**Adobe tools to know**

- **CX Coworker Gateway**: one MCP endpoint instead of many connections.
- **Agent Orchestrator**: visible plans with human intervention.
- **Governed AI collaborator registry** (Workfront).

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Give agents narrow, named, auditable identities.
- Use a gateway or hub instead of pairwise agent-to-system wiring.
- Keep the system of record authoritative: agents propose, and humans or rules commit.
- Check the IMS org on every MCP connection. (Adobe)

## Sources

- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)
- [Adobe Experience Platform Agent Orchestrator](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/agents/agent-orchestrator)
- [Adobe Workfront product page](https://business.adobe.com/products/workfront.html)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-18-anti-patterns.pdf)
