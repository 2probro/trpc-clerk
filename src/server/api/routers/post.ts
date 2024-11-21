import { z } from "zod";

import { createTRPCRouter, staffProcedure } from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  create: staffProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        authorId: ctx.auth.userId,
      });
    }),

  getAll: staffProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.id)],
    });
  }),
});
