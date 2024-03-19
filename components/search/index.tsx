import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchInput } from "./searchInput";
import { searchPosts } from "@/api/getallpost";
import SearchPostComponent from "./searchComponent";
import { Post } from "@/interface/post";

const SearchComponent = ({ search }: { search?: string }) => {
  const searchPost: Post[] = searchPosts(search);
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="border inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <MagnifyingGlassIcon />
          </div>
        </DialogTrigger>
        <DialogContent>
          <SearchInput />
          <div className=" flex flex-col gap-3">
            {searchPost.map((post: Post, index: number) => {
              return <SearchPostComponent key={index} postData={post} />;
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchComponent;
