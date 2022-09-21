import React, { ReactNode } from 'react';

import Link from 'next/link';

import { Footer } from '../footer/Footer';
import { FooterBlocks } from '../footer/FooterBlocks';
import { FooterIconList } from '../footer/FooterIconList';
import { FooterThreeColumns } from '../footer/FooterThreeColumns';
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
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Projects</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>About</a>
        </Link>
      </li>
    </Navbar>

    {props.hero}

    {props.children}

    <Footer>
      <FooterThreeColumns
        block2={
          <FooterBlocks title="Section title">
            <li>
              <Link href="/">
                <a>Lorem ipsum 1</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Lorem ipsum 2</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Lorem ipsum 3</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Lorem ipsum 4</a>
              </Link>
            </li>
          </FooterBlocks>
        }
        block3={
          <FooterBlocks title="Section title">
            <li>
              <Link href="/">
                <a>Lorem ipsum 1</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Lorem ipsum 2</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Lorem ipsum 3</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Lorem ipsum 4</a>
              </Link>
            </li>
          </FooterBlocks>
        }
      >
        <FooterBlocks title="About me">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo fugiat
            molestias maiores, ab excepturi harum debitis blanditiis modi vel.
          </div>

          <FooterIconList />
        </FooterBlocks>
      </FooterThreeColumns>
    </Footer>
  </div>
);

export { Base };
