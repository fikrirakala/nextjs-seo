import ClapButton from "@/components/ClapButton";
import { delay } from "@/lib/utils";
import { BlogPost, BlogPostsResponse } from "@/models/BlogPost";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: { postId: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const postId = params.postId;
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  const post: BlogPost = await response.json();

  return {
    title: post.title,
    description: post.body,
  };
}

export async function generateStaticParams({ params }: BlogPostPageProps) {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

  return posts.map((post) => {
    postId: post.id;
  });
}

export default async function BlogPostPage({
  params: { postId },
}: BlogPostPageProps) {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  const { title, body }: BlogPost = await response.json();

  if (!response.ok) {
    notFound();
  }

  await delay(1000);

  return (
    <article className="m-auto max-w-prose space-y-5">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="text-lg">{body}</p>
      <ClapButton />
    </article>
  );
}
