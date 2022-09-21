import React, { ReactNode } from 'react';

type IFooterBlockProps = {
  title: string;
  children: ReactNode;
};

const FooterBlocks = (props: IFooterBlockProps) => (
  <div className="footer-blocks p-5">
    <div className="text-gray-500">{props.title}</div>
    <ul className="mt-3">{props.children}</ul>

    <style jsx>
      {`
        .footer-blocks :global(li) {
          @apply mb-1;
        }
      `}
    </style>
  </div>
);

export { FooterBlocks };
