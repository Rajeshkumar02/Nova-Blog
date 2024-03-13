import { Post } from "@/interface/post";
import { PostPreview } from "../post-preview";

type Props = {
  posts: Post[];
  title?: string;
  more?: any;
};

export function MoreStories({ posts, title, more }: Props) {
  return (
    <section>
      <div className=" flex items-center mb-8 justify-between">
        <p className=" text-2xl font-bold tracking-tighter  leading-tight">
          <span className=" text-primary">{title?.slice(0, 1)}</span>
          <span>{title?.slice(1)}</span>
        </p>
        {more}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-16 mb-16">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            postId={post.postId}
          />
        ))}
      </div>
    </section>
  );
}
