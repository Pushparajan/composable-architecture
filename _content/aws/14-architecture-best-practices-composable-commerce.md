---
title: 'Ten Architecture Principles That Separate Great Composable Platforms from Expensive Distributed Monoliths'
description: "The synthesis of the entire series: designing for unpredictable failure, the stateless PBC constraint, security as infrastructure, polyglot persistence, and why the composable migration is an architecture not a project."
date: '2024-04-15'
modified_date: '2024-04-15'
image: /assets/images/posts/architecture-best-practices.jpg
tags:
  - Composable Commerce
  - AWS
  - Architecture Best Practices
  - MACH Architecture
  - Well-Architected Framework
  - Cloud Native
  - Microservices
  - Digital Transformation
---

# Ten Architecture Principles That Separate Great Composable Platforms from Expensive Distributed Monoliths

*By a Senior AWS Solutions Architect | #ComposableCommerce #ArchitectureBestPractices #MACH #AWS*

---

After working on composable commerce migrations and greenfield composable builds across retail, fashion, grocery, and marketplace sectors, I've developed a clear picture of what separates the platforms that genuinely deliver on the promise of composable commerce from the ones that just moved complexity around.

The difference is almost never about technology choices — whether you pick ECS or Lambda, Aurora or DynamoDB, a particular headless CMS or another. The difference is about applying a consistent set of architectural principles from the first line of infrastructure code to the last PBC deployment.

This is the final article in my 14-part series on AWS for composable commerce architects. Here are the principles I return to regardless of the specifics of the engagement.

## Principle 1: Design for the Failure You Haven't Imagined Yet

The Well-Architected Framework says "design for failure." I'd sharpen that: design for the failure you cannot predict.

You can predict that an EC2 instance might fail. You design for that with Multi-AZ and Auto Scaling. What you cannot always predict is: the Personalisation PBC vendor having an outage, the payment processor API being degraded for 45 minutes, a CloudFront edge location having a regional routing issue, a DynamoDB table hitting a hot partition under Black Friday load patterns you'd never seen before.

The composable platform that handles these gracefully has one thing in common: **every PBC boundary has explicit failure handling.** Circuit breakers that open when a downstream PBC is unhealthy. Timeouts on every API call. Fallback responses when optional services are unavailable.

```javascript
// Product Catalogue PBC: recommendations are optional, not required
async function getProductDetail(sku) {
  const [product, recommendations] = await Promise.allSettled([
    getProductCore(sku),           // Required — fail if this fails
    getRecommendations(sku),       // Optional — proceed without it
  ]);

  if (product.status === 'rejected') throw product.reason;

  return {
    ...product.value,
    recommendations: recommendations.status === 'fulfilled'
      ? recommendations.value
      : []  // Graceful degradation — page renders without recommendations
  };
}
```

This pattern — treat optional PBC calls as optional and fail gracefully — means that when your Recommendation Engine PBC has a deployment issue, your product pages still render. Just without recommendations. Customers barely notice. Revenue continues.

## Principle 2: The Stateless PBC Constraint Is Absolute

I've said this in multiple articles in this series because it comes up on every engagement: a PBC that holds state in instance memory is not composable — it's a distributed monolith that happens to have an API.

True statelessness means:
- **No session state in instance memory** → ElastiCache Redis
- **No uploaded files on instance disk** → S3
- **No application state that differs between instances** → managed data stores
- **No long-lived in-process caches that differ between instances** → ElastiCache or short TTLs

The test: can you terminate any running instance of a PBC and replace it with a new one, with zero visible impact on any active user? If yes, the PBC is stateless. If no, find the state and move it to a managed service.

## Principle 3: Loose Coupling Is Both Technical and Organisational

The microservices literature focuses on technical decoupling: async messaging, API contracts, independent data stores. In composable commerce practice, the organisational dimension is equally important.

If the Checkout team needs to coordinate with the Catalogue team every time they ship a feature, the architecture is composable but the organisation isn't. The coupling has just moved from code to calendar.

The AWS services that enable organisational decoupling:
- **SQS/SNS** — the Checkout PBC publishes events; the Loyalty PBC subscribes without asking anyone's permission
- **API Gateway + OpenAPI** — the Catalogue PBC publishes a contract; consumers build against the contract, not the implementation
- **EventBridge** — the canonical event bus for composable platforms; new PBCs subscribe to existing events without changing the publisher
- **Service quotas and throttling** — the Catalogue PBC sets a rate limit on its API; consuming PBCs respect it, preventing one team's traffic spike from affecting another team's service

## Principle 4: Every PBC Needs Its Own Observability, Not a Shared Dashboard

In a monolith, one CloudWatch dashboard shows all the metrics. In a composable platform, each PBC team needs to own and understand their service's observability.

The platform team provides the standards and tooling. Each PBC team configures their own:
- CloudWatch alarms on their specific business metrics (not just CPU)
- Structured logging with correlation IDs for request tracing across PBCs
- X-Ray distributed tracing to see exactly where latency comes from in cross-PBC calls
- Custom metrics that reflect their PBC's specific business function

When an incident happens at 2am, the on-call engineer for the Checkout PBC should have a dashboard that immediately shows: checkout success rate, payment authorisation rate, average checkout duration, error rate by type. Not a shared platform dashboard where they have to filter through 200 metrics to find their signal.

## Principle 5: Infrastructure Parity Across Environments

Composable platforms are particularly vulnerable to environment drift because so many teams are deploying independently. The Checkout team configures something in production that they didn't configure in staging. The Catalogue team's staging environment has a different Redis configuration than production. The first time you see that divergence is usually at the worst possible moment.

