"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      const [postsResponse, sessionResponse] = await Promise.all([
        // Get total count
        supabase
          .from("posts")
          .select("*", { count: "exact", head: true })
          .eq("published", true),
        supabase.auth.getSession(),
      ]);

      setTotalPosts(postsResponse.count || 0);
      setSession(sessionResponse.data.session);

      // Get paginated posts
      const { data: paginatedPosts } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .range(
          (currentPage - 1) * POSTS_PER_PAGE,
          currentPage * POSTS_PER_PAGE - 1
        );

      setPosts(paginatedPosts || []);
    };

    fetchData();
  }, [currentPage, supabase]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        {session && (
          <Link href="/admin">
            <Button>
              <PenSquare className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Button>
          </Link>
        )}
      </div> */}

      {posts.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <article className="group bg-card rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
                  <div className="relative w-full h-48">
                    {post.thumbnail_url ? (
                      <Image
                        src={post.thumbnail_url}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <PenSquare className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <div className="mt-4 text-sm text-muted-foreground line-clamp-3">
                      {post.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts available yet.</p>
        </div>
      )}
    </div>
  );
}
