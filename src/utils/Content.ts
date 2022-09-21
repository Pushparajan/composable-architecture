import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export type PostItems = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
  tags: string[];
  slug: string;
  [key: string]: string | string[];
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
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
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort(
      (post1, post2) =>
        new Date(post2.date).getTime() - new Date(post1.date).getTime()
    );
  return posts;
}

export function getCategoryCollection(fields: string[] = []) {
  const posts = getAllPosts(fields);
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
