---
title: 'A 7-phase rollout order, with acceptance tests'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Sequencing a content supply chain build: foundation first, scale last, plus the acceptance tests that show whether the implementation is healthy.'
image: '/assets/images/posts/ContentSupplyChain/csc-19-the-seven-phase-rollout.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-19-the-seven-phase-rollout.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Roadmap
  - Agentic AI
  - Solution Architecture
---

Sequence matters more than speed. If you scale volume onto loose identity and free-text metadata, you scale the mess.

The order I'd run:

1. Foundation: one IMS org, product profiles, groups, shared taxonomy
2. Work system: Planning, slimmer Workflow, group permissions
3. Content system: native connector, federation, ESM
4. Create system: Brand Guidelines, Custom Models, Express embed
5. Orchestration: Fusion for ERP/PIM, Jira, Frame.io
6. Activate and learn: paid, journeys, analytics
7. Scale: Firefly Services, new brands added by group and workspace

Then write acceptance tests. A few of mine: a new user sees nothing until they get a profile; metadata typed once in Planning shows up in Workflow; WIP is in ESM and approved assets are in AEM; a Frame.io approval updates Workfront and AEM with no download; and a GenStudio-only team isn't reported as "transformation complete."

The agentic angle: adopt agents in rollout order. Identity and taxonomy first, Workfront agents with the work system, Content Advisor with the content system, Fusion and Agent Composer at orchestration, Journey and Data Insights agents at activate and learn.

Which phase are you in, and which test would you fail today?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Sequencing agents by phase keeps them from amplifying gaps. Phase 1 prepares identity and taxonomy for agent access. Phase 2 adds Workfront's agents and MCP. Phase 3 adds Content Advisor Agent and the AEM MCP servers. Phase 4 adds Brand Intelligence, Brand Governance and Firefly. Phase 5 adds Fusion's MCP modules and Agent Composer. Phase 6 adds the Journey, Audience, Experimentation and Data Insights agents. Phase 7 adds Workflow Builder for scale.

**Adobe tools to know**

- **Phase 2:** Workfront AI Collaborators, Workflow Optimization Agent, Workfront MCP.
- **Phase 3:** Content Advisor Agent, AEM MCP servers.
- **Phase 4:** Brand Intelligence, Brand Governance Agent, Firefly, Content Production Agent.
- **Phase 5:** Fusion MCP Agent module and connectors, Agent Composer.
- **Phase 6:** Journey, Audience, Experimentation and Data Insights agents.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Add acceptance tests: an agent acting as the user sees only what the user's profile allows.
- Test that agent-created records use controlled vocabulary values.
- Require human approval before agent-produced assets land in AEM.
- Confirm licensing, AI credits and region availability before each phase starts. (Adobe)

## Sources

- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)
- [Workfront Third Quarter 2026 release overview](https://experienceleague.adobe.com/en/docs/workfront/using/product-announcements/product-releases/release-26-q3/26-q3-release-overview)
- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-19-the-seven-phase-rollout.pdf)
