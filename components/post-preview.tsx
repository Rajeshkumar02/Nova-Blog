"use client";

import Link from "next/link";
import { formatDistance } from "date-fns";
import CoverImage from "./cover-image";
import Image from "next/image";

export default function PostPreview({
  title,
  coverImage,
  date,
  author,
  slug,
  description,
}: {
  title: string;
  coverImage: string;
  date: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  slug: string;
  description: string;
}) {
  return (
    <div className=" bg-secondary p-4 rounded-lg flex flex-col justify-between h-full  ">
      <div className="mb-5 ">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <p className="text-lg font-semibold mb-3 leading-snug">
        <Link as={`/${slug}`} href="/[slug]">
          {title}
        </Link>
      </p>
      <div className="text-sm text-secondary-foreground mb-4">
        {formatDistance(new Date(date), new Date(), {
          addSuffix: true,
        })}
      </div>
      <p className="text-sm leading-relaxed mb-4 line-clamp-3 text-accent-foreground">
        {description}
      </p>
      <div className=" bottom-0">
        <div className="flex items-center">
          <Image
            width={30}
            height={30}
            src={author.avatar}
            className="w-8 h-8 rounded-full mr-4"
            alt={author.name}
          />
          <div className="text-sm font-bold">{author.name}</div>
        </div>
      </div>
    </div>
  );
}
