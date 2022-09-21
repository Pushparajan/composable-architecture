import React, { ReactNode } from 'react';

import { AppConfig } from '../utils/AppConfig';

type IFooterProps = {
  children: ReactNode;
};

const Footer = (props: IFooterProps) => (
  <div className="bg-gray-800">
    <footer className="max-w-screen-xl py-12 mx-auto text-white">
      {props.children}

      <div className="text-center text-gray-500 text-sm mt-12 px-5">
        {`© Copyright ${new Date().getFullYear()} ${
          AppConfig.site_name
        }. All Rights Reserved.`}
      </div>
    </footer>
  </div>
);

export { Footer };
