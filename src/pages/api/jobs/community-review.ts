/**
 * Community Review Job API
 * Manages approval workflow for community distribution
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import {
  getPendingApprovals,
  updateAttempt,
  getDestinationById,
  getQueueStats,
} from '../../../utils/publishing';

// Vercel cron secret for authorization
const { CRON_SECRET } = process.env;

async function handleGetApprovals(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const pendingApprovals = getPendingApprovals();
    const stats = getQueueStats();

    // Enrich with destination info
    const enrichedApprovals = pendingApprovals.map((attempt) => {
      const destination = getDestinationById(attempt.destinationId);
      return {
        ...attempt,
        destination: destination
          ? {
              name: destination.name,
              type: destination.type,
              requiresManualApproval: destination.requiresManualApproval,
            }
          : null,
        payload: JSON.parse(attempt.payload),
      };
    });

    res.status(200).json({
      success: true,
      pendingApprovals: enrichedApprovals,
      stats,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Get approvals error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}

async function handleApprovalAction(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { attemptId, action, adminSecret } = req.body;

    // Simple admin authentication (replace with proper auth in production)
    const { ADMIN_SECRET } = process.env;
    if (ADMIN_SECRET && adminSecret !== ADMIN_SECRET) {
      res.status(401).json({ error: 'Invalid admin secret' });
      return;
    }

    if (!attemptId || !action) {
      res.status(400).json({
        error: 'Missing required fields: attemptId, action',
      });
      return;
    }

    if (!['approve', 'reject'].includes(action)) {
      res.status(400).json({
        error: 'Invalid action. Must be "approve" or "reject"',
      });
      return;
    }

    const status = action === 'approve' ? 'approved' : 'rejected';
    const updatedAttempt = updateAttempt(attemptId, status);

    if (!updatedAttempt) {
      res.status(404).json({
        error: 'Attempt not found',
      });
      return;
    }

    // If approved, the attempt would be queued for actual posting
    // This would integrate with platform-specific APIs (Reddit, LinkedIn, etc.)
    let postingMessage = '';
    if (action === 'approve') {
      postingMessage =
        'Approved for posting. Actual posting requires platform API integration.';
      // In production:
      // - Reddit: Use PRAW or reddit-api-client
      // - LinkedIn: Use LinkedIn API
      // - Twitter/X: Use Twitter API v2
      // - Dev.to: Use Forem API
    }

    res.status(200).json({
      success: true,
      message: `Attempt ${action}d successfully`,
      attempt: updatedAttempt,
      postingMessage,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Approval action error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret for scheduled calls
  if (
    req.method === 'GET' &&
    CRON_SECRET &&
    req.headers.authorization !== `Bearer ${CRON_SECRET}`
  ) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  switch (req.method) {
    case 'GET':
      // Get pending approvals and queue stats
      await handleGetApprovals(req, res);
      break;

    case 'POST':
      // Approve or reject a distribution attempt
      await handleApprovalAction(req, res);
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
