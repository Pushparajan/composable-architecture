---
title: 'AWS for Composable Commerce: The Complete Architecture Series'
description: "A full 14-article series mapping every major AWS service to composable commerce PBC design - infrastructure, security, data, and messaging patterns for MACH architects."
date: '2024-01-08'
modified_date: '2024-01-08'
image: /assets/images/posts/aws-composable-series.jpg
tags:
  - Composable Commerce
  - AWS
  - MACH Architecture
  - Cloud Native
  - Solutions Architect
  - Headless Commerce
---

# I Wrote 14 Deep-Dive Articles on AWS for Composable Commerce Architects. Here's the Full Map.

*By a Senior AWS Solutions Architect | #ComposableCommerce #AWS #MACH #SolutionsArchitect*

---

Over the past few months I've published a complete series on the AWS infrastructure layer of composable commerce — the design decisions, architectural patterns, and operational trade-offs that determine whether a MACH platform genuinely delivers on its promise or just redistributes complexity.

This post is the index. Each entry links to the full article with architecture diagrams, code examples, configuration patterns, and the real-world decisions I make on client engagements.

If you're building, migrating to, or evaluating a composable commerce platform, bookmark this post. The series covers every major AWS service category in the context of composable architecture.

---

## Why I Wrote This Series

Composable commerce architectures that use microservices, APIs, cloud-native SaaS, and a headless structure — collectively known as MACH — offer greater business agility compared to traditional monolithic architectures.

I've spent years watching retailers adopt this architecture and running into the same infrastructure problems repeatedly: PBCs that can't scale because they're stateful, payment systems exposed by poor network isolation, compliance failures because the AWS shared responsibility model was misunderstood, cache designs that collapse under Black Friday load.

The MACH architecture conversations I find online focus heavily on the application layer — which headless CMS to choose, how to design PBC APIs, how to handle the Saga pattern for distributed transactions. The infrastructure layer gets far less attention. That's the gap this series fills.

The history of building modern, modular architectures at Amazon began in 2002. The early Amazon.com webstore was a monolithic system, making it difficult to develop and release new features quickly. Amazon adopted an API-first design approach and the two-pizza team rule — breaking down software features into smaller, independent units managed by small teams. AWS was built from those learnings. Using it well for composable commerce means understanding that heritage.

---

## The Full Series

### Foundation

**Article 1: AWS Global Infrastructure for Composable Commerce**
*Why Region selection, AZ design, and Edge Locations are architectural decisions — not just deployment details. The hybrid connectivity patterns that make incremental migration viable.*
→ Topics: Regions, AZs, Edge Locations, Direct Connect, hybrid architecture, the 6 advantages reframed for MACH

---

**Article 2: S3 and Glacier — The Content Backbone of Composable Commerce**
*How S3 becomes the shared asset integration layer between PBCs. Pre-signed URLs for headless storefronts. Lifecycle policies for commerce data. The S3 + DynamoDB index pattern.*
→ Topics: Object storage vs block/file, storage classes, SSE-KMS, pre-signed URLs, Cross-Region Replication, Glacier vault locks for compliance

---

### Compute and Networking

**Article 3: EC2 and EBS — Sizing the Compute Layer for Your PBCs**
*Why different PBCs need different instance families. Golden AMIs as deployment contracts. The three pricing models applied to composable workloads. The stateless PBC imperative.*
→ Topics: Instance families, AMI strategy, On-Demand vs Reserved vs Spot, EBS volume types, instance store vs EBS

---

**Article 4: VPC Design for Composable Commerce — Isolation Without Friction**
*The reference subnet topology for multi-tier composable platforms. Security Groups vs NACLs (and why you need both). VPC Endpoints for keeping PBC traffic off the internet. Transit Gateway for multi-team deployments.*
→ Topics: Subnet design, NACL vs Security Groups, VPC Endpoints, Peering, Transit Gateway, payment subnet PCI isolation

---

**Article 5: ELB, CloudWatch and Auto Scaling — The Elasticity Engine**
*ALB path-based routing for PBC dispatch. Business-level CloudWatch metrics (not just CPU). Auto Scaling strategies per PBC workload type. Connection draining for zero-downtime PBC deployments.*
→ Topics: ALB routing, custom metrics, target tracking vs step scaling, scheduled scaling, connection draining

---

### Identity and Data

**Article 6: IAM for Composable Commerce — Zero Trust Between Your Own Services**
*One role per PBC. No credentials in code or config. Cross-PBC authorisation patterns. MFA enforcement for human access. The blast radius containment model.*
→ Topics: Per-PBC IAM roles, EC2 instance roles, Secrets Manager, cross-account access, MFA policies, CloudTrail audit

---

**Article 7: Databases — RDS, DynamoDB and Redshift in Composable Commerce**
*Polyglot persistence for different PBCs. Multi-AZ vs Read Replicas (the most commonly misunderstood distinction). DynamoDB for Cart and Session. Redshift as the cross-PBC analytics layer.*
→ Topics: Aurora for Order PBC, DynamoDB for Cart/Session, Redshift for analytics, RPO/RTO design, the data ownership contract

