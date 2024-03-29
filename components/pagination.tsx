"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

interface PaginationProps {
  totalPages: number;
  className?: string;
}

export function Pagination({ totalPages, className }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <PaginationComponent className={className}>
      <PaginationContent>
        {prevPage >= 1 ? (
          <PaginationItem>
            <PaginationPrevious
              className=" cursor-pointer"
              onClick={() => {
                router.push(createPageURL(prevPage));
              }}
            />
          </PaginationItem>
        ) : null}

        {Array(totalPages)
          .fill("")
          .map((_, index) => (
            <PaginationItem
              className="hidden sm:inline-block"
              key={`page-button-${index}`}
            >
              <PaginationLink
                className=" cursor-pointer"
                isActive={currentPage === index + 1}
                onClick={() => {
                  router.push(createPageURL(index + 1));
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {nextPage <= totalPages ? (
          <PaginationItem>
            <PaginationNext
              className=" cursor-pointer"
              onClick={() => {
                router.push(createPageURL(nextPage));
              }}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </PaginationComponent>
  );
}
