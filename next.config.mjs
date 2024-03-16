import remarkGfm from "remark-gfm";
import nextMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["drive.google.com", "imgs.search.brave.com", "lh3.google.com"],
  },
};

const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkRehype],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
