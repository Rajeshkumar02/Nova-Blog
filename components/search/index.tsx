import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchInput } from "./searchInput";

const SearchComponent = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"} size={"icon"}>
            <MagnifyingGlassIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <SearchInput />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchComponent;
