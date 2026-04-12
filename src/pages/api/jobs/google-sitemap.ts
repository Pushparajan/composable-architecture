/**
 * Google Sitemap Job API
 * Verifies sitemap health and logs submission status
 * Note: Actual submission is done via Google Search Console (manual or API)
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import { AppConfig } from '../../../utils/AppConfig';
import {
  getSitemapStats,
  getPendingJobs,
  updateJobStatus,
} from '../../../utils/publishing';

// Vercel cron secret for authorization
const { CRON_SECRET } = process.env;

// Google Search Console API credentials (optional)
const GOOGLE_SERVICE_ACCOUNT = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret for scheduled calls
  if (CRON_SECRET && req.headers.authorization !== `Bearer ${CRON_SECRET}`) {
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
    // Get sitemap statistics
    const stats = getSitemapStats();

    // Process pending sitemap jobs
    const pendingJobs = getPendingJobs().filter(
      (job) => job.jobType === 'google_sitemap'
    );

    pendingJobs.forEach((job) => {
      updateJobStatus(job.id, 'processing');
    });

    // Verify sitemap is accessible
    const sitemapUrl = `${AppConfig.url}/sitemap.xml`;
    let sitemapAccessible = false;
    let sitemapError: string | undefined;

    try {
      const response = await fetch(sitemapUrl, { method: 'HEAD' });
      sitemapAccessible = response.ok;
      if (!response.ok) {
        sitemapError = `HTTP ${response.status}`;
      }
    } catch (error) {
      sitemapError =
        error instanceof Error ? error.message : 'Failed to fetch sitemap';
    }

    // If Google Search Console API is configured, submit sitemap
    let googleSubmission = { attempted: false, success: false, message: '' };

    if (GOOGLE_SERVICE_ACCOUNT && sitemapAccessible) {
      // Note: Full implementation requires @google-cloud/search-console npm package
      // and proper OAuth2 setup. This is a placeholder for the integration.
      googleSubmission = {
        attempted: true,
        success: false,
        message:
          'Google Search Console API integration requires additional setup. Submit sitemap manually at https://search.google.com/search-console',
      };
    }

    // Update job statuses
    pendingJobs.forEach((job) => {
      if (sitemapAccessible) {
        updateJobStatus(job.id, 'completed');
      } else {
        updateJobStatus(job.id, 'failed', sitemapError);
      }
    });

    res.status(200).json({
      success: sitemapAccessible,
      sitemap: {
        url: sitemapUrl,
        accessible: sitemapAccessible,
        error: sitemapError,
        stats,
      },
      googleSubmission,
      message: sitemapAccessible
        ? `Sitemap verified: ${stats.totalUrls} URLs`
        : `Sitemap verification failed: ${sitemapError}`,
      instructions: {
        searchConsole:
          'Submit your sitemap at https://search.google.com/search-console',
        verification:
          'Verify site ownership via DNS TXT record or HTML file upload',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Google sitemap job error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
