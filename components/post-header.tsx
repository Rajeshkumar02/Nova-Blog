"use client";

import { useRouter } from "next/navigation";
import CoverImage from "./cover-image";
import Image from "next/image";
import { formatDistance } from "date-fns";

type Props = {
  title: string;
  coverimage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    id: number;
  };
  postid: number;
  tags: string[];
};

export function PostHeader({
  title,
  coverimage,
  date,
  author,
  postid,
  tags,
}: Props) {
  const router = useRouter();

  return (
    <>
      <h1 className=" text-3xl font-semibold tracking-tighter leading-tight md:leading-none mb-6 text-center md:text-left">
        {title}
      </h1>
      <div className="hidden md:flex md:mb-8  flex-col gap-0">
        <div className="flex items-center ">
          <Image
            width={30}
            height={30}
            src={author.avatar}
            className="w-9 h-9 rounded-full m-0 mr-4"
            alt={author.name}
          />
          <div>
            <div className="text-sm font-bold mb-2">{author.name}</div>
            <div className="text-xs text-secondary-foreground">
              {formatDistance(new Date(date), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="mb-5 md:mb-1 sm:mx-0 lg:w-[80%] justify-center">
          <CoverImage title={title} src={coverimage} />
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className=" md:hidden ">
          <div className="flex items-center mb-8 ">
            <Image
              width={30}
              height={30}
              src={author.avatar}
              className="w-9 h-9 rounded-full m-0 mr-4"
              alt={author.name}
            />
            <div>
              <div className="text-sm font-bold mb-2">{author.name}</div>
              <div className="text-xs text-secondary-foreground">
                {formatDistance(new Date(date), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {tags?.length > 0 && (
        <div className="md:pt-6 md:max-w-2xl md:mx-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => router.push(`/?tag=${tag}`)}
              className="text-xs cursor-pointer text-accent-foreground bg-accent px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
