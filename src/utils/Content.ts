import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { AppConfig } from './AppConfig';

export type PostItems = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
  tags: string[];
  slug: string;
  section?: string;
  [key: string]: string | string[] | undefined;
};

function getPostsDirectory(section?: string): string {
  if (section) {
    const sectionConfig = AppConfig.getSectionBySlug(section);
    if (sectionConfig) {
      return join(process.cwd(), sectionConfig.contentDir);
    }
  }
  // Fallback to first section (composablearchitecture)
  return join(process.cwd(), AppConfig.sections[0].contentDir);
}

export function getPostSlugs(section?: string) {
  const dir = getPostsDirectory(section);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md'));
}

export function getPostBySlug(
  slug: string,
  fields: string[] = [],
  section?: string
) {
  const realSlug = slug.replace(/\.md$/, '');
  const postsDirectory = getPostsDirectory(section);
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items: PostItems = {
    title: '',
    description: '',
    date: '',
    modified_date: '',
    image: '',
    content: '',
    tags: [],
    slug: '',
    section,
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'section' && section) {
      items[field] = section;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = [], section?: string) {
  const slugs = getPostSlugs(section);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, section))
    .filter((post): post is PostItems => post !== null)
    // sort posts by date in descending order
    .sort(
      (post1, post2) =>
        new Date(post2.date).getTime() - new Date(post1.date).getTime()
    );
  return posts;
}

export function getCategoryCollection(fields: string[] = [], section?: string) {
  const posts = getAllPosts(fields, section);
  const categoryCollection = new Map<string, PostItems[]>();

  posts.forEach((item) => {
    if (!item.tags) {
      return;
    }

    item.tags.forEach((tag) => {
      if (!categoryCollection.get(tag)) {
        categoryCollection.set(tag, []);
      }

      categoryCollection.get(tag)!.push(item);
    });
  });

  return [...categoryCollection.entries()].sort(
    (a, b) => b[1].length - a[1].length
  );
}

export function getAllSections() {
  return AppConfig.sections;
}
