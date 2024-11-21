"use client";

import { api } from "@/trpc/react";

export function PostsList() {
  const { data: posts, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post) => (
        <div key={post.id} className="rounded-lg bg-white/10 p-4">
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
