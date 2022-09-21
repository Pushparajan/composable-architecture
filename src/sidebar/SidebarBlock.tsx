import React, { ReactNode } from 'react';

type ISidebarBlock = {
  title: string;
  children: ReactNode;
};

const SidebarBlock = (props: ISidebarBlock) => (
  <div className="sidebar-block bg-white shadow p-6 my-10 lg:p-8 md:first:mt-0">
    <div className="text-lg">{props.title}</div>

    <div className="mt-4">{props.children}</div>

    <style jsx>
      {`
        .sidebar-block {
          @apply leading-7;
        }
      `}
    </style>
  </div>
);

export { SidebarBlock };
