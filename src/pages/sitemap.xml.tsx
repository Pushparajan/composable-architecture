/**
 * Sitemap.xml page
 * Generates dynamic XML sitemap for search engine discovery
 */

import type { GetServerSideProps } from 'next';

import { generateSitemap } from '../utils/publishing/feeds';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function Sitemap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
