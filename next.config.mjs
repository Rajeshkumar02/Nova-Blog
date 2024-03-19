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
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
});

export default withMDX(nextConfig);
