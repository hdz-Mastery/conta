-- Tabla users ya existe, omitiendo su creación
-- Si necesitas crearla manualmente, descomenta:
-- CREATE TABLE "users" (
-- 	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
-- 	"email" text NOT NULL,
-- 	"password_hash" text NOT NULL,
-- 	"name" text,
-- 	"created_at" timestamp with time zone DEFAULT now(),
-- 	CONSTRAINT "users_email_unique" UNIQUE("email")
-- );

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "incomes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fecha" date NOT NULL,
	"fuente_ingreso" text NOT NULL,
	"categoria" text NOT NULL,
	"cantidad" numeric(12, 2) NOT NULL,
	"mes" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fixed_expenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fecha" date NOT NULL,
	"fuente_gasto" text NOT NULL,
	"cantidad" numeric(12, 2) NOT NULL,
	"mes" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variable_expenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fecha" date NOT NULL,
	"fuente_gasto" text NOT NULL,
	"cantidad" numeric(12, 2) NOT NULL,
	"mes" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "summaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mes" text NOT NULL,
	"total_ingresos" numeric(12, 2) DEFAULT '0' NOT NULL,
	"total_gastos_fijos" numeric(12, 2) DEFAULT '0' NOT NULL,
	"total_gastos_variables" numeric(12, 2) DEFAULT '0' NOT NULL,
	"balance" numeric(12, 2) DEFAULT '0' NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incomes" ADD CONSTRAINT "incomes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fixed_expenses" ADD CONSTRAINT "fixed_expenses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variable_expenses" ADD CONSTRAINT "variable_expenses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "summaries" ADD CONSTRAINT "summaries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "incomes_user_mes_idx" ON "incomes" USING btree ("user_id","mes");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "fixed_expenses_user_mes_idx" ON "fixed_expenses" USING btree ("user_id","mes");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "variable_expenses_user_mes_idx" ON "variable_expenses" USING btree ("user_id","mes");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "summaries_user_mes_idx" ON "summaries" USING btree ("user_id","mes");