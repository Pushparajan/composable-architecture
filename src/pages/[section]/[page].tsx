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
  PostItems,
  getCategoryCollection,
} from '../../utils/Content';
import { convertTo2D } from '../../utils/Pagination';

type IPageUrl = {
  section: string;
  page: string;
};

type IPaginatePostsProps = {
  section: SectionConfig;
  pageNumber: number;
  gallery: IBlogGalleryProps;
  categoryCollection: [string, PostItems[]][];
};

const PaginatePosts = (props: IPaginatePostsProps) => (
  <RightSidebar
    meta={
      <Meta
        title={`${props.section.title} | Page ${props.pageNumber}`}
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

export const getStaticPaths: GetStaticPaths<IPageUrl> = async () => {
  const paths: { params: IPageUrl }[] = [];

  AppConfig.sections.forEach((section) => {
    const posts = getAllPosts(['slug'], section.slug);
    const pages = convertTo2D(posts, AppConfig.pagination_size);

    pages.slice(1).forEach((_, ind) => {
      paths.push({
        params: {
          section: section.slug,
          page: `page${ind + 2}`,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IPaginatePostsProps,
  IPageUrl
> = async ({ params }) => {
  const section = AppConfig.getSectionBySlug(params!.section);

  if (!section) {
    return { notFound: true };
  }

  const posts = getAllPosts(AppConfig.post_fields, section.slug);
  const pages = convertTo2D(posts, AppConfig.pagination_size);
  const currentPage = Number(params!.page.replace('page', ''));
  const currentInd = currentPage - 1;

  const pagination: IPaginationProps = {};

  if (currentPage < pages.length) {
    pagination.next = `/${section.slug}/page${currentPage + 1}`;
  }

  if (currentPage === 2) {
    pagination.prev = `/${section.slug}`;
  } else if (currentPage > 2) {
    pagination.prev = `/${section.slug}/page${currentPage - 1}`;
  }

  return {
    props: {
      section,
      pageNumber: currentPage,
      gallery: {
        posts: pages[currentInd] || [],
        pagination,
      },
      categoryCollection: getCategoryCollection(['slug', 'tags'], section.slug),
    },
  };
};

export default PaginatePosts;
