import { posts } from "@/.velite";
import PostPreview from "./post-preview";

export default function PostCard({
  title,
  post,
}: {
  title: string;
  post: typeof posts;
}) {
  return (
    <section>
      <div className=" flex items-center mb-8 justify-between">
        <p className=" text-2xl font-bold tracking-tighter  leading-tight">
          <span className=" text-primary">{title?.slice(0, 1)}</span>
          <span>{title?.slice(1)}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-16 mb-16">
        {post.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverimage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            description={post.description}
          />
        ))}
      </div>
    </section>
  );
}
