/**
 * Sitemap and RSS feed generation
 * For search engine and AI discovery
 */

import { AppConfig } from '../AppConfig';
import { getAllArticleEvents } from './articleEvents';
import { SitemapEntry, RSSItem } from './types';

/**
 * Escape special characters for XML
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate XML sitemap content
 */
export function generateSitemap(): string {
  const events = getAllArticleEvents();
  const baseUrl = AppConfig.url;

  const entries: SitemapEntry[] = [
    // Home page
    {
      url: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0,
    },
    // Section pages
    ...AppConfig.sections.map((section) => ({
      url: `${baseUrl}/${section.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily' as const,
      priority: 0.9,
    })),
    // Article pages
    ...events.map((event) => ({
      url: event.canonicalUrl,
      lastmod: event.updatedAt.split('T')[0],
      changefreq: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  const urlElements = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Generate RSS 2.0 feed content
 */
export function generateRSS(maxItems: number = 50): string {
  const events = getAllArticleEvents().slice(0, maxItems);
  const baseUrl = AppConfig.url;

  const items: RSSItem[] = events.map((event) => ({
    title: event.title,
    link: event.canonicalUrl,
    description: event.excerpt,
    pubDate: new Date(event.publishedAt).toUTCString(),
    guid: event.canonicalUrl,
    categories: event.tags,
    author: AppConfig.author,
  }));

  const itemElements = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      ${item.categories
        .map((c) => `<category>${escapeXml(c)}</category>`)
        .join('\n      ')}
      <author>${escapeXml(item.author)}</author>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(AppConfig.site_name)}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(AppConfig.description)}</description>
    <language>${AppConfig.locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemElements}
  </channel>
</rss>`;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const baseUrl = AppConfig.url;

  return `# Robots.txt for ${AppConfig.site_name}
# https://www.robotstxt.org/

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay (optional, respected by some crawlers)
Crawl-delay: 1

# Block admin and API routes from indexing
Disallow: /api/
Disallow: /_next/
`;
}

/**
 * Get sitemap statistics
 */
export function getSitemapStats(): {
  totalUrls: number;
  sections: number;
  articles: number;
  lastGenerated: string;
} {
  const events = getAllArticleEvents();

  return {
    totalUrls: 1 + AppConfig.sections.length + events.length, // home + sections + articles
    sections: AppConfig.sections.length,
    articles: events.length,
    lastGenerated: new Date().toISOString(),
  };
}
