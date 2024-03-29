import { posts } from "#site/content";
import { Pagination } from "@/components/pagination";
import PostCard from "@/components/post-card";
import { sortPosts } from "@/lib/utils";

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: {
    page?: string;
    tag?: string;
  };
}

export default function Home({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(
    posts.filter(
      (post) =>
        post.published &&
        ((searchParams?.tag && post.tags?.includes(searchParams.tag)) ||
          !searchParams.tag)
    )
  );
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );
  return (
    <div className=" mx-4 md:container">
      <PostCard title="Recent Posts" post={displayPosts} />

      <Pagination totalPages={totalPages} className="justify-end mt-4 my-4" />
    </div>
  );
}
