import { z } from "zod";

// ============ VALIDACIONES FINANCIERAS ============

// Validación de ingreso
export const incomeSchema = z.object({
  fecha: z.string().min(1, "La fecha es requerida"),
  fuenteIngreso: z.string().min(1, "La fuente de ingreso es requerida"),
  categoria: z.string().min(1, "La categoría es requerida"),
  cantidad: z.number().positive("La cantidad debe ser mayor a 0"),
  mes: z.string().regex(/^\d{4}-\d{2}$/, "Formato de mes inválido (YYYY-MM)"),
});

// Validación de gasto (fijo o variable)
export const expenseSchema = z.object({
  fecha: z.string().min(1, "La fecha es requerida"),
  fuenteGasto: z.string().min(1, "La fuente de gasto es requerida"),
  cantidad: z.number().positive("La cantidad debe ser mayor a 0"),
  mes: z.string().regex(/^\d{4}-\d{2}$/, "Formato de mes inválido (YYYY-MM)"),
});

// Tipos inferidos
export type IncomeInput = z.infer<typeof incomeSchema>;
export type ExpenseInput = z.infer<typeof expenseSchema>;

// Categorías predefinidas para ingresos
export const CATEGORIAS_INGRESO = [
  "Salario",
  "Freelance",
  "Inversiones",
  "Bonos",
  "Comisiones",
  "Ventas",
  "Alquiler",
  "Otro",
] as const;

export type CategoriaIngreso = typeof CATEGORIAS_INGRESO[number];

