"use client";

import { Post } from "@/interface/post";
import { useRouter } from "next/navigation";

export default function SearchPostComponent({ postData }: { postData: Post }) {
  const router = useRouter();
  return (
    <div
      className=" cursor-pointer hover:bg-accent px-1 rounded-lg transition-all duration-300 ease-in-out"
      onClick={() => router.push(`/posts/${postData?.slug}`)}
    >
      {postData?.title}
    </div>
  );
}
