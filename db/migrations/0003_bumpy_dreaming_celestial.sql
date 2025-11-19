CREATE TABLE "user_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"currency" text DEFAULT 'CRC' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_settings_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "fixed_expenses" DROP CONSTRAINT "fixed_expenses_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "incomes" DROP CONSTRAINT "incomes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "summaries" DROP CONSTRAINT "summaries_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "variable_expenses" DROP CONSTRAINT "variable_expenses_user_id_users_id_fk";
--> statement-breakpoint
DROP INDEX "fixed_expenses_user_mes_idx";--> statement-breakpoint
DROP INDEX "incomes_user_mes_idx";--> statement-breakpoint
DROP INDEX "summaries_user_mes_idx";--> statement-breakpoint
DROP INDEX "variable_expenses_user_mes_idx";--> statement-breakpoint
ALTER TABLE "fixed_expenses" ADD COLUMN "clerk_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "incomes" ADD COLUMN "clerk_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "summaries" ADD COLUMN "clerk_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "variable_expenses" ADD COLUMN "clerk_id" text NOT NULL;--> statement-breakpoint
CREATE INDEX "fixed_expenses_user_mes_idx" ON "fixed_expenses" USING btree ("clerk_id","mes");--> statement-breakpoint
CREATE INDEX "incomes_user_mes_idx" ON "incomes" USING btree ("clerk_id","mes");--> statement-breakpoint
CREATE INDEX "summaries_user_mes_idx" ON "summaries" USING btree ("clerk_id","mes");--> statement-breakpoint
CREATE INDEX "variable_expenses_user_mes_idx" ON "variable_expenses" USING btree ("clerk_id","mes");--> statement-breakpoint
ALTER TABLE "fixed_expenses" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "incomes" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "summaries" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "variable_expenses" DROP COLUMN "user_id";