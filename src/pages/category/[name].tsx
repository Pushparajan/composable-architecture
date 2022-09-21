import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../../blog/BlogGallery';
import { Hero } from '../../hero/Hero';
import { Meta } from '../../layout/Meta';
import { RightSidebar } from '../../templates/RightSidebar';
import { AppConfig } from '../../utils/AppConfig';
import { getCategoryCollection, PostItems } from '../../utils/Content';
import { convertToSlug } from '../../utils/Url';

type ICategoryUrl = {
  name: string;
};

type IDisplayPostProps = {
  categoryName: string;
  gallery: IBlogGalleryProps;
  categoryCollection: [string, PostItems[]][];
};

const DisplayPost = (props: IDisplayPostProps) => (
  <RightSidebar
    meta={
      <Meta
        title={`Category ${props.categoryName}`}
        description={AppConfig.description}
      />
    }
    hero={
      <Hero
        title={`Category ${props.categoryName}`}
        description={`${props.categoryName} ${AppConfig.description}`}
      />
    }
    categoryCollection={props.categoryCollection}
  >
    <BlogGallery posts={props.gallery.posts} />
  </RightSidebar>
);

export const getStaticPaths: GetStaticPaths<ICategoryUrl> = async () => {
  const categoryCollection = getCategoryCollection(['slug', 'tags']);

  return {
    paths: categoryCollection.map((category) => ({
      params: {
        name: convertToSlug(category[0]),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  IDisplayPostProps,
  ICategoryUrl
> = async ({ params }) => {
  const categoryCollection = getCategoryCollection([
    'slug',
    'title',
    'description',
    'image',
    'date',
    'tags',
  ]);

  const category = categoryCollection.find(
    (elt) => params!.name === convertToSlug(elt[0])
  );

  if (category) {
    return {
      props: {
        categoryName: category[0],
        gallery: {
          posts: category[1],
        },
        categoryCollection: getCategoryCollection(['slug', 'tags']),
      },
    };
  }

  throw new Error('It should not happens the url is not correct in [name].tsx');
};

export default DisplayPost;
