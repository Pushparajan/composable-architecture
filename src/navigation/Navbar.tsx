import React, { ReactNode } from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';

type INavbarProps = {
  children: ReactNode;
};

const Navbar = (props: INavbarProps) => (
  <div className="w-full bg-gray-800">
    <div className="navbar max-w-screen-xl flex flex-wrap justify-between items-center py-4 px-3 mx-auto">
      <div className="font-extrabold text-xl flex items-center">
        <Link href="/">
          <a className="flex items-center">
            <img
              src="/assets/images/posts/favicon-32x32.png"
              alt={AppConfig.site_name}
              className="w-8 h-8 mr-2"
            />
            {AppConfig.site_name}
          </a>
        </Link>
      </div>

      <nav>
        <ul className="flex flex-wrap items-center font-extrabold">
          {props.children}
        </ul>
      </nav>
    </div>

    <style jsx>
      {`
        .navbar :global(li:not(:last-child)) {
          @apply mr-5;
        }

        .navbar :global(a) {
          @apply text-gray-100;
        }

        .navbar :global(a:hover) {
          @apply text-blue-600;
        }
      `}
    </style>
  </div>
);

export { Navbar };
