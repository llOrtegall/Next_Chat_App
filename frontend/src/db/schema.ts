import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 80 }).notNull(),
  email: varchar({ length: 120 }).notNull().unique(),
  username: varchar({ length: 20 }).unique()
});
