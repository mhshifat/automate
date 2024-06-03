ALTER TABLE "workflows" ADD COLUMN "googleResourceId" text;--> statement-breakpoint
ALTER TABLE "connections" DROP COLUMN IF EXISTS "identifier";