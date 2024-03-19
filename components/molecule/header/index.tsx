import Link from "next/link";
import Container from "../container";
import SearchComponent from "@/components/search";
import ChangeTheme from "./theme";

export function Header({ search }: { search?: string }) {
  return (
    <div className="bg-background border-b px-1 mb-3">
      <Container>
        <section className=" py-2 flex justify-between items-center ">
          <Link href={"/"}>
            <p className=" text-lg font-semibold first-letter:text-primary">
              Nova Blog
            </p>
          </Link>

          <div className=" flex flex-row gap-4 items-center">
            <SearchComponent search={search} />

            <ChangeTheme />
          </div>
        </section>
      </Container>
    </div>
  );
}
