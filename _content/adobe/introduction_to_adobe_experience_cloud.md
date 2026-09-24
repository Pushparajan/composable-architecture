---
title: 'Introduction to Adobe Experience Cloud'
date: '2024-01-18T00:00:00.000Z'
modified_date: '2026-09-24T00:00:00.000Z'
description: 'Overview of Adobe Experience Cloud and its marketing technology solutions'
image: '/assets/images/posts/adobe/Firefly/09_integrated-headless-creative-pipeline.png'
tags:
  - Adobe
  - AEM
  - Experience Cloud
---

## Adobe Experience Cloud

Adobe Experience Cloud is a comprehensive suite of marketing, analytics, advertising, and commerce solutions.

### Key Products

1. **Adobe Experience Manager (AEM)** - Content management and digital asset management
2. **Adobe Analytics** - Web and marketing analytics
3. **Adobe Target** - Personalization and A/B testing
4. **Adobe Campaign** - Cross-channel campaign management
5. **Adobe Experience Platform** - Customer data platform and real-time profiles
6. **Adobe Commerce (Magento)** - E-commerce platform

### The headless creative pipeline behind the content

Creative production for these products increasingly runs as a headless pipeline rather than a human sitting in a design tool. The diagram above traces one SKU from a PIM trigger to a distributed, brand-safe asset, across three layers:

- **Orchestration layer (JWT & async loop)** - An orchestrator service holds a cached 24-hour auth token, listens for a PIM trigger, and calls Firefly's async endpoints through a job poller and pre-signed URL generator. There is no synchronous image API anymore, so every job is submitted, polled, and resolved through this loop.
- **Creative engines layer (Firefly & Photoshop API v2)** - Firefly's API handles pixel generation (Expand, Fill, Generate Similar) and stores the output seed for repeatability. Photoshop API v2 then owns composition: pulling a manifest, expanding the backdrop, and compositing the generated image into an approved smart object template.
- **Persistence & deployment layer** - Finished assets move to S3 over the same approved storage domains (AWS, Azure, Dropbox) used for input, then transfer out to distribution. Before anything reaches an ad, a commercial and provenance workflow checks Content Credentials with c2patool and confirms indemnification coverage against the enterprise legal FAQ.

That last step maps to three questions worth asking before any generated asset ships: where did the training data come from, what IP rights or entitlement cover the output, and can its provenance (C2PA) be verified end to end. The full walkthrough of each layer lives in the [Firefly Services for developers](/adobe/posts/00_introduction-to-firefly-services) series.

Stay tuned for more detailed articles on Adobe technologies and implementation patterns.