---

### Messaging and Traffic Management

**Article 8: SQS and SNS — The Event-Driven Backbone**
*The order-placed fan-out pattern. Visibility timeout as the reliability contract. Dead Letter Queues as revenue alerts. SNS for PBC decoupled subscriptions — add a new PBC without touching the publisher.*
→ Topics: Fan-out pattern, FIFO queues for payment, DLQ design, long polling, SNS subscription model, idempotent consumers

---

**Article 9: Route 53 — Global Traffic Director for Multi-Region Composable Platforms**
*Alias records at the zone apex. Five routing policies mapped to five commerce requirements. Health check design that tests business readiness, not just port availability. GDPR compliance through geolocation routing.*
→ Topics: Alias vs CNAME, latency routing, weighted routing for deployments, failover routing for DR, geolocation for GDPR

---

**Article 10: ElastiCache — Making 15 API Calls Feel Like One**
*Cache-aside per PBC with versioned keys. TTL as a business decision. Redis data structures for sessions, inventory counters, and leaderboards. Atomic operations for flash sales. Cache warming strategies.*
→ Topics: Cache-aside pattern, Redis sorted sets, atomic counters for inventory, rate limiting, Multi-AZ failover, cold start mitigation

---

### Services and Governance

**Article 11: CloudFront, Kinesis and CloudFormation — The Infrastructure Glue**
*CloudFront cache behaviour configuration for composable storefronts. Kinesis for real-time behavioural signals to the personalisation PBC. CloudFormation as the deployment contract between platform and PBC teams.*
→ Topics: CloudFront path-based caching, OAI for S3, Kinesis Streams vs Firehose, CloudFormation modules, Config rules

---

**Article 12: Security Architecture — Protecting 15 Services at Once**
*Defence in depth for composable platforms. WAF rules tuned for composable storefronts. The Payment PBC PCI isolation pattern. IMDSv2 enforcement and eliminating SSH. CloudTrail as incident response infrastructure.*
→ Topics: WAF managed rules + custom rules, Shield Standard/Advanced, payment subnet NACL design, IMDSv2, CloudTrail query patterns

---

**Article 13: Compliance — What AWS Certifications Cover and What You Still Own**
*The three-layer responsibility model for composable commerce. AWS Artifact for QSA evidence. AWS Config rules for continuous compliance. GDPR right-to-erasure across PBCs.*
→ Topics: Shared responsibility model, AWS Artifact, Config auto-remediation, GDPR data residency, PCI scope reduction via tokenisation

---

**Article 14: Ten Architecture Principles for Composable Commerce That Actually Scales**
*The synthesis: designing for failure you haven't imagined, stateless PBC as an absolute constraint, security as infrastructure, the right storage for each PBC, and why the migration is an architecture not a project.*
→ Topics: Fault tolerance, loose coupling, polyglot persistence, Well-Architected Framework, PBC granularity, the strangler fig migration pattern

---

## The Through-Line

Every article in this series returns to the same set of core tensions in composable commerce architecture:

**Isolation vs. connectivity.** PBCs must be independently deployable, which means isolated. But they must also communicate, which means connected. VPC design, Security Groups, and SQS/SNS mediate this tension at the infrastructure layer.

**Performance vs. consistency.** Caching makes composable platforms fast. Caching makes data stale. The TTL decisions, the which-data-to-cache decisions, and the "never cache at checkout confirm time" decisions are where that tension resolves.

**Agility vs. governance.** The value proposition of composable commerce is that teams deploy independently at their own pace. The risk is that independent teams drift from compliance baselines. CloudFormation, Config, and IAM permission boundaries are the governance controls that preserve agility without sacrificing compliance.

**Simplicity vs. capability.** Every AWS service I've covered could be replaced by a simpler, cheaper, or more familiar alternative for a small enough workload. The case for each AWS service is always the same: at composable commerce scale, the managed service's operational overhead savings, reliability characteristics, and deep integration with the rest of the stack justify the cost.

---

## One Final Thought

By 2026, Gartner predicts that the speed of digital innovation will improve by 60%, relative to 2022, for businesses that have established mechanisms to reuse composable digital commerce modules.

That improvement only materialises if the infrastructure layer is built correctly. Composable commerce built on poorly designed AWS infrastructure is a distributed monolith: all the operational complexity of microservices, none of the resilience or scalability benefits.

Build the infrastructure well. Each article in this series is a detailed guide to one piece of that foundation. I hope they're useful.

---

*If this series has been valuable, the best thing you can do is share it with an architect who's in the middle of a composable migration. These are the questions they're asking.*

*💬 Which infrastructure challenge in your composable platform was hardest to get right? I'd love to hear from practitioners.*

*🔔 Follow me for ongoing content on composable commerce, AWS architecture, and the engineering patterns that turn architecture diagrams into production systems.*

---
**#ComposableCommerce #AWS #MACHArchitecture #SolutionsArchitect #CloudArchitecture #HeadlessCommerce #DigitalTransformation #CloudNative #eCommerce #Microservices #APIFirst**
