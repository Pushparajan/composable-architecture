import React, { ReactNode, useEffect } from 'react';

import Link from 'next/link';

import { NewsletterForm } from '../components/NewsletterForm';
import { PostItems } from '../utils/Content';
import { convertToSlug } from '../utils/Url';
import { Base } from './Base';

type IMainProps = {
  meta: ReactNode;
  hero: ReactNode;
  recentPosts?: PostItems[];
  categoryCollection: [string, PostItems[]][];
  children: ReactNode;
  section?: string;
};

const RightSidebar = (props: IMainProps) => {
  useEffect(() => {
    // Load AddToAny script
    const script = document.createElement('script');
    script.src = 'https://static.addtoany.com/menu/page.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <Base meta={props.meta} hero={props.hero}>
      <div className="w-full bg-white">
        <div className="max-w-screen-xl py-8 md:py-12 mx-auto flex flex-wrap px-6">
          <main className="w-full lg:w-2/3 lg:pr-16">{props.children}</main>

          <aside className="w-full lg:w-1/3 mt-12 lg:mt-0 lg:border-l lg:border-gray-200 lg:pl-12">
            <div className="sticky top-8">
              {/* Share buttons */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="sidebar-title">Share</h3>
                <div
                  className="a2a_kit a2a_kit_size_32 a2a_default_style"
                  data-a2a-icon-color="transparent,#0070ad"
                >
                  <a className="a2a_button_facebook" />
                  <a className="a2a_button_x" />
                  <a className="a2a_button_linkedin" />
                  <a className="a2a_button_reddit" />
                  <a className="a2a_button_email" />
                  <a className="a2a_button_copy_link" />
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="newsletter-box mb-8">
                <h3 className="sidebar-title">Newsletter</h3>
                <p className="text-gray-600 mb-4">
                  Useful tips on composable architecture, delivered once a week.
                </p>
                <NewsletterForm layout="horizontal" />
              </div>

              {/* Recent posts */}
              {props.recentPosts && (
                <div className="sidebar-section mb-8">
                  <h3 className="sidebar-title">Recent Posts</h3>
                  <ul className="space-y-3">
                    {props.recentPosts.map((elt) => (
                      <li key={elt.slug}>
                        <Link
                          href={
                            props.section
                              ? '/[section]/posts/[slug]'
                              : '/posts/[slug]'
                          }
                          as={
                            props.section
                              ? `/${props.section}/posts/${elt.slug}`
                              : `/posts/${elt.slug}`
                          }
                        >
                          <a className="text-dark hover:text-accent transition-colors text-sm leading-snug block">
                            {elt.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Categories */}
              <div className="sidebar-section">
                <h3 className="sidebar-title">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {props.categoryCollection.map((elt) => (
                    <Link
                      key={elt[0]}
                      href={
                        props.section
                          ? '/[section]/category/[name]'
                          : '/category/[name]'
                      }
                      as={
                        props.section
                          ? `/${props.section}/category/${convertToSlug(
                              elt[0]
                            )}`
                          : `/category/${convertToSlug(elt[0])}`
                      }
                    >
                      <a className="text-sm text-gray-600 hover:text-accent transition-colors">
                        {elt[0]}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Base>
  );
};

export { RightSidebar };
