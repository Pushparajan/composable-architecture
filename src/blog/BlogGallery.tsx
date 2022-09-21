import React from 'react';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';
import { BlogCard } from './BlogCard';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination?: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <div className="grid grid-cols-1 gap-y-6 gap-x-3 sm:grid-cols-2">
      {props.posts.map((elt) => (
        <BlogCard
          key={elt.slug}
          title={elt.title}
          description={elt.description}
          date={elt.date}
          image={elt.image}
          slug={elt.slug}
          tags={elt.tags}
        />
      ))}
    </div>

    {props.pagination && (
      <Pagination
        previous={props.pagination.previous}
        next={props.pagination.next}
      />
    )}
  </>
);

export { BlogGallery };
