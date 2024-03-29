"use cleint";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { searchPosts } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "#site/content";
import { Search } from "lucide-react";

export default function SearchModel() {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const searchPost = searchPosts(search);
  return (
    <Dialog
      onOpenChange={() => {
        setSearch("");
        setOpen(!open);
      }}
      open={open}
    >
      <DialogTrigger>
        <div className="border inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
          <MagnifyingGlassIcon />
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="relative h-10 w-full">
          <Search className="absolute left-2 w-5 h-5 top-[43%] transform -translate-y-1/2 text-gray-500 z-10" />
          <Input
            type="text"
            className="pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent" // Add additional styling as needed
            placeholder={"Search for articles"}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>
        <div className=" flex flex-col gap-3">
          {searchPost.map((post: Post, index: number) => {
            return (
              <div key={index}>
                <p
                  className=" hover:bg-accent hover:text-accent-foreground pl-2 rounded-md cursor-pointer py-2 "
                  onClick={() => {
                    router.push(`/${post?.slug}`);
                    setOpen(false);
                  }}
                >
                  {post?.title}
                </p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
