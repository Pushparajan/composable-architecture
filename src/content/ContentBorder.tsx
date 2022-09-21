import React, { ReactNode } from 'react';

type IContentBorderProps = {
  children: ReactNode;
};

const ContentBorder = (props: IContentBorderProps) => (
  <div className="bg-white shadow px-4 py-3 sm:px-6 lg:px-12">
    {props.children}
  </div>
);

export { ContentBorder };
