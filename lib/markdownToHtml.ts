import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerNotationDiff } from "shikiji-transformers";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    //@ts-ignore
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "dracula",
      keepBackground: false,
      transformers: [transformerNotationDiff()],
      filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
