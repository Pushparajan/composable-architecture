/**
 * Article event utilities
 * Creates normalized ArticleEvent objects from content
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import { AppConfig } from '../AppConfig';
import { getPostBySlug, PostItems } from '../Content';
import { ArticleEvent, ChangeType } from './types';

/**
 * Generate a hash for article content to detect changes
 */
function generateContentHash(post: PostItems): string {
  const content = `${post.title}|${post.description}|${post.content}|${post.date}`;
  return crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
}

/**
 * Create an ArticleEvent from a post
 */
export function createArticleEvent(
  slug: string,
  section: string,
  changeType: ChangeType
): ArticleEvent | null {
  const post = getPostBySlug(
    slug,
    [
      'title',
      'description',
      'date',
      'modified_date',
      'tags',
      'content',
      'slug',
    ],
    section
  );

  if (!post) {
    return null;
  }

  const baseUrl = AppConfig.url;
  const url = `${baseUrl}/${section}/posts/${slug}`;

  return {
    id: `${section}-${slug}-${Date.now()}`,
    url,
    slug,
    title: post.title,
    excerpt: post.description || '',
    tags: post.tags || [],
    section,
    publishedAt: post.date,
    updatedAt: post.modified_date || post.date,
    changeType,
    canonicalUrl: url,
    hash: generateContentHash(post),
  };
}

/**
 * Get all article events for a section (for sitemap/RSS generation)
 */
export function getAllArticleEvents(section?: string): ArticleEvent[] {
  const sectionsToProcess = section
    ? [AppConfig.getSectionBySlug(section)].filter(Boolean)
    : AppConfig.sections;

  const events = sectionsToProcess
    .filter((sectionConfig) => sectionConfig != null)
    .flatMap((sectionConfig) => {
      const { slug: sectionSlug } = sectionConfig!;
      const contentDir = path.join(process.cwd(), sectionConfig!.contentDir);

      if (!fs.existsSync(contentDir)) {
        return [];
      }

      const files = fs
        .readdirSync(contentDir)
        .filter((f: string) => f.endsWith('.md'));

      return files
        .map((file: string) => {
          const slug = file.replace(/\.md$/, '');
          return createArticleEvent(slug, sectionSlug, 'created');
        })
        .filter((event): event is ArticleEvent => event !== null);
    });

  // Sort by date descending
  return events.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get recently updated articles (within last N hours)
 */
export function getRecentlyUpdatedArticles(
  hoursAgo: number = 24
): ArticleEvent[] {
  const allEvents = getAllArticleEvents();
  const cutoff = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

  return allEvents.filter((event) => new Date(event.updatedAt) >= cutoff);
}
