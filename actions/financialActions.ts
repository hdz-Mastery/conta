"use server";

import { db } from "@/db/drizzle";
import { incomes, fixedExpenses, variableExpenses, summaries } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import type { NewIncome, NewFixedExpense, NewVariableExpense, Income, FixedExpense, VariableExpense, Summary } from "@/types";

// ============ INGRESOS ============

export async function getIncomesByMonth(mes: string): Promise<Income[]> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const results = await db
    .select()
    .from(incomes)
    .where(and(eq(incomes.clerkId, user.id), eq(incomes.mes, mes)))
    .orderBy(desc(incomes.fecha));

  return results;
}

export async function createIncome(data: NewIncome): Promise<Income> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [income] = await db
    .insert(incomes)
    .values({
      ...data,
      clerkId: user.id,
    })
    .returning();

  await recalculateSummary(data.mes, user.id);
  revalidatePath("/");
  return income;
}

export async function updateIncome(id: string, data: Partial<NewIncome>): Promise<Income> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [income] = await db
    .update(incomes)
    .set(data)
    .where(and(eq(incomes.id, id), eq(incomes.clerkId, user.id)))
    .returning();

  if (income?.mes) {
    await recalculateSummary(income.mes, user.id);
  }
  revalidatePath("/");
  return income;
}

export async function deleteIncome(id: string): Promise<void> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [income] = await db
    .delete(incomes)
    .where(and(eq(incomes.id, id), eq(incomes.clerkId, user.id)))
    .returning();

  if (income?.mes) {
    await recalculateSummary(income.mes, user.id);
  }
  revalidatePath("/");
}

// ============ GASTOS FIJOS ============

export async function getFixedExpensesByMonth(mes: string): Promise<FixedExpense[]> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const results = await db
    .select()
    .from(fixedExpenses)
    .where(and(eq(fixedExpenses.clerkId, user.id), eq(fixedExpenses.mes, mes)))
    .orderBy(desc(fixedExpenses.fecha));

  return results;
}

export async function createFixedExpense(data: NewFixedExpense): Promise<FixedExpense> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [expense] = await db
    .insert(fixedExpenses)
    .values({
      ...data,
      clerkId: user.id,
    })
    .returning();

  await recalculateSummary(data.mes, user.id);
  revalidatePath("/");
  return expense;
}

export async function updateFixedExpense(id: string, data: Partial<NewFixedExpense>): Promise<FixedExpense> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [expense] = await db
    .update(fixedExpenses)
    .set(data)
    .where(and(eq(fixedExpenses.id, id), eq(fixedExpenses.clerkId, user.id)))
    .returning();

  if (expense?.mes) {
    await recalculateSummary(expense.mes, user.id);
  }
  revalidatePath("/");
  return expense;
}

export async function deleteFixedExpense(id: string): Promise<void> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [expense] = await db
    .delete(fixedExpenses)
    .where(and(eq(fixedExpenses.id, id), eq(fixedExpenses.clerkId, user.id)))
    .returning();

  if (expense?.mes) {
    await recalculateSummary(expense.mes, user.id);
  }
  revalidatePath("/");
}

// ============ GASTOS VARIABLES ============

export async function getVariableExpensesByMonth(mes: string): Promise<VariableExpense[]> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const results = await db
    .select()
    .from(variableExpenses)
    .where(and(eq(variableExpenses.clerkId, user.id), eq(variableExpenses.mes, mes)))
    .orderBy(desc(variableExpenses.fecha));

  return results;
}

export async function createVariableExpense(data: NewVariableExpense): Promise<VariableExpense> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [expense] = await db
    .insert(variableExpenses)
    .values({
      ...data,
      clerkId: user.id,
    })
    .returning();

  await recalculateSummary(data.mes, user.id);
  revalidatePath("/");
  return expense;
}

export async function updateVariableExpense(id: string, data: Partial<NewVariableExpense>): Promise<VariableExpense> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [expense] = await db
    .update(variableExpenses)
    .set(data)
    .where(and(eq(variableExpenses.id, id), eq(variableExpenses.clerkId, user.id)))
    .returning();

  if (expense?.mes) {
    await recalculateSummary(expense.mes, user.id);
  }
  revalidatePath("/");
  return expense;
}

