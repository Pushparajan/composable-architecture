/**
 * IndexNow Job API
 * Submits changed URLs to IndexNow for fast search engine notification
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import {
  submitArticleUrls,
  getPendingJobs,
  updateJobStatus,
  getRecentlyUpdatedArticles,
} from '../../../utils/publishing';

// Vercel cron secret for authorization
const { CRON_SECRET } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret for scheduled calls
  if (CRON_SECRET && req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
    // Allow POST without auth for manual triggers
    if (req.method !== 'POST' || !req.body.manual) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Get URLs to submit
    let urlsToSubmit: string[] = [];

    if (req.method === 'POST' && req.body.urls) {
      // Manual URL submission
      urlsToSubmit = req.body.urls;
    } else {
      // Process pending IndexNow jobs
      const pendingJobs = getPendingJobs().filter(
        (job) => job.jobType === 'indexnow'
      );

      // Also check for recently updated articles
      const recentArticles = getRecentlyUpdatedArticles(24);
      urlsToSubmit = recentArticles.map((article) => article.canonicalUrl);

      // Mark pending jobs as processing
      pendingJobs.forEach((job) => {
        updateJobStatus(job.id, 'processing');
      });
    }

    if (urlsToSubmit.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No URLs to submit',
        submitted: 0,
      });
      return;
    }

    // Submit to IndexNow
    const result = await submitArticleUrls(urlsToSubmit);

    // Update job statuses
    const completedJobs = getPendingJobs().filter(
      (job) => job.jobType === 'indexnow'
    );
    completedJobs.forEach((job) => {
      if (result.success) {
        updateJobStatus(job.id, 'completed');
      } else {
        updateJobStatus(job.id, 'failed', result.error);
      }
    });

    res.status(200).json({
      success: result.success,
      message: result.success
        ? `Submitted ${result.submitted} URLs to IndexNow`
        : `Failed to submit URLs: ${result.error}`,
      submitted: result.submitted,
      status: result.status,
      urls: urlsToSubmit,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('IndexNow job error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
