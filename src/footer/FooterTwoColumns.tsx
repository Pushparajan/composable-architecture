import React, { ReactNode } from 'react';

type IFooterTwoColumnsProps = {
  block2: ReactNode;
  block3: ReactNode;
};

const FooterTwoColumns = (props: IFooterTwoColumnsProps) => (
  <div className="flex flex-wrap justify-between">
    <div className="w-full sm:w-1/2 lg:w-1/2">{props.block2}</div>
    <div className="w-full sm:w-1/2 lg:w-1/2">{props.block3}</div>
  </div>
);

export { FooterTwoColumns };
