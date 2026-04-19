import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { AppConfig } from '../utils/AppConfig';
import { addTrailingSlash } from '../utils/Url';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  post?: {
    image: string;
    date: string;
    modified_date: string;
  };
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const canonicalUrl =
    props.canonical || `${AppConfig.url}${addTrailingSlash(router.asPath)}`;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="google-site-verification"
          content="mAdK8Y8a9YkxU1cF-TfFsOHOAnetXYgF-t-SGys8Udc"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <meta
          name="keywords"
          content={AppConfig.keywords.join(', ')}
          key="keywords"
        />
        <meta name="robots" content="index, follow" key="robots" />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/assets/images/posts/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/assets/images/posts/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/assets/images/posts/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/assets/images/posts/favicon.ico`}
          key="favicon"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${AppConfig.site_name} RSS Feed`}
          href={`${AppConfig.url}/rss.xml`}
          key="rss"
        />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <title>{`${props.title} | ${AppConfig.site_name}`}</title>
        <meta
          name="description"
          content={
            props.description ? props.description : AppConfig.description
          }
          key="description"
        />
        <meta name="author" content={AppConfig.author} key="author" />

        {/* Twitter Card Meta Tags */}
        <meta
          name="twitter:card"
          content={props.post ? 'summary_large_image' : 'summary'}
          key="twitter:card"
        />
        <meta
          name="twitter:site"
          content={AppConfig.twitterHandle}
          key="twitter:site"
        />
        <meta
          name="twitter:creator"
          content={AppConfig.twitterHandle}
          key="twitter:creator"
        />
        <meta
          name="twitter:title"
          content={`${props.title} | ${AppConfig.title}`}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content={
            props.description ? props.description : AppConfig.description
          }
          key="twitter:description"
        />
        {props.post && (
          <meta
            name="twitter:image"
            content={`${AppConfig.url}${router.basePath}${props.post.image}`}
            key="twitter:image"
          />
        )}

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={`${props.title} | ${AppConfig.title}`}
          key="og:title"
        />
        <meta
          property="og:description"
          content={
            props.description ? props.description : AppConfig.description
          }
          key="og:description"
        />
        <meta property="og:locale" content={AppConfig.locale} key="og:locale" />
        <meta
          property="og:site_name"
          content={AppConfig.site_name}
          key="og:site_name"
        />
        <meta property="og:url" content={canonicalUrl} key="og:url" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: AppConfig.site_name,
              url: AppConfig.url,
              logo: `${AppConfig.url}/assets/images/logo.png`,
              sameAs: [
                'https://twitter.com/pushparajan',
                'https://www.linkedin.com/in/pushparajan/',
              ],
            }),
          }}
          key="org-schema"
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: AppConfig.site_name,
              url: AppConfig.url,
              description: AppConfig.description,
              author: {
                '@type': 'Person',
                name: AppConfig.author,
              },
            }),
          }}
          key="website-schema"
        />

        {props.post && (
          <>
            <meta property="og:type" content="article" key="og:type" />
            <meta
              property="og:image"
              content={`${AppConfig.url}${router.basePath}${props.post.image}`}
              key="og:image"
            />
            <meta
              property="article:published_time"
              content={new Date(props.post.date).toISOString()}
              key="article:published_time"
            />
            <meta
              property="article:modified_time"
              content={new Date(props.post.modified_date).toISOString()}
              key="article:modified_time"
            />
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: `${props.title} | ${AppConfig.title}`,
                  description: props.description || AppConfig.description,
                  image: [
                    `${AppConfig.url}${router.basePath}${props.post.image}`,
                  ],
                  datePublished: new Date(props.post.date).toISOString(),
                  dateModified: new Date(
                    props.post.modified_date
                  ).toISOString(),
                  author: {
                    '@type': 'Person',
                    name: AppConfig.author,
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: AppConfig.site_name,
                    logo: {
                      '@type': 'ImageObject',
                      url: `${AppConfig.url}${router.basePath}/assets/images/logo.png`,
                    },
                  },
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': canonicalUrl,
                  },
                  url: canonicalUrl,
                }),
              }}
              key="ldjson"
            />
          </>
        )}
      </Head>
    </>
  );
};

export { Meta };
