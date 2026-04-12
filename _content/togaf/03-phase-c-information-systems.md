---
title: "Phase C: Information Systems Architecture — Data and Applications as Strategic Assets"
description: Designing the information landscape that enables your target business architecture to function.
date: "2024-01-04"
modified_date: "2024-01-04"
image: /assets/images/posts/togaf-phase-c-information-systems.png
tags:
  - TOGAF
  - Enterprise Architecture
  - Data Architecture
  - Application Architecture
---

# Phase C: Information Systems Architecture — Data and Applications as Strategic Assets

**Phase:** Phase C — Information Systems Architecture
**Perspective:** Enterprise Architect

---

Data is the new oil — but most organisations do not know what data they have, where it lives, or whether it can be trusted. Phase C is where enterprise architects bring clarity to the information chaos.

---

## Key Inputs

- Target Business Architecture from Phase B
- Existing application and data inventories
- Data quality assessments
- Application capability assessments
- Industry application reference models
- Integration landscape maps

---

## The Process

1. Develop baseline Application Architecture
2. Develop baseline Data Architecture
3. Define target Application and Data Architectures
4. Identify canonical data entities and ownership
5. Perform gap analysis for both domains
6. Define integration patterns and data flows

---

## Deliverables

- Baseline and Target Application Architecture
- Baseline and Target Data Architecture
- Application Portfolio Assessment
- Canonical Data Model / Logical Data Model
- Integration Architecture Patterns
- Gap Analysis (Application & Data)

---

## Practitioner Perspective

Phase C has two distinct sub-phases — **Data Architecture** and **Application Architecture** — and the sequence matters enormously. Define your data architecture first.

Understand what information the business needs to operate and make decisions *before* you decide what applications should exist. Too many architects design application portfolios without a coherent data strategy, resulting in integration nightmares, master data duplication, and reporting that nobody trusts.

Use **application rationalisation frameworks** to challenge legacy estates. Map every application to one or more business capabilities. Any capability with no supporting application is a risk. Any application supporting no current capability is a candidate for retirement — and there will be more of these than anyone expects.

**The most common mistake:** Treating the application inventory as the architecture. A list of applications is not architecture. Architecture is the set of decisions about which applications exist, why, how they relate, and what data they own.

**Practical tips:**
- Introduce the concept of "data ownership" early — every canonical data entity needs a single business owner responsible for quality and governance
- Use an Application-to-Capability matrix to drive rationalisation conversations: colour-code by investment intent (invest, maintain, retire, replace)
- Define integration principles now: event-driven vs request-response, API-first vs file-based — these shape everything downstream
- Engage your Chief Data Officer or equivalent as a co-author, not a reviewer

---

*Part of a series: TOGAF from an Enterprise Architect's Perspective*
