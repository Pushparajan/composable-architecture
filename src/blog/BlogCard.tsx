import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

type IBlogCardProps = {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  tags: string[];
};

const BlogCard = (props: IBlogCardProps) => (
  <div className="max-w-sm rounded-lg overflow-hidden bg-white shadow-sm mx-auto transform hover:shadow-xl hover:-translate-y-1">
    <Link href="/posts/[slug]" as={`/posts/${props.slug}`}>
      <a className="flex flex-col h-full">
        <img
          className="w-full"
          src={props.image}
          alt={`Preview ${props.title}`}
        />

        <div className="px-6 py-4 flex-grow">
          <h3 className="font-bold text-xl text-gray-800">{props.title}</h3>
          <p className="text-gray-500 text-xs mb-2">
            {format(new Date(props.date), 'LLL d, yyyy')}
          </p>
          <p className="text-gray-700">{props.description}</p>
        </div>

        <div className="px-6 py-4 flex flex-wrap">
          {props.tags.map((tag) => (
            <div
              key={tag}
              className="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {`#${tag}`}
            </div>
          ))}
        </div>
      </a>
    </Link>

    <style jsx>
      {`
        a:focus {
          outline-offset: -1px;
        }
      `}
    </style>
  </div>
);

export { BlogCard };
