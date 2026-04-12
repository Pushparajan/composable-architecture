---
title: 'Route 53 as the Global Traffic Director for Your Composable Commerce Platform'
description: "Alias records at the zone apex, all five routing policies mapped to composable commerce requirements, health checks that test business readiness not just ports, and GDPR compliance through geolocation routing."
date: '2024-03-11'
modified_date: '2024-03-11'
image: /assets/images/posts/route53-dns.jpg
tags:
  - Composable Commerce
  - AWS
  - Amazon Route 53
  - DNS
  - Global Architecture
  - MACH Architecture
  - GDPR
  - Disaster Recovery
---

# Route 53 as the Global Traffic Director for Your Composable Commerce Platform

*By a Senior AWS Solutions Architect | #ComposableCommerce #Route53 #DNS #GlobalArchitecture*

---

I want to start with a scenario that happens more often than it should.

A retailer launches a composable commerce platform. They've done everything right — independent PBCs, headless storefront, CloudFront at the edge, Multi-AZ databases. Then they configure DNS by pointing their apex domain to a CloudFront distribution using a CNAME record. It doesn't work. Three hours of debugging later, the answer is one of the most basic DNS concepts: **a CNAME record cannot be used at the zone apex.** An Alias record is the fix, available only in Route 53.

This is a small example of a larger truth: DNS is the first thing a user's browser interacts with, the last thing architects think about, and in a multi-region composable platform, it's one of the most consequential design decisions in the whole system.

## What Route 53 Actually Is

Most engineers think of Route 53 as "where you manage DNS records." That's like describing an ALB as "a thing that forwards HTTP requests." Technically accurate, deeply incomplete.

Route 53 is a **global traffic management system** that happens to implement DNS. It lets you express sophisticated routing policies — route by geography, by measured network latency, by health check status, by weighted percentage — and delivers those policies from 100+ points of presence worldwide with sub-10ms DNS resolution.

For a composable commerce platform serving users across multiple continents with multiple regional deployments, Route 53 is the policy layer that decides which deployment serves which user, and what happens automatically when a deployment fails.

## DNS Resolution: The Chain Your PBCs Start With

Every API call your headless storefront makes starts with a DNS resolution. Understanding the chain matters for configuring TTLs correctly and debugging latency.

```mermaid
flowchart TD
    BR["🌐 Browser\napi.shop.example.com"] -->|"1. check local cache"| LC{{"Cache hit?"}}
    LC -->|"yes (within TTL)"| DONE["↩️ Use cached IP\n(sub-millisecond)"]
    LC -->|"no (cache miss)"| RR["📡 Recursive Resolver\n(ISP / 8.8.8.8 / 1.1.1.1)"]
    RR --> ROOT["🌍 Root DNS Servers\n(13 worldwide, ICANN)"]
    ROOT -->|"refer to .com TLD"| TLD[".com TLD Servers"]
    TLD -->|"refer to example.com NS"| R53["🔵 Route 53\n(Authoritative Name Server)"]
    R53 -->|"evaluate routing policies"| POLICY["Geolocation · Latency\nWeighted · Failover"]
    POLICY -->|"return correct IP"| RR
    RR -->|"cache for TTL seconds"| BR
```

**TTL is the dial between caching efficiency and operational agility.** Short TTL = faster DNS changes propagate, more DNS queries (cost). Long TTL = slower changes, but resolvers cache longer (performance).

| Record | Recommended TTL | Rationale |
|---|---|---|
| Static CloudFront CDN | 86400s (1 day) | Never changes — maximise cache hits |
| Regional API endpoints | 300s (5 min) | Rarely changes, performance-sensitive |
| Failover records | 60s (1 min) | Fast failover requires short TTL |
| Health-checked records | 30s | Match to health check interval |
| Active deployment | 60s | Lower before any weighted routing change |

The operational discipline: always lower TTL 24–48 hours before a planned DNS change. Wait one full previous-TTL cycle for the change to propagate everywhere, then make your change. Rollback takes effect within the new shorter TTL.

## The Alias Record: Zone Apex Problem Solved

CNAME records (which map one name to another name) cannot exist at the zone apex — the root of your domain. `example.com` cannot be a CNAME. `www.example.com` can.

This matters because your composable storefront sits behind a CloudFront distribution or an ALB — both have DNS names, not static IPs. You need `example.com` to point there. Route 53 Alias records are the solution:

```mermaid
flowchart LR
    subgraph BAD["❌ CNAME at Zone Apex — Fails"]
        C1["example.com\n(zone apex)"] -. "CNAME — RFC violation" .-> CF1["CloudFront DNS"]
    end

    subgraph GOOD["✅ Route 53 Alias — Works Everywhere"]
        A1["example.com\n(zone apex)"] -->|"Alias — FREE queries"| CF2["CloudFront Distribution"]
        A2["example.com"] -->|"Alias"| ELB["us-east-1 ELB"]
        A3["www.example.com"] -->|"CNAME — works for subdomain"| CF2
    end

    style BAD fill:#3a0a0a,color:#fff
    style GOOD fill:#0a3a0a,color:#fff
```

