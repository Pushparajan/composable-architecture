---
title: "Phase D: Technology Architecture — Infrastructure as an Enabler, Not a Constraint"
description: Defining the technology platform that supports your applications, data, and ultimately your business.
date: "2024-01-05"
modified_date: "2024-01-05"
image: /assets/images/posts/togaf-phase-d-technology.png
tags:
  - TOGAF
  - Enterprise Architecture
  - Technology Architecture
  - Infrastructure
---

# Phase D: Technology Architecture — Infrastructure as an Enabler, Not a Constraint

**Phase:** Phase D — Technology Architecture
**Perspective:** Enterprise Architect

---

Technology architecture is the least glamorous but often the most consequential layer. Poorly designed infrastructure constrains every layer above it for years. Phase D is where EA ensures technology serves strategy — not the other way around.

---

## Key Inputs

- Target Application and Data Architectures from Phase C
- Technology standards and policies
- Current infrastructure inventory
- Cloud strategy and vendor contracts
- Security architecture principles
- TOGAF Technology Reference Model (TRM)

---

## The Process

1. Document baseline technology architecture
2. Define target technology architecture
3. Map technology components to application needs
4. Apply security and resilience patterns
5. Conduct gap analysis
6. Define technology standards and guidelines

---

## Deliverables

- Baseline and Target Technology Architecture
- Technology Standards Catalogue
- Infrastructure Gap Analysis
- Platform Architecture Patterns
- Security Architecture Overview
- Cloud/Hybrid Architecture Blueprint

---

## Practitioner Perspective

The key discipline in Phase D is avoiding **technology-led architecture**. Do not start with "we want to move to cloud." Start with "what technology characteristics do our target applications and data flows require?" Then determine whether cloud, on-premise, or hybrid best meets those requirements.

This discipline is harder than it sounds. Infrastructure teams often arrive with vendor preferences and existing commitments. Your job is to ensure those choices are interrogated against architecture requirements, not accepted as givens.

Engage your CISO early and treat security architecture as a first-class concern, not a bolt-on review. Define **non-functional requirements** — availability, performance, recoverability, scalability — from the application layer before selecting any technology platforms.

The Technology Standards Catalogue is one of your highest-leverage deliverables. It constrains future project decisions and prevents the technology estate from fragmenting into an unmanageable patchwork of incompatible platforms.

**The most common mistake:** Letting infrastructure teams write Phase D without EA oversight. The result is a technology architecture that reflects procurement history, not business requirements.

**Practical tips:**
- Use the TOGAF Technology Reference Model as a classification framework, then annotate it with your organisation's actual and target technology choices
- Define "approved," "tolerated," and "sunset" categories for all technology platforms — ambiguity is expensive
- Model your resilience architecture explicitly: single points of failure that appear only in production are always the most expensive to fix
- Include a skills and capability dimension: the best technology architecture is worthless if the organisation cannot operate it

---

*Part of a series: TOGAF from an Enterprise Architect's Perspective*