**The discipline:** every environment uses the same CloudFormation template with environment-specific parameters. No manual console changes in any environment. The platform team's IaC pipeline is the single source of truth.

**Detect drift automatically:** CloudFormation drift detection, run on a weekly schedule, reports any resource that differs from its template definition. When drift is found, a pull request is created against the IaC repository reflecting the actual state, and the responsible team decides: codify the change in the template, or revert to the template definition.

## Principle 6: The Right Storage for Each PBC Is Non-Negotiable

I've seen composable platforms where every PBC used RDS because "we know SQL." The Cart PBC, the Session PBC, the Analytics PBC — all on RDS. The Cart PBC couldn't handle Black Friday because relational databases under high concurrent writes have very different scaling behaviour than DynamoDB.

The decision framework, applied honestly:

- **ACID transactions, complex queries, relational data** → Aurora (Order PBC, Customer PBC)
- **High-volume key-value, simple access patterns, infinite scale** → DynamoDB (Cart PBC, Session PBC, Inventory counts)
- **Historical analytics, BI, aggregations** → Redshift (reporting, not operational)
- **Frequently read, infrequently changed** → ElastiCache in front of whichever DB
- **Objects, files, media** → S3
- **Graph relationships** → Neptune (recommendation graphs, social features)

The conversation to have early: "what is the primary access pattern for this PBC's data?" The answer determines the storage choice. Not "what database does the team know."

## Principle 7: Security Is Infrastructure, Not Application Code

In a composable platform, security controls implemented in application code are fragile — they're in 15 different codebases maintained by 15 different teams with 15 different levels of security awareness.

Security controls implemented at the infrastructure layer are consistent:
- **IAM role boundaries** enforced by AWS regardless of what the application code does
- **Security Group rules** enforced by the hypervisor, not the application
- **NACL rules** enforced by the network, before traffic reaches the application
- **CloudTrail** records every API call regardless of whether the application logs it
- **AWS Config rules** evaluate compliance regardless of team behaviour

The goal: a composable platform where the worst application security bug still doesn't expose the underlying data, because IAM, network topology, and encryption provide defence-in-depth that the application bug can't bypass.

## Principle 8: Think Global, Deploy Regional

Composable architectures distribute services horizontally. But "horizontal" doesn't only mean across instances in a single AZ — it means across Regions for global commerce.

The pattern that works:
- **Core platform (Order, Customer, Payment):** Primary in one Region with Multi-AZ, failover to secondary Region via Route 53
- **Read-heavy PBCs (Catalogue, Search):** Active-active across Regions, Route 53 latency routing to nearest Region
- **Headless storefront:** CloudFront at the edge, Next.js ISR for static generation, real-time APIs from nearest Region
- **Customer data:** Region-locked for compliance (EU data stays in EU), replicated within Region for HA

## Principle 9: Composable Commerce Doesn't Mean Microservices for Everything

One of the most common mistakes I see in composable commerce projects is decomposing to the point of self-harm. Fifteen microservices is an improvement over one monolith. One hundred and fifty microservices is often worse than fifteen well-scoped services.

The right granularity for composable commerce is **Packaged Business Capabilities (PBCs)** — not the finest-grained microservices possible. A PBC encompasses a coherent business capability: Cart (including add, remove, update, apply discount). Not Cart-Add, Cart-Remove, Cart-Update, and Cart-Discount as separate services.

The test for correct PBC granularity: can a single two-pizza team own and fully understand this PBC? If it takes two teams to change a single feature, the PBC is too large. If a single team owns and understands 50 microservices, those microservices are too small.

## Principle 10: The Migration Is an Architecture, Not a Project

The hardest lesson for enterprises adopting composable commerce: the migration from a monolith to a composable architecture on AWS is not a project with a completion date. It's an architectural direction that you execute incrementally over 2–5 years.

The strangler fig pattern applied at platform scale:
- Year 1: Extract Cart, Catalogue, Search into PBCs. Monolith still handles Checkout and Orders.
- Year 2: Extract Checkout, Payment, Loyalty. Monolith handles only legacy order management and reporting.
- Year 3: Extract Order Management. Monolith is now a reporting legacy system.
- Year 4: Reporting migrated to Redshift. Monolith decommissioned.

At every stage, the composable platform and the monolith coexist. AWS hybrid connectivity makes them cooperate. The investment in VPC design, IAM strategy, and IaC infrastructure from Year 1 pays compound dividends through Year 4.

---

## The Closing Thought

Composable commerce on AWS is not a technology choice — it's a commitment to an architectural discipline. AWS provides the infrastructure primitives: global Regions and AZs for reliability, S3 for shared assets, managed databases for persistence, SQS and SNS for loose coupling, CloudFront for edge delivery, IAM for identity boundaries, CloudFormation for repeatable deployment.

The discipline is applying these primitives consistently, with clear principles, across every PBC and every team. Composable commerce architectures that use microservices, APIs, cloud-native SaaS, and a headless structure offer greater business agility compared to traditional monolithic architectures. But that agility is only realised when the underlying infrastructure is as well-designed as the application architecture.

The retailers I've seen get the most from composable commerce are the ones who treated the AWS architecture as a first-class deliverable — not an afterthought to be figured out later, but a deliberate design that enables everything the composable architecture promises.

Build the foundation well. The rest follows.

---

*This concludes my 14-part series on AWS for Composable Commerce Architects. If you found value in this series, I'd love to connect and continue the conversation.*

*💬 What's the most important architectural decision you made in your composable commerce journey? And what would you do differently knowing what you know now?*

---
**#ComposableCommerce #AWS #MACHArchitecture #SolutionsArchitect #CloudArchitecture #HeadlessCommerce #DigitalTransformation #CloudNative #WellArchitected**
