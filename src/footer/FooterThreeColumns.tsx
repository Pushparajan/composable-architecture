import React, { ReactNode } from 'react';

type IFooterThreeColumnsProps = {
  block2: ReactNode;
  block3: ReactNode;
  children: ReactNode;
};

const FooterThreeColumns = (props: IFooterThreeColumnsProps) => (
  <div className="flex flex-wrap justify-between">
    <div className="w-full sm:w-1/2 lg:w-1/3">{props.block2}</div>
    <div className="w-full sm:w-1/2 lg:w-1/3">{props.block3}</div>
    <div className="w-full lg:w-1/3">{props.children}</div>
  </div>
);

export { FooterThreeColumns };
