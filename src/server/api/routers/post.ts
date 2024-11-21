import { z } from "zod";

import { createTRPCRouter, staffProcedure } from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  create: staffProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        content: input.content,
        authorId: ctx.auth.userId,
      });
    }),

  getAll: staffProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.id)],
    });
  }),
});
