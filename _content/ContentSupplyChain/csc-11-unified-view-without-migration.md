---
title: 'Federate your DAMs; don''t migrate them'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Meeting a ''single view'' requirement across repositories with AEM federated asset management and App Builder references, instead of copying binaries.'
image: '/assets/images/posts/ContentSupplyChain/csc-11-unified-view-without-migration.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-11-unified-view-without-migration.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - AEM
  - Agentic AI
  - Solution Architecture
---

Requirement: "one view across all our repositories." Reflex: a migration project.

Before you plan the forklift, look at what you have. If it's several AEM instances (approved assets, archives, regional and compliance content, say), AEM federated asset management connects the secondary repositories and presents a unified view without relocating the assets.

Don't reach for Fusion to copy binaries between instances and call it federation. That's a copy or migration pattern, and it leaves you with duplicate masters.

And if an external repository must remain the binary source of truth, use App Builder to surface a reference connection inside GenStudio. Reference it, don't ingest a second master.

The principle: solve the "one view" requirement at the presentation layer before you touch the storage layer.

The agentic angle: agent search follows the repositories the agent can reach. Before you promise one conversational view over federated DAMs, test whether Content Advisor Agent covers them. The Adobe pages I reviewed don't say.

Which repository are you about to migrate just to get a single search experience?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Federation gives people one view across repositories, but the Adobe pages I reviewed for Content Advisor Agent and the AEM MCP servers don't state whether their search reaches federated repositories. Treat that as an open question to verify, and design so an agent never needs to copy binaries to answer a question.

**Adobe tools to know**

- **Content Advisor Agent**: search across AEM Assets. Federated coverage not documented in the pages reviewed.
- **AEM Content MCP servers**: query and manage content in an AEM environment.
- **Agent Composer**: bring-your-own-agent over MCP and Agent2Agent, for a repository that needs its own agent.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Test agent search against each federated and external repository before you promise unified results.
- Prefer reference connections over copies for external DAMs.
- Document which repositories each agent can search.

## Sources

- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)
- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)
- [Adobe Agent Composer](https://business.adobe.com/products/experience-platform/agent-orchestrator/agent-composer.html)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-11-unified-view-without-migration.pdf)
