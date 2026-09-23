---
title: 'Enforce brand at generation time, not in review'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Move brand constraints upstream: Brand Guidelines, Firefly Custom Models, a governed claims library and bulk generation with Firefly Services.'
image: '/assets/images/posts/ContentSupplyChain/csc-13-brand-at-generation.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-13-brand-at-generation.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - GenStudio
  - Agentic AI
  - Solution Architecture
---

If brand compliance only happens in review, your reviewers are the enforcement layer. That doesn't scale when you're generating variants across regions.

Move the constraints upstream, into the generation flow:

Brands and Brand Guidelines in the GenStudio Create canvas as the primary guardrail.
Locked templates and structured approval alongside them.
Firefly Custom Models where regional teams generate variations, so the brand look is encoded in the model itself.
For regulated content, a governed claims library surfaced at create time.

For multi-market bulk work, use Firefly Services with Workfront rather than manual creation sessions.

Same principle as input validation in code: reject bad input at the boundary instead of cleaning up downstream.

The agentic angle: Adobe now has several pieces aimed at this. Brand Governance Agent, an AEM governance MCP that checks content against brand rules, Firefly Custom Models, and Brand Intelligence (announced April 2026). Keep a human approval at the end.

Where does your brand validation run today: at generation or at review?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Adobe announced Brand Intelligence in April 2026 to learn from review feedback, approvals and rejections and give that context to agents during creation. AEM's Experience Governance MCP evaluates content and images against brand and compliance rules, the Brand Governance Agent automates policy checks, and Firefly Custom Models, Foundry and the Services APIs cover generation and batch work. Workfront's reviewer AI collaborator also checks content against brand guidelines during review.

**Adobe tools to know**

- **Brand Intelligence**: continuously learning brand context for agents. Announced April 2026; confirm availability.
- **Brand Governance Agent** and **AEM Experience Governance MCP**: automated brand and compliance checks. Documented.
- **Firefly Custom Models, Foundry, Services APIs, Content Authenticity API**: announced October 2025; the Content Authenticity API was in beta.
- **Firefly Creative Production for Enterprise Workflow Builder**: reusable batch production workflows. Announced April 2026.
- **Content Production Agent**: brief to channel content. **Workfront reviewer AI collaborator**: brand check during review.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Layer the controls: brand context and custom model at generation, an automated check before review, a human approval at the end.
- Feed review outcomes back into brand context so agents learn from approvals and rejections. (Adobe describes Brand Intelligence this way)
- Attach content credentials where you use the Content Authenticity API.
- Confirm availability of newly announced items before you scope work around them.

## Sources

- [Adobe: Brand Intelligence and GenStudio expansion (2026-04-20)](https://news.adobe.com/news/2026/04/adobe-introduces-brand-intelligence)
- [Agentic AI in CX Enterprise Applications](https://experienceleague.adobe.com/en/docs/cx-enterprise-ai/experience-cloud-ai/overview/agentic-ai)
- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)
- [Adobe MAX 2025 GenStudio announcements](https://news.adobe.com/news/2025/10/adobe-max-2025-genstudio)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-13-brand-at-generation.pdf)
