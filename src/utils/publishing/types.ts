/**
 * Event-driven publishing pipeline types
 * For automated search engine submission and community distribution
 */

export type ChangeType = 'created' | 'updated' | 'deleted';

export type ArticleEvent = {
  id: string;
  url: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  section: string;
  publishedAt: string;
  updatedAt: string;
  changeType: ChangeType;
  canonicalUrl: string;
  hash: string;
};

export type JobType =
  | 'indexnow'
  | 'google_sitemap'
  | 'community_draft'
  | 'community_post';

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type DistributionJob = {
  id: string;
  articleId: string;
  jobType: JobType;
  status: JobStatus;
  attempts: number;
  lastError?: string;
  scheduledAt: string;
  completedAt?: string;
};

export type DestinationType =
  | 'reddit'
  | 'hn'
  | 'indiehackers'
  | 'devto'
  | 'linkedin'
  | 'x'
  | 'slack'
  | 'discord';

export type Destination = {
  id: string;
  name: string;
  type: DestinationType;
  topics: string[];
  allowsLinks: boolean;
  allowsSelfPromotion: boolean;
  requiresManualApproval: boolean;
  cooldownHours: number;
  titleTemplate?: string;
  enabled: boolean;
};

export type DistributionAttempt = {
  id: string;
  jobId: string;
  destinationId: string;
  payload: string;
  responseCode?: number;
  responseBody?: string;
  postedAt?: string;
  status: 'pending' | 'approved' | 'rejected' | 'posted' | 'failed';
};

export type IndexNowSubmission = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export type SitemapEntry = {
  url: string;
  lastmod: string;
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  categories: string[];
  author: string;
};

export type PublishHookPayload = {
  slug: string;
  section: string;
  changeType: ChangeType;
  timestamp?: string;
  secret?: string;
};

export type PublishHookResponse = {
  success: boolean;
  message: string;
  articleEvent?: ArticleEvent;
  jobsCreated?: string[];
};
