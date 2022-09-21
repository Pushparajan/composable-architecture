import React from 'react';

import Link from 'next/link';

import { convertUrlToLinkHref } from '../utils/Pagination';

export type IPaginationProps = {
  previous?: string;
  next?: string;
};

const Pagination = (props: IPaginationProps) => (
  <div className="pt-8 flex justify-center">
    {props.previous && (
      <div className="mx-3">
        <Link href={convertUrlToLinkHref(props.previous)} as={props.previous}>
          <a>← Newer Posts</a>
        </Link>
      </div>
    )}

    {props.next && (
      <div className="mx-3">
        <Link href={convertUrlToLinkHref(props.next)} as={props.next}>
          <a>Older Posts →</a>
        </Link>
      </div>
    )}

    <style jsx>
      {`
        a {
          @apply text-blue-600;
        }

        a:hover {
          @apply border-b-2 border-blue-600;
        }
      `}
    </style>
  </div>
);

export { Pagination };
