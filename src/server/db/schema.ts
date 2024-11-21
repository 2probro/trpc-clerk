// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { integer, pgTableCreator, text } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `trpc-clerk_${name}`);

export const posts = createTable("post", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  authorId: text("author_id").notNull(),
});
