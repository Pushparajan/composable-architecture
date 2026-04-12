/**
 * Destination registry for community distribution
 * Configure where articles can be distributed based on topics and rules
 */

import { Destination } from './types';

export const destinations: Destination[] = [
  {
    id: 'reddit-architecture',
    name: 'r/softwarearchitecture',
    type: 'reddit',
    topics: ['composable-architecture', 'microservices', 'architecture'],
    allowsLinks: true,
    allowsSelfPromotion: false,
    requiresManualApproval: true,
    cooldownHours: 168, // 1 week
    titleTemplate: '{title}',
    enabled: true,
  },
  {
    id: 'reddit-aws',
    name: 'r/aws',
    type: 'reddit',
    topics: ['aws', 'cloud', 'amazon'],
    allowsLinks: true,
    allowsSelfPromotion: false,
    requiresManualApproval: true,
    cooldownHours: 168,
    enabled: true,
  },
  {
    id: 'hackernews',
    name: 'Hacker News',
    type: 'hn',
    topics: ['*'], // All topics
    allowsLinks: true,
    allowsSelfPromotion: false,
    requiresManualApproval: true,
    cooldownHours: 336, // 2 weeks
    enabled: true,
  },
  {
    id: 'devto',
    name: 'DEV.to',
    type: 'devto',
    topics: ['*'],
    allowsLinks: true,
    allowsSelfPromotion: true,
    requiresManualApproval: false,
    cooldownHours: 24,
    enabled: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    type: 'linkedin',
    topics: ['*'],
    allowsLinks: true,
    allowsSelfPromotion: true,
    requiresManualApproval: false,
    cooldownHours: 24,
    titleTemplate: '📚 New Article: {title}',
    enabled: true,
  },
  {
    id: 'twitter-x',
    name: 'X (Twitter)',
    type: 'x',
    topics: ['*'],
    allowsLinks: true,
    allowsSelfPromotion: true,
    requiresManualApproval: false,
    cooldownHours: 4,
    enabled: true,
  },
];

/**
 * Get destinations matching article topics
 */
export function getMatchingDestinations(
  articleTags: string[],
  sectionSlug: string
): Destination[] {
  const normalizedTags = articleTags.map((t) => t.toLowerCase());
  normalizedTags.push(sectionSlug.toLowerCase());

  return destinations.filter((dest) => {
    if (!dest.enabled) return false;
    if (dest.topics.includes('*')) return true;
    return dest.topics.some(
      (topic) =>
        normalizedTags.includes(topic.toLowerCase()) ||
        normalizedTags.some((tag) => tag.includes(topic.toLowerCase()))
    );
  });
}

/**
 * Check if destination cooldown has passed
 */
export function isCooldownPassed(
  destination: Destination,
  lastPostDate?: string
): boolean {
  if (!lastPostDate) return true;

  const lastPost = new Date(lastPostDate);
  const now = new Date();
  const hoursSinceLastPost =
    (now.getTime() - lastPost.getTime()) / (1000 * 60 * 60);

  return hoursSinceLastPost >= destination.cooldownHours;
}

/**
 * Get destination by ID
 */
export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

/**
 * Format title for destination
 */
export function formatTitleForDestination(
  destination: Destination,
  articleTitle: string
): string {
  if (destination.titleTemplate) {
    return destination.titleTemplate.replace('{title}', articleTitle);
  }
  return articleTitle;
}
