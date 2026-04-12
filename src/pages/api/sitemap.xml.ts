/**
 * Sitemap.xml API route
 * Generates dynamic XML sitemap for search engine discovery
 */

import type { NextApiRequest, NextApiResponse } from 'next';

import { generateSitemap } from '../../utils/publishing/feeds';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(sitemap);
}
