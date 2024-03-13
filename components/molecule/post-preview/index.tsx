import Link from "next/link";
import { type Author } from "@/interface/author";
import Avatar from "../avatar";
import CoverImage from "@/components/cover-image";
import DateFormatter from "@/components/date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  postId: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className=" bg-secondary p-4 rounded-lg flex flex-col justify-between h-full  ">
      <div className="mb-5 ">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <p className="text-lg font-semibold mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          {title}
        </Link>
      </p>
      <div className="text-sm text-secondary-foreground mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-sm leading-relaxed mb-4 line-clamp-3 text-accent-foreground">
        {excerpt}
      </p>
      <div className=" bottom-0">
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </div>
  );
}
