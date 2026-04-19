import React from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';

const Footer = () => (
  <div className="bg-gray-800">
    <footer className="max-w-screen-xl py-12 mx-auto text-white px-6">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h4 className="text-lg font-bold mb-4">{AppConfig.site_name}</h4>
          <p className="text-gray-400 text-sm">
            Expert insights on composable architecture, AI, and digital
            transformation.
          </p>
        </div>

        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {AppConfig.sections.slice(0, 4).map((section) => (
              <li key={section.slug}>
                <Link href={`/${section.slug}`}>
                  <a className="text-gray-400 hover:text-white text-sm transition-colors">
                    {section.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h4 className="text-lg font-bold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/pushparajan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/pushparajan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={`${AppConfig.url}/rss.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="RSS Feed"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-700">
        {`© Copyright ${new Date().getFullYear()} ${
          AppConfig.site_name
        }. All Rights Reserved.`}
      </div>
    </footer>
  </div>
);

export { Footer };
