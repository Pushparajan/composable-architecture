import React from 'react';

import { GetStaticProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../blog/BlogGallery';
import { Hero } from '../hero/Hero';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { RightSidebar } from '../templates/RightSidebar';
import { AppConfig } from '../utils/AppConfig';
import {
  getAllPosts,
  getCategoryCollection,
  PostItems,
} from '../utils/Content';

type IIndexProps = {
  gallery: IBlogGalleryProps;
  categoryCollection: [string, PostItems[]][];
};

const Index = (props: IIndexProps) => (
  <RightSidebar
    meta={<Meta title={AppConfig.title} description={AppConfig.description} />}
    hero={<Hero title={AppConfig.title} description={AppConfig.description} />}
    categoryCollection={props.categoryCollection}
  >
    <BlogGallery
      posts={props.gallery.posts}
      pagination={props.gallery.pagination}
    />
  </RightSidebar>
);

export const getStaticProps: GetStaticProps<IIndexProps> = async () => {
  const posts = getAllPosts(AppConfig.post_fields);
  const pagination: IPaginationProps = {};

  if (posts.length > AppConfig.pagination_size) {
    pagination.next = '/page2';
  }

  return {
    props: {
      gallery: {
        posts: posts.slice(0, AppConfig.pagination_size),
        pagination,
      },
      categoryCollection: getCategoryCollection(['slug', 'tags']),
    },
  };
};

export default Index;
