---
title: 'Controlled vocabularies are a schema decision, not a reporting fix'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Free-text campaign, channel and business unit fields corrupt reporting. Fix it in the schema, and bring ERP and PIM data in through Fusion.'
image: '/assets/images/posts/ContentSupplyChain/csc-09-free-text-breaks-reports.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-09-free-text-breaks-reports.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Workfront
  - Agentic AI
  - Solution Architecture
---

If campaign name, channel and business unit are free-text fields, your reporting layer inherits every typo, abbreviation and casing choice.

You can't filter your way out of that later. It's a schema problem, so solve it in the schema: controlled vocabularies on the record types, so metadata flows across connected records and views can filter reliably.

The same principle applies to product data. Prices, SKUs and attributes have a master in ERP or PIM. Use Fusion to write those attributes into Workfront fields, rather than asking marketers to re-key them.

Two boundaries to keep clean: Fusion moves data, it shouldn't be your cleanup crew for values that should have been a dropdown, and ERP or PIM stays the master.

The agentic angle: natural-language questions against Workfront or Customer Journey Analytics are only as reliable as your field values. 'Paid Social' and 'paid-social' split an agent's answer the same way they split a report.

Which of your reporting dimensions is still an open text field?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Workfront's MCP server lets an AI client ask for things like the active projects for a team, and Customer Journey Analytics' Data Insights Agent builds visualizations from the components in your data view. Both read your schema. Controlled vocabularies make the answers complete. Free text makes them plausible but partial.

**Adobe tools to know**

- **Workfront MCP server**: natural-language queries and updates.
- **Data Insights Agent** (Customer Journey Analytics): answers and visualizations from your data view.
- **Fusion MCP Agent module and connectors**: prompt-driven steps against Workfront and AEM.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Fix vocabularies at the schema level before you expose data to natural-language tools.
- Keep ERP and PIM as master and write attributes with Fusion so agents read clean fields.
- Spot-check agent answers against a standard report for each key dimension.

## Sources

- [Adobe Workfront MCP server overview](https://experienceleague.adobe.com/en/docs/workfront/using/basics/workfront-mcp-server/workfront-mcp-server-overview)
- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-09-free-text-breaks-reports.pdf)
