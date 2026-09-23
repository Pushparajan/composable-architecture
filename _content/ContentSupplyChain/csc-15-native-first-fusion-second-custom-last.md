---
title: 'Integration decision order: native, then App Builder or Fusion, then custom'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'A decision filter for Adobe integrations, and the split between App Builder for UI inside products and Fusion for system-to-system flows.'
image: '/assets/images/posts/ContentSupplyChain/csc-15-native-first-fusion-second-custom-last.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-15-native-first-fusion-second-custom-last.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Fusion
  - Agentic AI
  - Solution Architecture
---

Before writing custom integration code, run the requirement through this filter, in order:

1. Is there a native connector or in-product capability?
2. Does the user need to see or do this inside an Adobe product? Then App Builder.
3. Do systems need to exchange events or payloads? Then Fusion, without creating a new source of truth.
4. Only after that: custom APIs.

Native first, Fusion second, custom last.

The roles are easy to swap by accident. App Builder is for UI in the product: panels, an embedded Express experience, a custom DAM browser. Fusion is for systems talking to each other: ERP, PIM, Jira, Salesforce, agency tools. Fusion doesn't render product UI, and App Builder isn't your main orchestrator.

Neither replaces the native Workfront to AEM connector.

Every custom integration you skip is code you don't have to maintain.

The agentic angle: extend the filter for agents. Native agent first, then an Adobe MCP server, then a Fusion MCP module, then a bring-your-own agent through Agent Composer. Custom code last.

What's the last custom integration you built that a connector could have covered?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Adobe's agentic tooling now spans the same tiers as the article: native agents inside the applications, MCP servers and CX Coworker Gateway for external clients, Agent Skills and APIs for Builders for custom apps, Fusion's MCP module for prompt-driven scenarios, and Agent Composer with the Agent SDK and Registry for bring-your-own agents over MCP and Agent2Agent.

**Adobe tools to know**

- **Native agents** (Content Advisor Agent, Journey Agent and others).
- **Adobe MCP servers** and **CX Coworker Gateway**.
- **Agent Skills** (github.com/adobe/skills) and **APIs for Builders**.
- **Fusion MCP Agent module**: needs an LLM key and configured MCP servers.
- **Agent Composer, Agent SDK, Agent Registry**: announced September 2025; confirm GA scope.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Try the native agent before you build an integration.
- Use Fusion's MCP module for open-ended steps only, and keep known steps deterministic.
- Configure the LLM key and MCP servers before you design the scenario. (Adobe)
- Register custom agents where they can be governed alongside Adobe's.

## Sources

- [Adobe CX Enterprise Agentic Tools overview](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/overview)
- [Fusion MCP Agent module](https://experienceleague.adobe.com/en/docs/workfront-fusion/using/references/apps-and-their-modules/tools-and-transformers/model-context-protocol-mcp-connector)
- [Adobe Agent Composer](https://business.adobe.com/products/experience-platform/agent-orchestrator/agent-composer.html)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-15-native-first-fusion-second-custom-last.pdf)