export async function deleteVariableExpense(id: string): Promise<void> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [expense] = await db
    .delete(variableExpenses)
    .where(and(eq(variableExpenses.id, id), eq(variableExpenses.clerkId, user.id)))
    .returning();

  if (expense?.mes) {
    await recalculateSummary(expense.mes, user.id);
  }
  revalidatePath("/");
}

// ============ RESUMEN ============

export async function getSummaryByMonth(mes: string): Promise<Summary | null> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [summary] = await db
    .select()
    .from(summaries)
    .where(and(eq(summaries.clerkId, user.id), eq(summaries.mes, mes)))
    .limit(1);

  return summary || null;
}

// Función auxiliar para recalcular el resumen mensual
async function recalculateSummary(mes: string, clerkId: string): Promise<Summary> {
  // Obtener totales
  const incomesData = await db
    .select()
    .from(incomes)
    .where(and(eq(incomes.clerkId, clerkId), eq(incomes.mes, mes)));

  const fixedExpensesData = await db
    .select()
    .from(fixedExpenses)
    .where(and(eq(fixedExpenses.clerkId, clerkId), eq(fixedExpenses.mes, mes)));

  const variableExpensesData = await db
    .select()
    .from(variableExpenses)
    .where(and(eq(variableExpenses.clerkId, clerkId), eq(variableExpenses.mes, mes)));

  const totalIngresos = incomesData.reduce((sum, item) => sum + parseFloat(item.cantidad), 0);
  const totalGastosFijos = fixedExpensesData.reduce((sum, item) => sum + parseFloat(item.cantidad), 0);
  const totalGastosVariables = variableExpensesData.reduce((sum, item) => sum + parseFloat(item.cantidad), 0);
  const balance = totalIngresos - totalGastosFijos - totalGastosVariables;

  // Verificar si ya existe un resumen
  const [existingSummary] = await db
    .select()
    .from(summaries)
    .where(and(eq(summaries.clerkId, clerkId), eq(summaries.mes, mes)))
    .limit(1);

  if (existingSummary) {
    // Actualizar existente
    const [updated] = await db
      .update(summaries)
      .set({
        totalIngresos: totalIngresos.toFixed(2),
        totalGastosFijos: totalGastosFijos.toFixed(2),
        totalGastosVariables: totalGastosVariables.toFixed(2),
        balance: balance.toFixed(2),
        updatedAt: new Date(),
      })
      .where(eq(summaries.id, existingSummary.id))
      .returning();
    return updated;
  } else {
    // Crear nuevo
    const [created] = await db
      .insert(summaries)
      .values({
        mes,
        clerkId,
        totalIngresos: totalIngresos.toFixed(2),
        totalGastosFijos: totalGastosFijos.toFixed(2),
        totalGastosVariables: totalGastosVariables.toFixed(2),
        balance: balance.toFixed(2),
      })
      .returning();
    return created;
  }
}

// ============ OBTENER DATOS COMPLETOS DEL MES ============

export async function getMonthlyData(mes: string) {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  const [incomesData, fixedExpensesData, variableExpensesData, summaryData] = await Promise.all([
    getIncomesByMonth(mes),
    getFixedExpensesByMonth(mes),
    getVariableExpensesByMonth(mes),
    getSummaryByMonth(mes),
  ]);

  return {
    incomes: incomesData,
    fixedExpenses: fixedExpensesData,
    variableExpenses: variableExpensesData,
    summary: summaryData,
  };
}

// ============ OBTENER LISTA DE MESES DISPONIBLES ============

export async function getAvailableMonths(): Promise<string[]> {
  const user = await currentUser();
  if (!user) throw new Error("No autenticado");

  // Obtener meses únicos de todas las tablas
  const incomesMonths = await db
    .selectDistinct({ mes: incomes.mes })
    .from(incomes)
    .where(eq(incomes.clerkId, user.id));

  const fixedMonths = await db
    .selectDistinct({ mes: fixedExpenses.mes })
    .from(fixedExpenses)
    .where(eq(fixedExpenses.clerkId, user.id));

  const variableMonths = await db
    .selectDistinct({ mes: variableExpenses.mes })
    .from(variableExpenses)
    .where(eq(variableExpenses.clerkId, user.id));

  // Combinar y eliminar duplicados
  const allMonths = new Set<string>();
  [...incomesMonths, ...fixedMonths, ...variableMonths].forEach((item) => {
    if (item.mes) allMonths.add(item.mes);
  });

  return Array.from(allMonths).sort().reverse(); // Más recientes primero
}
