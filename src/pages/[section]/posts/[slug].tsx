import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ImageModal } from '../../../components/ImageModal';
import { Content } from '../../../content/Content';
import { ContentBorder } from '../../../content/ContentBorder';
import { Hero } from '../../../hero/Hero';
import { Meta } from '../../../layout/Meta';
import { RightSidebar } from '../../../templates/RightSidebar';
import { AppConfig, SectionConfig } from '../../../utils/AppConfig';
import {
  getAllPosts,
  getPostBySlug,
  PostItems,
  getCategoryCollection,
} from '../../../utils/Content';
import { markdownToHtml } from '../../../utils/Markdown';

type IPostUrl = {
  section: string;
  slug: string;
};

type IPostProps = {
  section: SectionConfig;
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
  recentPosts: PostItems[];
  categoryCollection: [string, PostItems[]][];
};

const DisplayPost = (props: IPostProps) => {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    // Load mermaid from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      const { mermaid } = window;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
      });

      // Find all mermaid code blocks and render them
      const codeBlocks = document.querySelectorAll('code.language-mermaid');
      codeBlocks.forEach(async (block, index) => {
        const pre = block.parentElement;
        if (!pre) return;

        const code = block.textContent || '';
        const id = `mermaid-${index}`;

        try {
          const { svg } = await mermaid.render(id, code);
          const wrapper = document.createElement('div');
          wrapper.className = 'mermaid-diagram';
          wrapper.innerHTML = svg;
          pre.replaceWith(wrapper);
        } catch (e) {
          // Keep original code block if rendering fails
          // eslint-disable-next-line no-console
          console.error('Mermaid rendering failed:', e);
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [props.content]);

  // Make content images clickable for modal
  useEffect(() => {
    const contentDiv = document.querySelector('.content');
    if (!contentDiv) return undefined;

    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLImageElement;
      if (target.tagName === 'IMG') {
        setModalImage({
          src: target.src,
          alt: target.alt || props.title,
        });
      }
    };

    contentDiv.addEventListener('click', handleImageClick);

    // Add cursor pointer to all images
    const images = contentDiv.querySelectorAll('img');
    images.forEach((img) => {
      // eslint-disable-next-line no-param-reassign
      img.style.cursor = 'pointer';
    });

    return () => {
      contentDiv.removeEventListener('click', handleImageClick);
    };
  }, [props.content, props.title]);

  return (
    <RightSidebar
      meta={
        <Meta
          title={props.title}
          description={props.description}
          post={{
            image: props.image,
            date: props.date,
            modified_date: props.modified_date,
          }}
        />
      }
      hero={
        <Hero
          title={props.title}
          description={`By ${AppConfig.author} · ${format(
            new Date(props.date),
            'LLLL d, yyyy'
          )}`}
        />
      }
      recentPosts={props.recentPosts}
      categoryCollection={props.categoryCollection}
      section={props.section.slug}
    >
      <ContentBorder>
        {/* Main article image */}
        {props.image && (
          <button
            type="button"
            onClick={() =>
              setModalImage({ src: props.image, alt: props.title })
            }
            className="w-full mb-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent rounded-lg overflow-hidden"
          >
            <img
              src={props.image}
              alt={props.title}
              className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
          </button>
        )}
        <Content>
          <div
            className="content"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        </Content>
      </ContentBorder>

      {/* Image modal */}
      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          onClose={() => setModalImage(null)}
        />
      )}
    </RightSidebar>
  );
};

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const paths: { params: IPostUrl }[] = [];

  AppConfig.sections.forEach((section) => {
    const posts = getAllPosts(['slug'], section.slug);
    posts.forEach((post) => {
      paths.push({
        params: {
          section: section.slug,
          slug: post.slug,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const section = AppConfig.getSectionBySlug(params!.section);

  if (!section) {
    return { notFound: true };
  }

  const post = getPostBySlug(
    params!.slug,
    [
      'title',
      'description',
      'date',
      'modified_date',
      'image',
      'content',
      'slug',
    ],
    section.slug
  );

  if (!post) {
    return { notFound: true };
  }

  const content = await markdownToHtml(post.content || '');
  const recentPosts = getAllPosts(
    ['slug', 'title', 'date'],
    section.slug
  ).slice(0, 5);

  return {
    props: {
      section,
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date,
      image: post.image,
      content,
      recentPosts,
      categoryCollection: getCategoryCollection(['slug', 'tags'], section.slug),
    },
  };
};

export default DisplayPost;
