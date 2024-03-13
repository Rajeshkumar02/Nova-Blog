// const nextConfig = {
//   images: {
//     domains: ["localhost", "imgs.search.brave.com"],
//   },
// };

// module.exports = nextConfig;

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["localhost", "imgs.search.brave.com"],
  },
});
