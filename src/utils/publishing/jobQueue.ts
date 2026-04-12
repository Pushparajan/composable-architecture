/**
 * Job queue utilities
 * In-memory queue for development; replace with Redis/Postgres for production
 */

import {
  DistributionJob,
  JobType,
  JobStatus,
  DistributionAttempt,
} from './types';

// In-memory stores (replace with database in production)
const jobs: Map<string, DistributionJob> = new Map();
const attempts: Map<string, DistributionAttempt> = new Map();

/**
 * Generate unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a new distribution job
 */
export function createJob(
  articleId: string,
  jobType: JobType,
  scheduledAt?: Date
): DistributionJob {
  const job: DistributionJob = {
    id: generateId(),
    articleId,
    jobType,
    status: 'pending',
    attempts: 0,
    scheduledAt: (scheduledAt || new Date()).toISOString(),
  };

  jobs.set(job.id, job);
  return job;
}

/**
 * Get jobs by status
 */
export function getJobsByStatus(status: JobStatus): DistributionJob[] {
  return Array.from(jobs.values()).filter((job) => job.status === status);
}

/**
 * Get pending jobs ready for processing
 */
export function getPendingJobs(): DistributionJob[] {
  const now = new Date();
  return Array.from(jobs.values()).filter(
    (job) => job.status === 'pending' && new Date(job.scheduledAt) <= now
  );
}

/**
 * Get jobs by article ID
 */
export function getJobsByArticleId(articleId: string): DistributionJob[] {
  return Array.from(jobs.values()).filter((job) => job.articleId === articleId);
}

/**
 * Update job status
 */
export function updateJobStatus(
  jobId: string,
  status: JobStatus,
  error?: string
): DistributionJob | null {
  const job = jobs.get(jobId);
  if (!job) return null;

  job.status = status;
  job.attempts += 1;

  if (error) {
    job.lastError = error;
  }

  if (status === 'completed' || status === 'failed') {
    job.completedAt = new Date().toISOString();
  }

  jobs.set(jobId, job);
  return job;
}

/**
 * Reschedule a failed job for retry
 */
export function rescheduleJob(
  jobId: string,
  delayMinutes: number = 60
): DistributionJob | null {
  const job = jobs.get(jobId);
  if (!job) return null;

  job.status = 'pending';
  job.scheduledAt = new Date(
    Date.now() + delayMinutes * 60 * 1000
  ).toISOString();

  jobs.set(jobId, job);
  return job;
}

/**
 * Create a distribution attempt
 */
export function createAttempt(
  jobId: string,
  destinationId: string,
  payload: object
): DistributionAttempt {
  const attempt: DistributionAttempt = {
    id: generateId(),
    jobId,
    destinationId,
    payload: JSON.stringify(payload),
    status: 'pending',
  };

  attempts.set(attempt.id, attempt);
  return attempt;
}

/**
 * Update attempt with result
 */
export function updateAttempt(
  attemptId: string,
  status: DistributionAttempt['status'],
  responseCode?: number,
  responseBody?: string
): DistributionAttempt | null {
  const attempt = attempts.get(attemptId);
  if (!attempt) return null;

  attempt.status = status;
  attempt.responseCode = responseCode;
  attempt.responseBody = responseBody;

  if (status === 'posted') {
    attempt.postedAt = new Date().toISOString();
  }

  attempts.set(attemptId, attempt);
  return attempt;
}

/**
 * Get attempts pending approval
 */
export function getPendingApprovals(): DistributionAttempt[] {
  return Array.from(attempts.values()).filter(
    (attempt) => attempt.status === 'pending'
  );
}

/**
 * Get all attempts for a job
 */
export function getAttemptsByJobId(jobId: string): DistributionAttempt[] {
  return Array.from(attempts.values()).filter(
    (attempt) => attempt.jobId === jobId
  );
}

/**
 * Clear old completed jobs (for cleanup cron)
 */
export function clearOldJobs(olderThanDays: number = 30): number {
  const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
  let cleared = 0;

  const entriesToDelete = Array.from(jobs.entries()).filter(
    ([, job]) =>
      (job.status === 'completed' || job.status === 'failed') &&
      job.completedAt &&
      new Date(job.completedAt) < cutoff
  );

  entriesToDelete.forEach(([id]) => {
    jobs.delete(id);
    cleared += 1;
  });

  return cleared;
}

/**
 * Get queue statistics
 */
export function getQueueStats(): {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  pendingApprovals: number;
} {
  const jobArray = Array.from(jobs.values());

  return {
    pending: jobArray.filter((j) => j.status === 'pending').length,
    processing: jobArray.filter((j) => j.status === 'processing').length,
    completed: jobArray.filter((j) => j.status === 'completed').length,
    failed: jobArray.filter((j) => j.status === 'failed').length,
    pendingApprovals: getPendingApprovals().length,
  };
}
