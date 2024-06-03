ALTER TABLE "connections" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_id_type_unique" UNIQUE("user_id","type");