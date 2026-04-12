import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../../blog/BlogGallery';
import { Hero } from '../../hero/Hero';
import { Meta } from '../../layout/Meta';
import { IPaginationProps } from '../../pagination/Pagination';
import { RightSidebar } from '../../templates/RightSidebar';
import { AppConfig, SectionConfig } from '../../utils/AppConfig';
import {
  getAllPosts,
  getCategoryCollection,
  PostItems,
} from '../../utils/Content';

type ISectionUrl = {
  section: string;
};

type ISectionProps = {
  section: SectionConfig;
  gallery: IBlogGalleryProps;
  categoryCollection: [string, PostItems[]][];
};

const SectionIndex = (props: ISectionProps) => (
  <RightSidebar
    meta={
      <Meta
        title={props.section.title}
        description={props.section.description}
      />
    }
    hero={
      <Hero
        title={props.section.title}
        description={props.section.description}
      />
    }
    categoryCollection={props.categoryCollection}
    section={props.section.slug}
  >
    <BlogGallery
      posts={props.gallery.posts}
      pagination={props.gallery.pagination}
      section={props.section.slug}
    />
  </RightSidebar>
);

export const getStaticPaths: GetStaticPaths<ISectionUrl> = async () => {
  return {
    paths: AppConfig.sections.map((section) => ({
      params: {
        section: section.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ISectionProps,
  ISectionUrl
> = async ({ params }) => {
  const section = AppConfig.getSectionBySlug(params!.section);

  if (!section) {
    return { notFound: true };
  }

  const posts = getAllPosts(AppConfig.post_fields, section.slug);
  const pagination: IPaginationProps = {};

  if (posts.length > AppConfig.pagination_size) {
    pagination.next = `/${section.slug}/page2`;
  }

  return {
    props: {
      section,
      gallery: {
        posts: posts.slice(0, AppConfig.pagination_size),
        pagination,
      },
      categoryCollection: getCategoryCollection(['slug', 'tags'], section.slug),
    },
  };
};

export default SectionIndex;
