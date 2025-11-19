import { userSettings, incomes, fixedExpenses, variableExpenses, summaries } from "@/db/schema";
import type { CurrencyCode } from "@/lib/utils/currencies";

// Tipos inferidos de Drizzle
export type UserSettings = typeof userSettings.$inferSelect;
export type NewUserSettings = typeof userSettings.$inferInsert;

export type Income = typeof incomes.$inferSelect;
export type NewIncome = typeof incomes.$inferInsert;

export type FixedExpense = typeof fixedExpenses.$inferSelect;
export type NewFixedExpense = typeof fixedExpenses.$inferInsert;

export type VariableExpense = typeof variableExpenses.$inferSelect;
export type NewVariableExpense = typeof variableExpenses.$inferInsert;

export type Summary = typeof summaries.$inferSelect;
export type NewSummary = typeof summaries.$inferInsert;

// Tipos de autenticación (ahora manejado por Clerk)
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
}

// Tipos para formularios financieros
export interface IncomeFormData {
  fecha: string;
  fuenteIngreso: string;
  categoria: string;
  cantidad: number;
}

export interface ExpenseFormData {
  fecha: string;
  fuenteGasto: string;
  cantidad: number;
}

export interface MonthlyData {
  incomes: Income[];
  fixedExpenses: FixedExpense[];
  variableExpenses: VariableExpense[];
  summary: Summary | null;
}

// Usuario con moneda personalizada
export interface UserWithCurrency {
  id: string;
  email: string;
  name: string | null;
  currency: CurrencyCode;
}
