import React from 'react';

import Link from 'next/link';

import { convertUrlToLinkHref } from '../utils/Pagination';

export type IPaginationProps = {
  previous?: string;
  next?: string;
  prev?: string;
  section?: string;
};

const Pagination = (props: IPaginationProps) => {
  const previous = props.previous || props.prev;

  return (
    <div className="pt-8 flex justify-center">
      {previous && (
        <div className="mx-3">
          <Link
            href={convertUrlToLinkHref(previous, props.section)}
            as={previous}
          >
            <a>← Newer Posts</a>
          </Link>
        </div>
      )}

      {props.next && (
        <div className="mx-3">
          <Link
            href={convertUrlToLinkHref(props.next, props.section)}
            as={props.next}
          >
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
};

export { Pagination };
