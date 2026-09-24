---
title: 'Firefly Services for developers: an 8-part series'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'An introduction to Adobe Firefly Services for developers: what the API family covers, and a map of the 8-part series on auth, models, and production use.'
image: '/assets/images/posts/adobe/Firefly/09_integrated-headless-creative-pipeline.png'
tags:
  - Adobe
  - Firefly
  - GenerativeAI
  - Solution Architecture
---

*Series: Firefly Services for developers. Checked against Adobe's developer documentation on September 23, 2026. Endpoints and limits change, so confirm against the linked source before you ship.*

## What Adobe Firefly Services is

Firefly Services is a set of REST APIs you call from your own code, not a creative app with a login screen. It covers image generation, adaptation, custom model training, and headless Photoshop and InDesign composition, so you can drop generative and creative operations into an existing pipeline instead of a human workflow.

If your architecture treats "Firefly" as a single box, this series is for you.

## What this series covers

- **1. [Firefly Services is an API suite, not an app](/adobe/posts/01_firefly-services-is-infrastructure)** — the family of APIs and where each job belongs
- **2. [Three things that break Firefly calls before a pixel renders](/adobe/posts/02_auth-and-storage)** — auth tokens, signed URLs, storage
- **3. [Old Firefly samples may call endpoints that are gone](/adobe/posts/03_async-and-image-models)** — async-only endpoints and model headers
- **4. [Four knobs that make Firefly output repeatable](/adobe/posts/04_deterministic-control)** — seeds, negative prompts, reference strength
- **5. [Three Firefly endpoints for adapting images at scale](/adobe/posts/05_fill-expand-similar)** — Expand, Fill, Similar
- **6. [Your custom model trained. Your API can't see it yet.](/adobe/posts/06_custom-models)** — training and sharing custom models
- **7. [Photoshop API v1 reached end of life on August 31](/adobe/posts/07_headless-photoshop-v2)** — what moved to v2
- **8. [Three questions to ask before Firefly output goes into an ad](/adobe/posts/08_commercial-safety)** — training data, indemnification, provenance

## Who this is for

Developers and architects wiring Firefly and its sibling APIs (Photoshop, InDesign) into a PIM, DAM, or campaign pipeline, who need the API-level details rather than a creative-tool walkthrough.
