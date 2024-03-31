import { defineConfig, s, defineCollection } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { transformerTwoslash } from "@shikijs/twoslash";

const computedFeilds = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      postid: s.number(),
      title: s.string().max(99),
      description: s.string(),
      date: s.isodate(),
      coverimage: s.string(),
      tags: s.array(s.string()),
      author: s.object({
        id: s.number(),
        name: s.string(),
        avatar: s.string(),
      }),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform(computedFeilds),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "dracula",
          keepBackground: false,
          transformers: [transformerTwoslash()],
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
