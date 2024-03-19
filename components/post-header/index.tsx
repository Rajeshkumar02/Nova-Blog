"use client";

import Avatar from "../molecule/avatar";
import CoverImage from "../cover-image";
import { type Author } from "@/interface/author";
import DateFormatter from "../date-formatter";
import { PostTitle } from "../post-title";
import { useEffect, useRef } from "react";
import { doc, increment, setDoc } from "firebase/firestore";
import { db } from "@/api/config";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  postId: string;
  tags: string[];
};

export function PostHeader({
  title,
  coverImage,
  date,
  author,
  postId,
  tags,
}: Props) {
  const initialized = useRef(false);
  const router = useRouter();

  const UpdatePostCount = async () => {
    if (initialized.current) {
      const postRef = doc(db, "posts", postId);
      await setDoc(postRef, { postCount: increment(1) }, { merge: true });
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      UpdatePostCount();
    }
  }, []);

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
        <div className="mb-8 md:mb-1 sm:mx-0 lg:w-[80%] justify-center">
          <CoverImage title={title} src={coverImage} />
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className=" md:hidden mb-2 flex flex-col gap-3">
          <Avatar name={author.name} picture={author.picture} />
          <div className="mb-2 text-xs text-secondary-foreground">
            <DateFormatter dateString={date} />
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
