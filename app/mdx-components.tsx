import type { MDXComponents } from "mdx/types";
import "nextra-theme-blog/style.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
