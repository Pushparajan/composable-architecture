/**
 * Publish Hook API
 * Receives publish events from CMS, GitHub Actions, or manual triggers
 */

import crypto from 'crypto';

import type { NextApiRequest, NextApiResponse } from 'next';

import {
  PublishHookPayload,
  PublishHookResponse,
  createArticleEvent,
  createJob,
} from '../../utils/publishing';

// Webhook secret for HMAC validation
const WEBHOOK_SECRET = process.env.PUBLISH_WEBHOOK_SECRET;

/**
 * Validate HMAC signature (optional, for secure webhooks)
 */
function validateSignature(req: NextApiRequest): boolean {
  if (!WEBHOOK_SECRET) return true; // Skip validation if no secret configured

  const signature = req.headers['x-webhook-signature'] as string;
  if (!signature) return false;

  const body = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublishHookResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Validate webhook signature
  if (!validateSignature(req)) {
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  try {
    const payload: PublishHookPayload = req.body;

    // Validate required fields
    if (!payload.slug || !payload.section || !payload.changeType) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: slug, section, changeType',
      });
      return;
    }

    // Create article event
    const articleEvent = createArticleEvent(
      payload.slug,
      payload.section,
      payload.changeType
    );

    if (!articleEvent) {
      res.status(404).json({
        success: false,
        message: `Article not found: ${payload.section}/${payload.slug}`,
      });
      return;
    }

    // Create distribution jobs
    const jobsCreated: string[] = [];

    // IndexNow job (immediate submission)
    const indexNowJob = createJob(articleEvent.id, 'indexnow');
    jobsCreated.push(`indexnow:${indexNowJob.id}`);

    // Google sitemap job (sitemap refresh/verification)
    const sitemapJob = createJob(articleEvent.id, 'google_sitemap');
    jobsCreated.push(`google_sitemap:${sitemapJob.id}`);

    // Community draft job (for distribution to forums/social)
    if (payload.changeType === 'created') {
      const draftJob = createJob(articleEvent.id, 'community_draft');
      jobsCreated.push(`community_draft:${draftJob.id}`);
    }

    res.status(200).json({
      success: true,
      message: `Publish event processed for ${payload.section}/${payload.slug}`,
      articleEvent,
      jobsCreated,
    });
  } catch (error) {
    console.error('Publish hook error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
