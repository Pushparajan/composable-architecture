import React, { ReactNode } from 'react';

import Link from 'next/link';

import { SidebarBlock } from '../sidebar/SidebarBlock';
import { SidebarIconList } from '../sidebar/SidebarIconList';
import { PostItems } from '../utils/Content';
import { convertToSlug } from '../utils/Url';
import { Base } from './Base';

type IMainProps = {
  meta: ReactNode;
  hero: ReactNode;
  recentPosts?: PostItems[];
  categoryCollection: [string, PostItems[]][];
  children: ReactNode;
};

const RightSidebar = (props: IMainProps) => (
  <Base meta={props.meta} hero={props.hero}>
    <div className="w-full bg-gray-100">
      <div className="max-w-screen-xl py-16 mx-auto flex flex-wrap">
        <div className="w-full md:w-2/3 md:px-3">{props.children}</div>

        <div className="w-full md:w-1/3 px-3">
          <SidebarBlock title="About me">
            <>
              <div>
                <p>
                  Architect and Software Engineer, specialising in Marketing
                  technologies, Composable Commerce, Content Management systems,
                  Microservices, object-oriented analysis and design, patterns,
                  and agile software development methodologies
                </p>
              </div>

              <SidebarIconList />
            </>
          </SidebarBlock>

          {props.recentPosts && (
            <SidebarBlock title="Recent posts">
              <ul>
                {props.recentPosts.map((elt) => (
                  <li key={elt.slug} className="my-4">
                    <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
                      <a className="text-blue-600 hover:border-b-2 hover:border-blue-600">
                        {elt.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </SidebarBlock>
          )}

          <SidebarBlock title="Categories">
            <ul>
              {props.categoryCollection.map((elt) => (
                <li
                  key={elt[0]}
                  className="py-4 border-b border-gray-400 last:border-none"
                >
                  <Link
                    href="/category/[name]"
                    as={`/category/${convertToSlug(elt[0])}`}
                  >
                    <a className="flex justify-between hover:text-gray-600">
                      <div>{elt[0]}</div>

                      <div>{elt[1].length}</div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarBlock>
        </div>
      </div>
    </div>
  </Base>
);

export { RightSidebar };
