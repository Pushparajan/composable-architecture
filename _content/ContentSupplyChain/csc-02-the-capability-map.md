---
title: 'Design the content supply chain as 12 layers with one system of record each'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'A reference layer model for architects and developers: twelve layers, each with a single system of record, so integrations have clear ownership.'
image: '/assets/images/posts/ContentSupplyChain/csc-02-the-capability-map.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-02-the-capability-map.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Architecture
  - Governance
  - Agentic AI
---

Before you draw a single integration arrow, list the layers and name a system of record for each. Here are the twelve I design around:

Who and what: identity and access, strategy and intake, execution.
Content: approved content, work in progress, create.
Delivery: paid media, review, orchestration, UI extensibility.
Outcome: owned activation, measurement.

Then assign owners. Workfront Planning for strategy. Workflow for execution. AEM Assets for approved content. Fusion for orchestration. App Builder for UI extensions.

The rule that keeps the diagram honest: every data type has exactly one owner, and everything else references it. When two systems can both be "the truth" for the same field, you've built a reconciliation job.

The "one big platform" diagram looks simpler until you have to debug it.

The agentic angle: agents are one more consumer of your layers. Adobe's Agent Orchestrator builds a visible step-by-step plan across agents, so you can check which systems it intends to touch. That only works if every data type has one owner.

Pick one data type in your stack. Can you point to its single owner?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Treat the Agent Orchestrator as coordination on top of the twelve layers, not a thirteenth layer that owns data. It interprets a goal, builds a step-by-step plan, shows it in AI Assistant, and lets people intervene. Agents act through each application's own permissions, so each layer's system of record stays authoritative. CX Coworker Gateway gives an MCP client one endpoint into several of those applications.

**Adobe tools to know**

- **Agent Orchestrator**: reasoning engine that plans work across agents. Documented; general availability announced September 2025. Agent jobs consume AI credits.
- **CX Coworker Gateway**: one MCP endpoint to Journey Optimizer, Customer Journey Analytics, Real-Time CDP and more, based on your licenses. Access is requested from Adobe.
- **AI Assistant**: the conversational interface where agent plans are shown.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Give each agent a defined layer and the systems of record it may read or write.
- Review the Orchestrator's plan before letting it run multi-system tasks. (Adobe)
- Log which agent touched which record so ownership stays traceable.

## Sources

- [Adobe Experience Platform Agent Orchestrator](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/agents/agent-orchestrator)
- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)
- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-02-the-capability-map.pdf)
