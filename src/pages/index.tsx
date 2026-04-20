import React from 'react';

import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Hero } from '../hero/Hero';
import { Meta } from '../layout/Meta';
import { SidebarBlock } from '../sidebar/SidebarBlock';
import { SidebarIconList } from '../sidebar/SidebarIconList';
import { Base } from '../templates/Base';
import { AppConfig } from '../utils/AppConfig';
import { getPostBySlug } from '../utils/Content';
import { markdownToHtml } from '../utils/Markdown';

type IIndexProps = {
  aboutContent: string;
  aboutTitle: string;
};

const Index = (props: IIndexProps) => (
  <Base
    meta={
      <Meta
        title="AI & Composable Architecture Hub"
        description="Expert insights on Applied AI, Machine Learning, Loyalty platforms, Marketing Technology, and Digital Transformation"
      />
    }
    hero={<Hero title={AppConfig.title} description={AppConfig.description} />}
  >
    <div className="w-full bg-gray-100">
      <div className="max-w-screen-xl py-16 mx-auto flex flex-wrap">
        <div className="w-full md:w-2/3 px-3">
          <h2 className="text-2xl font-bold mb-8">Explore Knowledge Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {AppConfig.sections.map((section) => (
              <Link key={section.slug} href={`/${section.slug}`}>
                <a className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {section.name}
                  </h3>
                  <p className="text-gray-600">{section.description}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 px-3 mt-8 md:mt-0">
          <SidebarBlock title={props.aboutTitle}>
            <>
              <div
                className="prose prose-sm"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: props.aboutContent }}
              />
              <Link href="/composablearchitecture/posts/AboutMe">
                <a className="inline-block mt-4 text-accent hover:underline font-medium">
                  Read More &rarr;
                </a>
              </Link>
              <SidebarIconList />
            </>
          </SidebarBlock>
        </div>
      </div>
    </div>
  </Base>
);

export const getStaticProps: GetStaticProps<IIndexProps> = async () => {
  const aboutPost = getPostBySlug(
    'AboutMe',
    ['title', 'content'],
    'composablearchitecture'
  );

  // Extract only the first section (Overview) for the blurb - roughly 10 lines
  let truncatedContent = '';
  if (aboutPost?.content) {
    const lines = aboutPost.content.split('\n');
    // Find the first horizontal rule and take content before it, limit to 10 lines
    const hrIndex = lines.findIndex((line) => line.trim() === '---');
    const contentLines = hrIndex > 0 ? lines.slice(0, hrIndex) : lines;
    truncatedContent = contentLines.slice(0, 10).join('\n');
  }

  const aboutContent = truncatedContent
    ? await markdownToHtml(truncatedContent)
    : '';

  return {
    props: {
      aboutContent,
      aboutTitle: aboutPost?.title || 'About Me',
    },
  };
};

export default Index;
