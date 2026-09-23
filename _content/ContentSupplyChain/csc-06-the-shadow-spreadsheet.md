---
title: 'Don''t use Workflow as a strategy tool: split Planning from execution'
date: '2026-09-23T00:00:00.000Z'
modified_date: '2026-09-23T00:00:00.000Z'
description: 'When the campaign calendar lives in a spreadsheet, the data model is usually wrong. Workfront Planning for strategy, Workflow for execution.'
image: '/assets/images/posts/ContentSupplyChain/csc-06-the-shadow-spreadsheet.png'
pdf: '/assets/pdf/ContentSupplyChain/csc-06-the-shadow-spreadsheet.pdf'
tags:
  - Adobe
  - Content Supply Chain
  - Workfront
  - Agentic AI
  - Solution Architecture
---

A symptom worth recognizing: the campaign calendar lives in a spreadsheet, right next to a Workflow project tree that's supposed to be the source of truth.

The cause is usually a data-model problem. Annual brand strategy, campaign calendars and every asset deliverable got modeled in one giant tree of projects, tasks and custom fields. Workflow is built to run work, and it was asked to be the planning layer.

The split I'd design:

Workfront Planning: strategy, campaign briefs, calendars, cross-BU visibility.
Workflow: execution. Tasks, predecessors, resources, agency work, status.

The migration path is cheaper than it sounds. Add Planning and slim Workflow down. Rebuilding Workflow from scratch would add complexity to the layer that wasn't the problem.

The agentic angle: Adobe's Workflow Optimization Agent turns goals into structured plans and projects. Point it at Planning for strategy and Workflow for execution, or it will build the same overloaded project tree, only faster.

Where does your campaign calendar actually live today?

## Agentic angle

*Availability changes quickly. Confirm status in your own tenant before you build on any tool below.*

The Workflow Optimization Agent is described as converting strategic goals into structured plans and executable projects, with every step aligned to the workflows your organization defines. That makes the Planning versus Workflow split more important, not less: an agent planning into an overloaded Workflow tree recreates the shadow calendar at machine speed. Project Catalyze, for ideation inside Planning, is a roadmap item according to one third-party summary.

**Adobe tools to know**

- **Workflow Optimization Agent**: goals to plans and projects. Announced April 2026.
- **Workfront Planning**: records, calendars and views that agents should plan against.
- **Project Catalyze**: ideation in Planning. Roadmap per a third-party summary; verify.

## Best practices

*Items marked (Adobe) come from Adobe documentation. The rest are design advice.*

- Keep strategy records in Planning and hand agents execution structures in Workflow.
- Define the approved workflow templates an agent may instantiate. (Adobe: steps follow organization-defined workflows)
- Retire the shadow spreadsheet before automating on top of it.

## Sources

- [Adobe blog: Workflow Optimization Agent](https://business.adobe.com/blog/intent-into-intelligent-execution-adobe-workflow-optimization-agent)
- [Workfront 2026 roadmap summary (third party)](https://contentbloom.com/blog/adobe-workfronts-2026-roadmap-is-compelling-now-its-about-delivery/)

## Carousel

[Download the PDF carousel](/assets/pdfs/posts/csc-06-the-shadow-spreadsheet.pdf)
