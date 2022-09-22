import React, { ReactNode } from 'react';

import Link from 'next/link';

import { Footer } from '../footer/Footer';
import { FooterBlocks } from '../footer/FooterBlocks';
import { FooterTwoColumns } from '../footer/FooterTwoColumns';
import { Navbar } from '../navigation/Navbar';

type IMainProps = {
  meta: ReactNode;
  hero: ReactNode;
  children: ReactNode;
};

const Base = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-800">
    {props.meta}

    <Navbar>
      <li>
        <Link href="/posts/AboutMe">
          <a>About Me</a>
        </Link>
      </li>
    </Navbar>

    {props.hero}

    {props.children}

    <Footer>
      <FooterTwoColumns
        block2={
          <FooterBlocks title="Links">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
          </FooterBlocks>
        }
        block3={
          <FooterBlocks title="Key Pages">
            <li>
              <Link href="/posts/AboutMe">
                <a>Profile</a>
              </Link>
            </li>
          </FooterBlocks>
        }
      ></FooterTwoColumns>
    </Footer>
  </div>
);

export { Base };
