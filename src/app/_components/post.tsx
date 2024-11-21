"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setTitle("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name: title });
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        placeholder="New post..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-md px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-md bg-white/10 px-4 py-2 font-semibold hover:bg-white/20"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "..." : "Post"}
      </button>
    </form>
  );
}
