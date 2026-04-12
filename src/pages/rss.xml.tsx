/**
 * RSS.xml page
 * Generates RSS 2.0 feed for content syndication
 */

import type { GetServerSideProps } from 'next';

import { generateRSS } from '../utils/publishing/feeds';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function RSS() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const rss = generateRSS(50);

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.write(rss);
  res.end();

  return {
    props: {},
  };
};

export default RSS;
