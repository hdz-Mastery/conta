import { 
  pgTable, 
  uuid, 
  text, 
  timestamp, 
  numeric, 
  date, 
  index 
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// User Settings (guardamos preferencias del usuario autenticado con Clerk)
export const userSettings = pgTable("user_settings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  clerkId: text("clerk_id").unique().notNull(), // ID de Clerk del usuario
  currency: text("currency").notNull().default("CRC"), // CRC, USD, EUR, MXN, etc.
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`),
});

// Ingresos
export const incomes = pgTable("incomes", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  fecha: date("fecha").notNull(),
  fuenteIngreso: text("fuente_ingreso").notNull(),
  categoria: text("categoria").notNull(),
  cantidad: numeric("cantidad", { precision: 12, scale: 2 }).notNull(),
  mes: text("mes").notNull(), // Formato: "2024-09" para Sept 2024
  clerkId: text("clerk_id").notNull(), // ID de Clerk del usuario
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
}, (table) => ({
  userMesIdx: index("incomes_user_mes_idx").on(table.clerkId, table.mes),
}));

// Gastos Fijos
export const fixedExpenses = pgTable("fixed_expenses", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  fecha: date("fecha").notNull(),
  fuenteGasto: text("fuente_gasto").notNull(),
  cantidad: numeric("cantidad", { precision: 12, scale: 2 }).notNull(),
  mes: text("mes").notNull(),
  clerkId: text("clerk_id").notNull(), // ID de Clerk del usuario
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
}, (table) => ({
  userMesIdx: index("fixed_expenses_user_mes_idx").on(table.clerkId, table.mes),
}));

// Gastos Variables
export const variableExpenses = pgTable("variable_expenses", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  fecha: date("fecha").notNull(),
  fuenteGasto: text("fuente_gasto").notNull(),
  cantidad: numeric("cantidad", { precision: 12, scale: 2 }).notNull(),
  mes: text("mes").notNull(),
  clerkId: text("clerk_id").notNull(), // ID de Clerk del usuario
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
}, (table) => ({
  userMesIdx: index("variable_expenses_user_mes_idx").on(table.clerkId, table.mes),
}));

// Resumen Mensual
export const summaries = pgTable("summaries", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  mes: text("mes").notNull(),
  totalIngresos: numeric("total_ingresos", { precision: 12, scale: 2 }).notNull().default("0"),
  totalGastosFijos: numeric("total_gastos_fijos", { precision: 12, scale: 2 }).notNull().default("0"),
  totalGastosVariables: numeric("total_gastos_variables", { precision: 12, scale: 2 }).notNull().default("0"),
  balance: numeric("balance", { precision: 12, scale: 2 }).notNull().default("0"),
  clerkId: text("clerk_id").notNull(), // ID de Clerk del usuario
  createdAt: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).default(sql`now()`),
}, (table) => ({
  userMesIdx: index("summaries_user_mes_idx").on(table.clerkId, table.mes),
}));

