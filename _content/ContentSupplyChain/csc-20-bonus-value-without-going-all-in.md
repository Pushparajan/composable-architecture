---
title: 'You don''t need to replace your stack to use this architecture'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'For developers who are keeping Jira, Salesforce, ERP, PIM and agency tools: how Fusion, native connectors and App Builder fit around them.'
image: '/assets/images/posts/ContentSupplyChain/csc-20-bonus-value-without-going-all-in.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-20-bonus-value-without-going-all-in.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Fusion
  - Agentic AI
  - Solution Architecture
---

The objection I'd expect from developers: "We're keeping Jira. We're keeping Salesforce. Our agencies use their own tools."

Good. Nothing in this design requires you to replace them.

Keep your masters. ERP and PIM stay the source of truth for product data, Jira for engineering status, and so on. Fusion connects to Salesforce, Jira, ERP, PIM and agency tools, so status and data flow into Workfront without creating a second source of truth. Native connectors cover the Adobe-to-Adobe paths first. App Builder covers anything that has to surface inside a product.

The win isn't consolidation. It's removing the re-keying between systems that stay.

The agentic angle: MCP is an open standard, so Claude, ChatGPT, Cursor and Copilot Studio can connect to Adobe's MCP servers, and Workfront's AI collaborators can call outside agents. Keeping your stack doesn't lock you out of agents.

Which non-Adobe system in your stack has the most manual re-entry around it?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Adobe's MCP servers follow the open Model Context Protocol, so any compatible client can connect. Workfront AI Collaborators can invoke agents through MCP, a public API or agent-to-agent connections, and one press report describes a copywriting agent built in Microsoft Copilot Studio doing exactly that. Agent Composer supports bring-your-own agents over MCP and Agent2Agent.

**Adobe tools to know**

- **Adobe MCP servers**: open standard, any MCP-compatible client.
- **Workfront AI Collaborators**: can call external agents through MCP, API or agent-to-agent.
- **Agent Composer**: bring-your-own agents under shared governance.
- **Adobe Marketing Agent for Microsoft 365 Copilot**: marketing insights inside Copilot.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Keep your masters, and connect agents through governed gateways so they don't create new paths around those systems.
- Authenticate through IMS and rely on the org's permissions. (Adobe)
- Register non-Adobe agents where they can be governed.
- Check data loss prevention: Copilot Studio MCP connections go through Power Platform policies. (Adobe)

## Sources

- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)
- [The AI Economy: Workfront AI Collaborators](https://theaieconomy.substack.com/p/adobe-workfront-ai-collaborators)
- [Adobe Agent Composer](https://business.adobe.com/products/experience-platform/agent-orchestrator/agent-composer.html)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-20-bonus-value-without-going-all-in.pdf)
