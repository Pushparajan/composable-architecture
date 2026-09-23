---
title: 'Automate the Planning to Workflow handoff: convert the record, pre-populate the form'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'How to carry campaign metadata from Workfront Planning into Workflow with record conversion and pre-populated custom forms, so nobody re-enters it.'
image: '/assets/images/posts/ContentSupplyChain/csc-07-type-it-once.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-07-type-it-once.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Workfront
  - Agentic AI
  - Solution Architecture
---

Brief approved in Planning. Production kicks off. The project form asks for audience, campaign ID, market and channel again.

That's a handoff without a data contract. Two humans re-typing the same fields will always drift.

Two building blocks close it:

1. Automation in Workfront Planning that converts a campaign record into a Workflow program or project and carries the metadata forward.
2. Workflow custom forms pre-populated from the originating Planning record.

Two approaches that look similar and aren't: a lookup that only references the Planning record (users still re-select values), and a shared spreadsheet as the go-between.

Design rule: metadata is entered once, at the point of origin, and every downstream object inherits it.

The agentic angle: agents can turn a brief into tasks, but don't let an agent be your data contract. Convert the record deterministically, and use agents for the judgment work on top.

Which fields does your team still re-enter at handoff?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Adobe's planning agents can transform a creative brief into actionable tasks, and the Workfront MCP server and Fusion's MCP Agent module let prompts drive updates. Those are good for judgment work. Audience, campaign ID, market and channel should still travel through record conversion and pre-populated forms, because a prompt-driven step can vary from run to run and a conversion rule can't.

**Adobe tools to know**

- **Workflow Optimization Agent**: brief to actionable tasks.
- **Workfront MCP server**: prompt-driven find, create and update of Workfront items.
- **Fusion MCP Agent module**: AI prompt inside a scenario. Needs an LLM key and configured MCP servers, and returns an object.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Keep required metadata on deterministic paths and let agents draft tasks around it.
- Validate agent-created records against controlled values before they enter Workflow.
- Use agents for what a form can't do, such as summarizing a brief into task descriptions.

## Sources

- [Adobe planning and operations agents](https://business.adobe.com/products/experience-platform/agent-orchestrator/planning-operations.html)
- [Adobe Workfront MCP server overview](https://experienceleague.adobe.com/en/docs/workfront/using/basics/workfront-mcp-server/workfront-mcp-server-overview)
- [Fusion MCP Agent module](https://experienceleague.adobe.com/en/docs/workfront-fusion/using/references/apps-and-their-modules/tools-and-transformers/model-context-protocol-mcp-connector)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-07-type-it-once.pdf)
