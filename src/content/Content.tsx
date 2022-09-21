import React, { ReactNode } from 'react';

type IContentProps = {
  children: ReactNode;
};

const Content = (props: IContentProps) => (
  <div className="content">
    {props.children}

    <style jsx>
      {`
        .content {
          @apply tracking-wider leading-8 text-gray-800 text-xl;
        }

        .content :global(a) {
          @apply text-blue-600 no-underline;
        }

        .content :global(a:hover) {
          @apply border-b-2 border-blue-600;
        }

        .content :global(p) {
          @apply my-5;
        }

        .content :global(h1) {
          @apply text-5xl font-bold mt-12 mb-5 leading-10;
        }

        .content :global(h2) {
          @apply text-4xl font-bold mt-10 mb-5;
        }

        .content :global(h3) {
          @apply text-3xl font-bold mt-10 mb-5;
        }

        .content :global(h4) {
          @apply text-2xl font-bold mt-10 mb-5;
        }

        .content :global(h5) {
          @apply text-xl font-bold mt-10 mb-5;
        }

        .content :global(h6) {
          @apply text-lg font-bold mt-10 mb-5;
        }

        .content :global(ul),
        .content :global(ol),
        .content :global(p) {
          @apply overflow-auto;
        }

        .content :global(> div > ul),
        .content :global(> div > ol) {
          @apply my-6;
        }

        .content :global(ul),
        .content :global(ol) {
          @apply pl-8;
        }

        .content :global(ul) {
          @apply list-outside list-disc;
        }

        .content :global(ol) {
          @apply list-outside list-decimal;
        }

        .content :global(blockquote p) {
          @apply pl-4 py-2 border-l-4 border-blue-600 bg-gray-200;
        }

        .content :global(img) {
          @apply rounded-md;
        }

        .content :global(pre[class*='language-']) {
          @apply my-8;
        }

        .content :global(hr) {
          @apply my-8;
        }

        .content :global(table) {
          @apply whitespace-nowrap my-8 border-collapse block overflow-auto;
        }

        .content :global(th),
        .content :global(td) {
          @apply border px-8 py-4;
        }

        .content :global(th) {
          @apply bg-gray-200;
        }

        .content :global(th:not([align])) {
          @apply text-left;
        }
      `}
    </style>
  </div>
);

export { Content };
