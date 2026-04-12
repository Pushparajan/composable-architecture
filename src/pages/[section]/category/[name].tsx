import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../../../blog/BlogGallery';
import { Hero } from '../../../hero/Hero';
import { Meta } from '../../../layout/Meta';
import { RightSidebar } from '../../../templates/RightSidebar';
import { AppConfig, SectionConfig } from '../../../utils/AppConfig';
import { getCategoryCollection, PostItems } from '../../../utils/Content';
import { convertToSlug } from '../../../utils/Url';

type ICategoryUrl = {
  section: string;
  name: string;
};

type IDisplayPostProps = {
  section: SectionConfig;
  categoryName: string;
  gallery: IBlogGalleryProps;
  categoryCollection: [string, PostItems[]][];
};

const DisplayPost = (props: IDisplayPostProps) => (
  <RightSidebar
    meta={
      <Meta
        title={`Category ${props.categoryName} | ${props.section.name}`}
        description={props.section.description}
      />
    }
    hero={
      <Hero
        title={`Category ${props.categoryName}`}
        description={`${props.categoryName} in ${props.section.name}`}
      />
    }
    categoryCollection={props.categoryCollection}
    section={props.section.slug}
  >
    <BlogGallery posts={props.gallery.posts} section={props.section.slug} />
  </RightSidebar>
);

export const getStaticPaths: GetStaticPaths<ICategoryUrl> = async () => {
  const paths: { params: ICategoryUrl }[] = [];

  AppConfig.sections.forEach((section) => {
    const categoryCollection = getCategoryCollection(
      ['slug', 'tags'],
      section.slug
    );
    categoryCollection.forEach((category) => {
      paths.push({
        params: {
          section: section.slug,
          name: convertToSlug(category[0]),
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
  IDisplayPostProps,
  ICategoryUrl
> = async ({ params }) => {
  const section = AppConfig.getSectionBySlug(params!.section);

  if (!section) {
    return { notFound: true };
  }

  const categoryCollection = getCategoryCollection(
    ['slug', 'title', 'description', 'image', 'date', 'tags'],
    section.slug
  );

  const category = categoryCollection.find(
    (elt) => params!.name === convertToSlug(elt[0])
  );

  if (category) {
    return {
      props: {
        section,
        categoryName: category[0],
        gallery: {
          posts: category[1],
        },
        categoryCollection: getCategoryCollection(
          ['slug', 'tags'],
          section.slug
        ),
      },
    };
  }

  return { notFound: true };
};

export default DisplayPost;
