CREATE TABLE IF NOT EXISTS "connections" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"metadata" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
