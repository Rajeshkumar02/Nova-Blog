"use client";

import { MDXProvider } from "@mdx-js/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return <MDXProvider>{children}</MDXProvider>;
}