"use client";

import Avatar from "../molecule/avatar";
import CoverImage from "../cover-image";
import { type Author } from "@/interface/author";
import DateFormatter from "../date-formatter";
import { PostTitle } from "../post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  postId: string;
};

export function PostHeader({ title, coverImage, date, author, postId }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:flex md:mb-8  flex-col gap-3">
        <Avatar name={author.name} picture={author.picture} />
        <div className="mb-0 text-xs text-secondary-foreground">
          <DateFormatter dateString={date} />
        </div>
      </div>
      <div className=" flex justify-center">
        <div className="mb-8 md:mb-16 sm:mx-0 lg:w-[80%] justify-center">
          <CoverImage title={title} src={coverImage} />
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className=" md:hidden mb-6 flex flex-col gap-3">
          <Avatar name={author.name} picture={author.picture} />
          <div className="mb-6 text-xs text-secondary-foreground">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </>
  );
}
