import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const WEBSITE_URL = "https://nova-blog-tech.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  // Path to the directory containing your MDX files
  const blogDirectory = path.join(process.cwd(), "content/blog"); // your blog directory maybe different

  // Retrieve all MDX file paths recursively
  const mdxFilePaths = getAllMdxFilePaths(blogDirectory);

  // Generate URLs and add them to the sitemap
  const sitemap = mdxFilePaths.map((filePath) => {
    const slug = path.basename(filePath, ".mdx"); // remove the .mdx extension from the file name to get the slug
    const category = path.basename(path.dirname(filePath));
    const url = `${WEBSITE_URL}/${category}/${slug}`;
    const lastModified = fs.statSync(filePath).mtime;
    return {
      url,
      lastModified,
    };
  });

  // Add other URLs to the sitemap
  sitemap.push({
    url: WEBSITE_URL,
    lastModified: new Date(),
  });

  return sitemap;
}

// Recursively retrieve all MDX file paths
function getAllMdxFilePaths(directory: string): string[] {
  const fileNames = fs.readdirSync(directory);
  const filePaths = fileNames.map((fileName) => {
    const filePath = path.join(directory, fileName);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      return getAllMdxFilePaths(filePath);
    } else {
      return filePath;
    }
  });

  return Array.prototype.concat(...filePaths);
}
