---
title: 'IMS org membership is authentication, not authorization'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Why a user in the Adobe org still can''t open GenStudio: product profiles, group-linked entitlements and what to automate in onboarding.'
image: '/assets/images/posts/ContentSupplyChain/csc-03-why-a-new-hire-cant-open-genstudio.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-03-why-a-new-hire-cant-open-genstudio.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - GenStudio
  - Agentic AI
  - Solution Architecture
---

Support ticket: "User is in the org but can't open GenStudio."

The place to look is Admin Console, not the product.

Being in the IMS org gets a user authenticated. Access to GenStudio comes from a product profile with role-based entitlements. The clean way to grant it is a user group linked to that profile. Overnight sync doesn't grant baseline access on its own.

Two things follow if you're building onboarding automation:

Model access as group membership, not per-user profile assignments.
Don't expect to fix it from inside the app. Permissions aren't configured only in GenStudio. Admin Console settings apply.

Treat "user is in a group linked to the right profile" as a testable acceptance check for every new role.

The agentic angle: the same rule applies to agents. Adobe's agents and MCP servers act as the signed-in user, so they reach only what that user's profile allows. And an MCP client that authenticates to the wrong IMS org is the most common way they fail.

How are you provisioning product profiles today: manual, group-linked or scripted?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

Agents inherit identity. Adobe's agents perform only the jobs the user is authorized for in the underlying application, and MCP servers authenticate with OAuth through IMS and apply the same permissions. A connection is authenticated to one IMS org at a time, so multi-org users must disconnect and reconnect to switch. Workfront's MCP server also has to be enabled by an administrator before anyone can use it.

**Adobe tools to know**

- **Adobe MCP servers**: OAuth through IMS, same permissions as the app. Documented.
- **Workfront MCP server**: needs administrator enablement. US region on AWS only at last check.
- **Admin Console**: product profiles and user groups remain the control point.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Add agent access to onboarding acceptance checks: an agent acting as the user sees exactly what the profile allows.
- Provision through groups linked to product profiles so agent access follows the same path as app access.
- When a connection fails, check the selected IMS org first. (Adobe)
- Enable Workfront MCP and confirm region availability before rollout. (Adobe)

## Sources

- [Adobe MCP servers (CX Enterprise Agentic Tools)](https://experienceleague.adobe.com/en/docs/cx-enterprise-agentic-tools/using/tools/mcp-servers)
- [Adobe Workfront MCP server overview](https://experienceleague.adobe.com/en/docs/workfront/using/basics/workfront-mcp-server/workfront-mcp-server-overview)
- [Workfront Third Quarter 2026 release overview](https://experienceleague.adobe.com/en/docs/workfront/using/product-announcements/product-releases/release-26-q3/26-q3-release-overview)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-03-why-a-new-hire-cant-open-genstudio.pdf)
