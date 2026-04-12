# Content Publishing & Promotion Guide

This guide explains how to use the event-driven publishing pipeline to promote your blog content across search engines and community platforms.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     PUBLISHING PIPELINE                         │
├─────────────────────────────────────────────────────────────────┤
│  Content Layer     →  Discovery Layer  →  Submission Layer      │
│  (Markdown posts)     (sitemap/rss)       (IndexNow/Google)     │
│                                                                 │
│                    →  Distribution Layer                        │
│                       (Community posts)                         │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
# Required
SITE_URL=https://composablearchitecture.com
INDEXNOW_KEY=your-unique-key-here

# Optional - for webhook security
PUBLISH_HOOK_SECRET=your-webhook-secret

# Optional - for Google Search Console
GOOGLE_SEARCH_CONSOLE_SITE=https://composablearchitecture.com
```

### 2. Generate IndexNow Key

Create a unique key file for IndexNow verification:

```bash
# Generate a random key
echo "your-unique-alphanumeric-key" > public/indexnow-key.txt
```

Add the same key to your `.env.local` as `INDEXNOW_KEY`.

---

## Automatic Discovery (Feeds)

These endpoints are automatically generated and always up-to-date:

| Endpoint | Description |
|----------|-------------|
| `/sitemap.xml` | XML sitemap for search engines |
| `/rss.xml` | RSS 2.0 feed for subscribers |
| `/robots.txt` | Crawler directives with sitemap reference |

### Testing Feeds Locally

```bash
npm run dev

# Check sitemap
curl http://localhost:3000/sitemap.xml

# Check RSS
curl http://localhost:3000/rss.xml
```

---

## Manual Content Promotion

### Option 1: Trigger via Publish Hook

When you publish or update content, trigger the pipeline:

```bash
# Notify the pipeline of a new/updated article
curl -X POST http://localhost:3000/api/publish-hook \
  -H "Content-Type: application/json" \
  -d '{
    "action": "published",
    "slug": "my-new-article",
    "section": "composablearchitecture"
  }'
```

This creates jobs for:
- IndexNow submission (search engine notification)
- Google sitemap ping
- Community distribution drafts

### Option 2: Direct IndexNow Submission

Submit URLs directly to search engines:

```bash
# Submit specific URLs to IndexNow
curl -X POST http://localhost:3000/api/jobs/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://composablearchitecture.com/composablearchitecture/my-article"
    ]
  }'
```

### Option 3: Force Sitemap Refresh

Ping Google to re-crawl your sitemap:

```bash
curl -X POST http://localhost:3000/api/jobs/google-sitemap
```

---

## Community Distribution

The distribution layer helps you share content across platforms like Reddit, Hacker News, Dev.to, LinkedIn, and Twitter/X.

### Step 1: Generate Drafts

Create platform-specific drafts for matching destinations:

```bash
curl -X POST http://localhost:3000/api/jobs/distribute
```

This analyzes your recent articles and creates drafts for platforms that match the content's topics.

### Step 2: Review Pending Approvals

View drafts awaiting your approval:

```bash
curl http://localhost:3000/api/jobs/community-review
```

Response example:
```json
{
  "pendingApprovals": [
    {
      "id": "job-123",
      "destination": "reddit-architecture",
      "draft": {
        "title": "[Discussion] API Gateways for Composable Stack",
        "body": "I wrote about API gateway patterns...",
        "url": "https://composablearchitecture.com/..."
      }
    }
  ]
}
```

### Step 3: Approve or Reject

Approve a draft to mark it ready for posting:

```bash
curl -X POST http://localhost:3000/api/jobs/community-review \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "job-123",
    "action": "approve"
  }'
```

Or reject with a reason:

```bash
curl -X POST http://localhost:3000/api/jobs/community-review \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "job-123",
    "action": "reject",
    "reason": "Not ready for this platform yet"
  }'
