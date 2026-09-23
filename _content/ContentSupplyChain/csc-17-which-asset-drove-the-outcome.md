---
title: 'Asset-level measurement starts with a durable ID'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Treat the asset ID like a primary key: durable, immutable and carried from Planning through AEM into activation, so analytics can actually join on it.'
image: '/assets/images/posts/ContentSupplyChain/csc-17-which-asset-drove-the-outcome.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-17-which-asset-drove-the-outcome.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Measurement
  - Agentic AI
  - Solution Architecture
---

You can't join what you can't identify.

For asset-level attribution, every activated asset needs a durable ID plus campaign and channel metadata, carried from Planning, through AEM, into the activation system. If the asset gets renamed or re-uploaded along the way, the join key is gone, and no analytics product will stitch it back together.

With that in place, the split is straightforward. GenStudio Insights covers paid-media creative performance inside GenStudio for Performance Marketing. For asset-level exposure tied to journeys and business outcomes, use Content Analytics with Customer Journey Analytics.

Treat the asset ID like a primary key: generated once, immutable, and passed to every system that touches the asset.

The agentic angle: Data Insights Agent and the CJA MCP will answer 'which asset drove this?' only if the asset ID survives the journey. Fix the key first, then let the agents query.

Can you trace one live asset by the same ID from brief to ad today?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Customer Journey Analytics' Data Insights Agent answers data questions and builds Workspace visualizations from your data view. The CJA MCP server can query reports, discover data views and author workspaces, and the GenStudio for Performance Marketing MCP returns ad performance data. For AI-driven search visibility, the LLM Optimization Agent covers brand presence in AI-generated answers. None of them can join on an identifier that changed along the way.

**Adobe tools to know**

- **Data Insights Agent** (Customer Journey Analytics).
- **CJA MCP server**: queries, data view discovery, workspace authoring.
- **GenStudio for Performance Marketing MCP tool**: ad performance data.
- **LLM Optimization Agent** (AI-first app): brand presence in AI-generated answers.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Carry a durable asset ID and campaign metadata before you enable asset-level questions.
- Validate agent answers against a standard report until you trust the data view.
- Use read-only tools where analysis is the goal.

## Sources

- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)
- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-17-which-asset-drove-the-outcome.pdf)