**The bonus:** Alias queries to AWS resources are **free**. A busy composable storefront generates millions of DNS queries per day. Alias records to CloudFront and ELBs carry no Route 53 query charge. CNAME queries do.

## Five Routing Policies, Five Commerce Requirements

### 1. Simple Routing
One record, one answer. Use for admin tools and internal services that don't need global distribution. Not appropriate for customer-facing composable APIs.

### 2. Weighted Routing: Safe Progressive Deployments

Split traffic between two endpoints by percentage. In composable commerce this enables deploying a new storefront version to 10% of users before full rollout.

```mermaid
flowchart TD
    R53["🔵 Route 53\nWeighted Routing"]

    subgraph STEP1["Step 1 — 5% Canary"]
        V1A["ALB-v1  weight=950\n(95% traffic)"]
        V2A["ALB-v2  weight=50\n(5% traffic)"]
    end

    subgraph STEP2["Step 2 — 50/50 Validation"]
        V1B["ALB-v1  weight=500"]
        V2B["ALB-v2  weight=500"]
    end

    subgraph STEP3["Step 3 — Full Cutover"]
        V1C["ALB-v1  weight=0\n(kept for rollback)"]
        V2C["ALB-v2  weight=1000"]
    end

    R53 --> STEP1 -->|"metrics OK after 4hrs"| STEP2 -->|"metrics OK"| STEP3
    STEP3 -->|"issue detected"| ROLLBACK["⏪ Rollback\nv1=1000 v2=0\n~60s via DNS TTL"]

    style ROLLBACK fill:#3a0a0a,color:#fff
```

### 3. Latency-Based Routing: Nearest Region for Every Shopper

Routes users to whichever AWS Region Route 53 measures as having the lowest latency for their location.

```mermaid
flowchart LR
    R53["🔵 Route 53\nLatency-Based Routing"]

    US["🇺🇸 us-east-1 ALB\n~12ms for NY users"]
    EU["🇪🇺 eu-west-1 ALB\n~18ms for London users\n✅ GDPR compliant"]
    AP["🌏 ap-southeast-1 ALB\n~22ms for Singapore users"]

    NY["👤 New York user"] -->|"lowest latency"| R53 --> US
    LON["👤 London user"] -->|"lowest latency"| R53 --> EU
    SIN["👤 Singapore user"] -->|"lowest latency"| R53 --> AP
```

For a headless storefront making 8–12 PBC API calls per page render, routing to the nearest Region saves 150–170ms per call for non-local users. A product page that took 900ms for a Singapore user hitting us-east-1 takes 400ms from ap-southeast-1. That's the difference between a bounce and a session.

### 4. Failover Routing: Automatic Disaster Recovery

Active-passive DR: primary handles all traffic when healthy; secondary takes over when health checks fail.

**Health check design matters.** Don't test "is TCP 443 open?" — test meaningful business readiness:

```javascript
// GET /api/health/ready — evaluated by Route 53 every 30 seconds
app.get('/api/health/ready', async (req, res) => {
  const checks = await Promise.allSettled([
    checkDatabaseConnection(),
    checkCacheConnection(),
    checkCriticalPBCDependencies(),
    checkSecretsManagerAccess(),
  ]);

  const failed = checks.filter(c => c.status === 'rejected');

  if (failed.length === 0) {
    return res.status(200).json({ status: 'healthy', region: process.env.AWS_REGION });
  }
  // 503 triggers Route 53 to mark endpoint unhealthy → failover
  res.status(503).json({ status: 'unhealthy', failures: failed.map(f => f.reason.message) });
});
```

Route 53 checks every 30 seconds. After 3 consecutive failures (90 seconds), failover triggers automatically:

```mermaid
flowchart TD
    F0["T+0: us-east-1 becomes unhealthy"]
    F30["T+30s: 1st Route 53 health check fails"]
    F60["T+60s: 2nd health check fails"]
    F90["T+90s: 3rd failure\n→ endpoint marked UNHEALTHY\n→ Route 53 returns us-west-2 IP"]
    F150["T+150s: DNS TTL (60s) expires\n→ 100% traffic on us-west-2\n✅ Full failover complete"]
    RECOVER["🔄 us-east-1 recovers\n3 consecutive health checks pass\n→ Route 53 restores primary automatically"]

    F0 --> F30 --> F60 --> F90 --> F150 --> RECOVER

    style F90 fill:#3a1a1a,color:#fff
    style F150 fill:#1a3a1a,color:#fff
    style RECOVER fill:#1a4a1a,color:#fff
```

