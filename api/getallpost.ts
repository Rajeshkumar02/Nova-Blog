import { Post } from "@/interface/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(tag?: string): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => !tag || post.tags.includes(tag))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function searchPosts(searchQuery?: string): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => {
      if (searchQuery) {
        const regex = new RegExp(searchQuery, "i");
        return (
          regex.test(post.title) ||
          regex.test(post.content) ||
          regex.test(post.excerpt)
        );
      }
      return false;
    })
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
