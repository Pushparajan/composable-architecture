import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../blog/BlogGallery';
import { Hero } from '../hero/Hero';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { RightSidebar } from '../templates/RightSidebar';
import { AppConfig } from '../utils/AppConfig';
import {
  getAllPosts,
  PostItems,
  getCategoryCollection,
} from '../utils/Content';
import { convertTo2D } from '../utils/Pagination';

type IPageUrl = {
  page: string;
};

type IPaginatePostsProps = {
  pageNumber: number;
  gallery: IBlogGalleryProps;
  categoryCollection: [string, PostItems[]][];
};

const PaginatePosts = (props: IPaginatePostsProps) => (
  <RightSidebar
    meta={
      <Meta
        title={`${AppConfig.title} | Page ${props.pageNumber}`}
        description={AppConfig.description}
      />
    }
    hero={<Hero title={AppConfig.title} description={AppConfig.description} />}
    categoryCollection={props.categoryCollection}
  >
    <BlogGallery
      posts={props.gallery.posts}
      pagination={props.gallery.pagination}
    />
  </RightSidebar>
);

export const getStaticPaths: GetStaticPaths<IPageUrl> = async () => {
  const posts = getAllPosts(['slug']);

  const pages = convertTo2D(posts, AppConfig.pagination_size);

  return {
    paths: pages.slice(1).map((_, ind) => ({
      params: {
        // Ind starts from zero so we need to do ind + 1
        // slice(1) removes the first page so we do another ind + 1
        // the first page is implemented in index.tsx
        page: `page${ind + 2}`,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IPaginatePostsProps,
  IPageUrl
> = async ({ params }) => {
  const posts = getAllPosts(AppConfig.post_fields);

  const pages = convertTo2D(posts, AppConfig.pagination_size);
  const currentPage = Number(params!.page.replace('page', ''));
  const currentInd = currentPage - 1;

  const pagination: IPaginationProps = {};

  if (currentPage < pages.length) {
    pagination.next = `page${currentPage + 1}`;
  }

  if (currentPage === 2) {
    pagination.previous = '/';
  } else {
    pagination.previous = `page${currentPage - 1}`;
  }

  return {
    props: {
      pageNumber: currentPage,
      gallery: {
        posts: pages[currentInd],
        pagination,
      },
      categoryCollection: getCategoryCollection(['slug', 'tags']),
    },
  };
};

export default PaginatePosts;
