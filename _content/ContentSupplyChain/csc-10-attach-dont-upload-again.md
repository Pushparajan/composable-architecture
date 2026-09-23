---
title: 'Reference approved assets from AEM; don''t copy them into projects'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Attach approved AEM Assets in context from Workfront using Asset Selector or Content Advisor, keep metadata in sync natively, and model clearance as a status.'
image: '/assets/images/posts/ContentSupplyChain/csc-10-attach-dont-upload-again.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-10-attach-dont-upload-again.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - AEM
  - Agentic AI
  - Solution Architecture
---

Every duplicate asset is a stale copy waiting to happen.

The pattern: approved brand content lives in AEM Assets. Workfront users attach and reuse it in context, through Asset Selector or Content Advisor, instead of uploading a second copy into the project.

The native Workfront to AEM connector is what keeps metadata consistent between the two systems. Prefer it over custom sync code.

Clearance is the other half. Whether an asset is "legally cleared" should be a governed status in AEM that production can see from the work system. Not an email attachment, and not an unlocked shared drive.

Think of it as reference semantics versus value semantics. Reference the approved asset, and there's nothing to reconcile later.

The agentic angle: Content Advisor Agent lets people find approved assets in AEM with natural language. Use it, and AEM's read-only MCP endpoint, to return references to approved assets, never copies.

Where in your workflow does a copy of an approved asset still get created?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Adobe's Content Advisor Agent finds relevant content across the enterprise in natural language and can create visual variants from source assets. AEM also exposes Content and Content (Read-Only) MCP servers, and Fusion now has an AEM MCP connector. The reuse pattern from the article carries over: agents should hand back references to approved assets and their status, not downloads.

**Adobe tools to know**

- **Content Advisor Agent** (AEM Assets, Dynamic Media): natural-language search and variant creation. Documented.
- **AEM Content MCP** and **AEM Content (Read-Only) MCP**: manage or query pages, fragments and assets.
- **Brand Governance Agent**: brand-policy checks and permissions.
- **Fusion AEM MCP connector**: prompt-driven AEM steps in scenarios. Released August 2026.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Use the read-only endpoint for search-and-reuse agents. (Adobe offers it)
- Require agents to return the AEM asset reference and its approval status.
- Let asset status and governance checks gate reuse, not a person's memory.

## Sources

- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)
- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)
- [Community: Workfront MCP and AEM MCP connectors for Fusion](https://experienceleaguecommunities.adobe.com/adobe-workfront-fusion-24/new-adobe-workfront-mcp-and-adobe-aem-assets-mcp-connectors-252693)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-10-attach-dont-upload-again.pdf)
