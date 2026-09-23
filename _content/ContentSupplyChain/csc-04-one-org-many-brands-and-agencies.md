---
title: 'One IMS org, one Workfront instance: isolate with groups, not tenants'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'Multi-brand and multi-agency design: why a tenant per brand fragments identity, reporting and workflow, and how groups, profiles and workspaces isolate instead.'
image: '/assets/images/posts/ContentSupplyChain/csc-04-one-org-many-brands-and-agencies.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-04-one-org-many-brands-and-agencies.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Workfront
  - Agentic AI
  - Solution Architecture
---

A common proposal in multi-brand designs: an Adobe org per brand, maybe a Workfront instance per agency. It reads like isolation. In practice you've split identity, reporting and workflow across tenants, and every new brand is a small migration.

The pattern I'd design instead:

One IMS org.
One Workfront instance.
Groups and product profiles for entitlements.
Workspaces for team boundaries.
Folder and record-level permissions for data boundaries.

Same pattern for an embargoed launch with several agencies. The coordination stays in Workfront, with group-based permissions doing the separation. Lock the binaries in AEM too, so the files follow the same rule. Email is not the NDA bus.

Test it: onboarding a new brand should mean creating groups and a workspace, not standing up a tenant.

The agentic angle: isolation by groups and workspaces carries over to agents, because Workfront's AI Collaborators run as permissioned users. Don't hand an agent one broad account that spans every brand.

What does adding a brand cost you today?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

If isolation lives in groups, profiles, workspaces and permissions, agents inherit it, since Adobe's agents follow the user's access and Workfront's AI Collaborators operate as permissioned users. The risk is the shortcut: a single powerful identity that can see every brand. Workfront also describes a governed registry for creating and managing AI collaborators, which is where you define who each agent acts as.

**Adobe tools to know**

- **Workfront AI Collaborators**: task agent and reviewer available, project coordinator coming soon. Reported generally available in August 2026.
- **Governed AI collaborator registry** (Workfront): central place to create, register and manage collaborators.
- **Workfront MCP server**: external clients acting under the user's Workfront permissions.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Give each agent the narrowest identity that fits its job. Avoid a cross-brand super-user.
- Test isolation with agents: run the same prompt as users from two brands and compare what each can see.
- Check what agents can read in embargoed groups before enabling them there.

## Sources

- [Adobe Workfront product page](https://business.adobe.com/products/workfront.html)
- [The Letter Two: Workfront AI Collaborators GA](https://thelettertwo.com/2026/08/13/adobe-launches-ai-collaborators-workfront-general-availability/)
- [The Workfront Wire, May 2026](https://experienceleaguecommunities.adobe.com/adobe-workfront-23/the-workfront-wire-may-2026-your-go-to-source-for-news-updates-events-250232)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-04-one-org-many-brands-and-agencies.pdf)
