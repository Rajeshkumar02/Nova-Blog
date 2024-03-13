// "use client";

import { getAllPosts, getPostByPagination } from "@/api/getallpost";
import { MoreStories } from "../more-stories";
import Container from "../container";
import Link from "next/link";

export function Post() {
  const PAGE = 1;
  const PER_PAGE = 6;

  const posts = getPostByPagination(PAGE, PER_PAGE);

  return (
    <div>
      <Container>
        {posts.length > 0 && <MoreStories posts={posts} title="Recent post" />}
        <Link href={`?${PAGE}`}>All Posts</Link>
      </Container>
    </div>
  );
}
