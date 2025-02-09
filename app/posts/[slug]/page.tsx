import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
export default async function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-muted-foreground mb-8">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333",
            fontFamily: "Arial, sans-serif",
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