**Calculated health checks** let you avoid failover for non-critical PBC degradation:

```mermaid
flowchart TD
    subgraph HC["Calculated Health Check: Composable-Platform-Healthy"]
        CHK["✅ Checkout PBC /health → 200"]
        CAT["✅ Catalogue PBC /health → 200"]
        CRT["✅ Cart PBC /health → 200"]
        SRC["⚠️ Search PBC /health → 503\n(degraded — not critical)"]
    end

    RESULT{"3 of 4\npassing?"}
    HC --> RESULT
    RESULT -->|"yes (3/4)"| HEALTHY["✅ Platform HEALTHY\nNo failover triggered\nSearch shows fallback UI"]
    RESULT -->|"no (< 3)"| FAILOVER["🚨 FAILOVER triggered\nRoute 53 → secondary region"]

    style HEALTHY fill:#1a3a1a,color:#fff
    style FAILOVER fill:#3a1a1a,color:#fff
```

### 5. Geolocation Routing: GDPR as Infrastructure

Geolocation routing is not optional for composable platforms serving EU customers — it's a compliance control. EU customer data must stay in EU infrastructure. Route 53 enforces this before any request reaches your PBCs.

```mermaid
flowchart LR
    R53["🔵 Route 53\nGeolocation Routing"]

    EU["🇪🇺 European Union\n→ eu-west-1 ALB\nGDPR: data never leaves EU\nRDS · DDB · S3 all in eu-west-1"]
    US["🇺🇸 United States\n→ us-east-1 ALB"]
    AP["🌏 Asia Pacific\n→ ap-southeast-1 ALB\nJP · KR · SG · AU · IN"]
    DEF["🌍 Default (all others)\n→ us-east-1 ALB"]

    FR["🇫🇷 French user"] -->|"geo: EU"| R53 --> EU
    NY["🇺🇸 US user"] -->|"geo: US"| R53 --> US
    SG["🇸🇬 Singapore user"] -->|"geo: APAC"| R53 --> AP
    BR["🇧🇷 Brazil user"] -->|"geo: default"| R53 --> DEF
```

A French user's entire journey — browse, cart, checkout, order — occurs within eu-west-1. Data never transits to a US server. The Route 53 geolocation record is a GDPR compliance control implemented at the infrastructure layer, independent of application code.

## The Full Picture: Route 53 Tying the Multi-Region Platform Together

```mermaid
flowchart TD
    Q["👤 User DNS Query"]
    R53["🔵 Route 53\nEvaluates policies in order"]
    GEO{"Geolocation\ncheck"}
    HC{"Health check\npassing?"}
    WGT{"Weighted\ndeployment?"}

    EU_ALB["🇪🇺 eu-west-1 ALB"]
    US_ALB["🇺🇸 us-east-1 ALB"]
    FB_ALB["🔄 Failover ALB\nother region"]

    CF["⚡ CloudFront\n(static assets, cached)"]
    PBC["⚙️ PBC Instances\n(dynamic API)"]

    Q --> R53 --> GEO
    GEO -->|"EU user"| HC
    GEO -->|"US user"| US_ALB
    HC -->|"healthy"| WGT
    HC -->|"unhealthy"| FB_ALB
    WGT -->|"v1 traffic share"| EU_ALB
    WGT -->|"v2 canary share"| EU_ALB
    EU_ALB --> CF & PBC
```

## Three Operational Rules I Apply to Every Engagement

**Rule 1: DNS configuration is infrastructure code, not console work.**
Every Route 53 record, health check, and routing policy belongs in CloudFormation or Terraform, committed to version control. A DNS misconfiguration that takes down a global e-commerce platform because someone edited a record in the console at 11pm is an avoidable outage.

**Rule 2: Use CloudWatch Alarm health checks for application-level routing decisions.**
Infrastructure health checks (TCP connect, HTTP 200) don't catch application degradation — a service that returns 200 but is processing requests 10x slower than normal, a checkout flow with a payment provider partial outage. CloudWatch Alarm health checks tie Route 53 routing to your actual business metrics.

**Rule 3: Health check from multiple regions.**
Route 53 health checks from a single location can be fooled by regional internet routing issues. Configure health checks from at least 3 Route 53 health check locations. This prevents a transient routing issue from a single location triggering an unnecessary failover.

---

*Next: ElastiCache — the in-memory layer that prevents your 15-service composable platform from hammering databases on every page render.*

*💬 What's your TTL strategy for critical DNS records? I've seen teams caught by long TTLs during incidents more often than almost any other single configuration decision.*

---
**#Route53 #DNS #AWS #ComposableCommerce #GlobalArchitecture #MACH #GDPR #DisasterRecovery #SolutionsArchitect #CloudNative**
