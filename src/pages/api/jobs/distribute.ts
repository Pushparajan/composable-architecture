/**
 * Distribution Job API
 * Classifies articles and creates channel-specific drafts for community distribution
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getPendingJobs,
  updateJobStatus,
  createAttempt,
  getMatchingDestinations,
  formatTitleForDestination,
  getAllArticleEvents,
} from '../../../utils/publishing';

// Vercel cron secret for authorization
const { CRON_SECRET } = process.env;

type DistributionDraft = {
  destinationId: string;
  destinationName: string;
  destinationType: string;
  title: string;
  body: string;
  link: string;
  requiresApproval: boolean;
  status: 'pending' | 'auto_queue';
};

/**
 * Generate distribution draft for a destination
 */
function generateDraft(
  article: {
    title: string;
    excerpt: string;
    canonicalUrl: string;
    tags: string[];
    section: string;
  },
  destination: {
    id: string;
    name: string;
    type: string;
    titleTemplate?: string;
    requiresManualApproval: boolean;
    allowsSelfPromotion: boolean;
  }
): DistributionDraft {
  const title = formatTitleForDestination(destination as any, article.title);

  // Generate platform-specific body
  let body: string;

  switch (destination.type) {
    case 'reddit':
      body = `${article.excerpt}\n\n[Read more](${article.canonicalUrl})`;
      break;
    case 'hn':
      // HN prefers minimal commentary on link submissions
      body = article.canonicalUrl;
      break;
    case 'linkedin':
      body = `${article.excerpt}\n\n🔗 ${
        article.canonicalUrl
      }\n\n#${article.tags.slice(0, 5).join(' #')}`;
      break;
    case 'x': {
      const shortExcerpt = article.excerpt.slice(0, 200);
      body = `${shortExcerpt}${article.excerpt.length > 200 ? '...' : ''}\n\n${
        article.canonicalUrl
      }`;
      break;
    }
    case 'devto':
      body = `---\ntitle: ${
        article.title
      }\npublished: false\ntags: ${article.tags
        .slice(0, 4)
        .join(', ')}\ncanonical_url: ${article.canonicalUrl}\n---\n\n${
        article.excerpt
      }\n\n[Continue reading on the original article](${article.canonicalUrl})`;
      break;
    default:
      body = `${article.excerpt}\n\n${article.canonicalUrl}`;
  }

  return {
    destinationId: destination.id,
    destinationName: destination.name,
    destinationType: destination.type,
    title,
    body,
    link: article.canonicalUrl,
    requiresApproval: destination.requiresManualApproval,
    status: destination.requiresManualApproval ? 'pending' : 'auto_queue',
  };
}

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
    // Process pending distribution jobs
    const pendingJobs = getPendingJobs().filter(
      (job) => job.jobType === 'community_draft'
    );

    const results: {
      articleId: string;
      draftsCreated: DistributionDraft[];
    }[] = [];

    await Promise.all(
      pendingJobs.map(async (job) => {
        updateJobStatus(job.id, 'processing');

        // Find the article event (in production, this would be stored in DB)
        const allEvents = getAllArticleEvents();
        const article = allEvents.find(
          (e) =>
            job.articleId.includes(e.slug) || job.articleId.includes(e.section)
        );

        if (!article) {
          updateJobStatus(job.id, 'failed', 'Article not found');
          return;
        }

        // Get matching destinations based on article topics
        const matchingDestinations = getMatchingDestinations(
          article.tags,
          article.section
        );

        const drafts = matchingDestinations.map((destination) => {
          const draft = generateDraft(article, destination);
          // Create distribution attempt record
          createAttempt(job.id, destination.id, draft);
          return draft;
        });

        results.push({
          articleId: job.articleId,
          draftsCreated: drafts,
        });

        updateJobStatus(job.id, 'completed');
      })
    );

    res.status(200).json({
      success: true,
      message: `Processed ${pendingJobs.length} distribution jobs`,
      jobsProcessed: pendingJobs.length,
      results,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Distribution job error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
