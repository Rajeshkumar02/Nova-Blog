import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import { PostHeader } from "@/components/post-header";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: {
      name: siteConfig.author.name,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mx-4 md:container py-6 prose dark:prose-invert max-w-3xl md:mx-auto">
      <PostHeader
        postid={post.postid}
        author={post.author}
        coverimage={post.coverimage}
        title={post.title}
        tags={post.tags}
        date={post.date}
      />
      <div className=" text-left">
        {/* <p dangerouslySetInnerHTML={{ __html: post.body }} /> */}
        <MDXContent code={post.body} />
      </div>
    </article>
  );
}
