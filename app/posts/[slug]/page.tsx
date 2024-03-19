import { getAllPosts, getPostBySlug } from "@/api/getallpost";
import { Header } from "@/components/molecule";
import Container from "@/components/molecule/container";
import { PostBody } from "@/components/post-body";
import { PostHeader } from "@/components/post-header";
import markdownToHtml from "@/lib/markdownToHtml";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function Post({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams["search"] as string | undefined;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <Header search={search} />
      <Container>
        <div className=" items-center w-full flex flex-col text-justify">
          <div className="max-w-4xl">
            <article className="mb-16 ">
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                postId={post?.postId || post.title}
                tags={post?.tags}
              />
              <PostBody content={content} />
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${post.author.name}`;

  return {
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
