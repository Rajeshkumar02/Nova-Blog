import { getAllPosts } from "@/api/getallpost";
import PaginationControls from "@/components/PaginationControls";
import Container from "@/components/molecule/container";
import { MoreStories } from "@/components/molecule/more-stories";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";
  const tag = searchParams["tag"] as string | undefined;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const posts = getAllPosts(tag);

  const entries = posts.slice(start, end);

  return (
    <Container>
      {entries.length > 0 && (
        <MoreStories posts={entries} title="Recent post" />
      )}
      <PaginationControls
        hasNextPage={end < posts.length}
        hasPrevPage={start > 0}
      />
    </Container>
  );
}
