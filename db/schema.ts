import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerkId: text("clerk_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  avatar: text("avatar").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  workflows: many(workflows),
  connections: many(connections),
}));

export const insertUserSchema = createInsertSchema(users);

export const workflows = pgTable("workflows", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  googleResourceId: text("googleResourceId"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
});

export const workflowsRelations = relations(workflows, ({ one }) => ({
  user: one(users, {
    fields: [workflows.userId],
    references: [users.id]
  })
}));

export const insertWorkflowSchema = createInsertSchema(workflows);

export const connections = pgTable("connections", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  metadata: text("metadata").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at"),
}, (t) => ({
  uniqueTypeWithUser: unique().on(t.userId, t.type)
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  user: one(users, {
    fields: [connections.userId],
    references: [users.id]
  })
}));