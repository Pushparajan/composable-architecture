import React, { ReactNode } from 'react';

import Link from 'next/link';

import { Footer } from '../footer/Footer';
import { Navbar } from '../navigation/Navbar';
import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  hero: ReactNode;
  children: ReactNode;
};

const Base = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-800">
    {props.meta}

    <Navbar>
      {AppConfig.sections.map((section) => (
        <li key={section.slug}>
          <Link href={`/${section.slug}`}>
            <a>{section.name}</a>
          </Link>
        </li>
      ))}
    </Navbar>

    {props.hero}

    {props.children}

    <Footer />
  </div>
);

export { Base };