```

---

## Destination Matching

Content is matched to platforms based on topics:

| Platform | Topics |
|----------|--------|
| `reddit-architecture` | composable, architecture, microservices, distributed |
| `reddit-aws` | aws, cloud, serverless, lambda |
| `hackernews` | architecture, engineering, startup, innovation |
| `devto` | (all technical content) |
| `linkedin` | leadership, strategy, digital transformation |
| `twitter-x` | (all content - short format) |

### Cooldown Periods

To avoid spam, each destination has a cooldown:
- Reddit: 24 hours
- Hacker News: 48 hours
- Dev.to: 12 hours
- LinkedIn: 6 hours
- Twitter/X: 2 hours

---

## Automated Scheduling (Vercel Cron)

When deployed to Vercel, these jobs run automatically:

| Job | Schedule | Description |
|-----|----------|-------------|
| IndexNow | Every 15 min | Submit pending URLs to search engines |
| Google Sitemap | Every 6 hours | Ping Google about sitemap updates |
| Distribute | Every 6 hours | Generate new community drafts |
| Community Review | Daily at 9 AM | Process approved posts |

To modify schedules, edit `vercel.json`:

```json
{
  "crons": [
    { "path": "/api/jobs/indexnow", "schedule": "*/15 * * * *" },
    { "path": "/api/jobs/google-sitemap", "schedule": "0 */6 * * *" },
    { "path": "/api/jobs/distribute", "schedule": "0 */6 * * *" },
    { "path": "/api/jobs/community-review", "schedule": "0 9 * * *" }
  ]
}
```

---

## Webhook Integration (CI/CD)

Trigger promotion automatically when content changes:

### GitHub Actions Example

```yaml
# .github/workflows/promote-content.yml
name: Promote Content

on:
  push:
    paths:
      - '_content/**'
      - '_posts/**'

jobs:
  promote:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger publish hook
        run: |
          curl -X POST ${{ secrets.SITE_URL }}/api/publish-hook \
            -H "Content-Type: application/json" \
            -H "X-Hub-Signature-256: sha256=${{ secrets.PUBLISH_HOOK_SECRET }}" \
            -d '{"action": "published"}'
```

### Netlify Build Hook

Add to `netlify.toml`:

```toml
[build]
  command = "npm run build && curl -X POST $SITE_URL/api/publish-hook"
```

---

## Monitoring & Debugging

### Check Job Status

View the current state of jobs:

```bash
# Get pending IndexNow submissions
curl http://localhost:3000/api/jobs/indexnow

# Get distribution job status
curl http://localhost:3000/api/jobs/distribute
```

### Common Issues

**IndexNow returns 403:**
- Verify `public/indexnow-key.txt` exists and matches `INDEXNOW_KEY`

**Sitemap not updating:**
- Pages are generated at request time; clear CDN cache if needed

**Drafts not matching destinations:**
- Check article frontmatter has relevant `tags` or `categories`

---

## Production Checklist

Before going live:

- [ ] Set `SITE_URL` to production domain
- [ ] Generate and configure `INDEXNOW_KEY`
- [ ] Verify `public/indexnow-key.txt` is deployed
- [ ] Submit sitemap to Google Search Console
- [ ] Configure `PUBLISH_HOOK_SECRET` for webhook security
- [ ] Test all endpoints with production URLs
- [ ] Verify Vercel cron jobs are enabled (Pro plan required)

---

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/sitemap.xml` | GET | XML sitemap |
| `/rss.xml` | GET | RSS 2.0 feed |
| `/api/publish-hook` | POST | Trigger publishing pipeline |
| `/api/jobs/indexnow` | GET/POST | IndexNow submission status/trigger |
| `/api/jobs/google-sitemap` | GET/POST | Sitemap ping status/trigger |
| `/api/jobs/distribute` | GET/POST | Distribution drafts status/generate |
| `/api/jobs/community-review` | GET/POST | Review pending approvals |

---

## Further Reading

- [IndexNow Protocol](https://www.indexnow.org/)
- [Google Search Console](https://search.google.com/search-console)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
