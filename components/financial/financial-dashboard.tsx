"use client";

import { useState, useTransition } from "react";
import { useClerk } from "@clerk/nextjs";
import { MonthSelector } from "./month-selector";
import { IncomesTable } from "./incomes-table";
import { FixedExpensesTable } from "./fixed-expenses-table";
import { VariableExpensesTable } from "./variable-expenses-table";
import { SummaryCard } from "./summary-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelector } from "./currency-selector";
import { LogOut, Wallet, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import {
  getMonthlyData,
  createIncome,
  updateIncome,
  deleteIncome,
  createFixedExpense,
  updateFixedExpense,
  deleteFixedExpense,
  createVariableExpense,
  updateVariableExpense,
  deleteVariableExpense,
} from "@/actions/financialActions";
import type {
  MonthlyData,
  Income,
  FixedExpense,
  VariableExpense,
  UserWithCurrency,
} from "@/types";

interface FinancialDashboardProps {
  initialData: MonthlyData;
  initialMonth: string;
  availableMonths: string[];
  user: UserWithCurrency;
}

export function FinancialDashboard({
  initialData,
  initialMonth,
  availableMonths: initialAvailableMonths,
  user,
}: FinancialDashboardProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [data, setData] = useState<MonthlyData>(initialData);
  const [availableMonths] = useState(initialAvailableMonths);
  const [, startTransition] = useTransition();
  const { signOut } = useClerk();

  const handleMonthChange = async (month: string) => {
    setCurrentMonth(month);
    startTransition(async () => {
      try {
        const newData = await getMonthlyData(month);
        setData(newData);
      } catch (error) {
        toast.error("Error al cargar datos del mes");
        console.error(error);
      }
    });
  };

  const handleLogout = () => {
    signOut();
  };

  // Handlers para Ingresos
  const handleAddIncome = async (income: Omit<Income, "id" | "createdAt">) => {
    try {
      await createIncome(income);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Ingreso agregado");
    } catch (error) {
      toast.error("Error al agregar ingreso");
      console.error(error);
    }
  };

  const handleUpdateIncome = async (id: string, income: Partial<Income>) => {
    try {
      await updateIncome(id, income);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Ingreso actualizado");
    } catch (error) {
      toast.error("Error al actualizar ingreso");
      console.error(error);
    }
  };

  const handleDeleteIncome = async (id: string) => {
    try {
      await deleteIncome(id);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Ingreso eliminado");
    } catch (error) {
      toast.error("Error al eliminar ingreso");
      console.error(error);
    }
  };

  // Handlers para Gastos Fijos
  const handleAddFixedExpense = async (
    expense: Omit<FixedExpense, "id" | "createdAt">
  ) => {
    try {
      await createFixedExpense(expense);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Gasto fijo agregado");
    } catch (error) {
      toast.error("Error al agregar gasto fijo");
      console.error(error);
    }
  };

  const handleUpdateFixedExpense = async (
    id: string,
    expense: Partial<FixedExpense>
  ) => {
    try {
      await updateFixedExpense(id, expense);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Gasto fijo actualizado");
    } catch (error) {
      toast.error("Error al actualizar gasto fijo");
      console.error(error);
    }
  };

  const handleDeleteFixedExpense = async (id: string) => {
    try {
      await deleteFixedExpense(id);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Gasto fijo eliminado");
    } catch (error) {
      toast.error("Error al eliminar gasto fijo");
      console.error(error);
    }
  };

  // Handlers para Gastos Variables
  const handleAddVariableExpense = async (
    expense: Omit<VariableExpense, "id" | "createdAt">
  ) => {
    try {
      await createVariableExpense(expense);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Gasto variable agregado");
    } catch (error) {
      toast.error("Error al agregar gasto variable");
      console.error(error);
    }
  };

  const handleUpdateVariableExpense = async (
    id: string,
    expense: Partial<VariableExpense>
  ) => {
    try {
      await updateVariableExpense(id, expense);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Gasto variable actualizado");
    } catch (error) {
      toast.error("Error al actualizar gasto variable");
      console.error(error);
    }
  };

  const handleDeleteVariableExpense = async (id: string) => {
    try {
      await deleteVariableExpense(id);
      const newData = await getMonthlyData(currentMonth);
      setData(newData);
      toast.success("Gasto variable eliminado");
    } catch (error) {
      toast.error("Error al eliminar gasto variable");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                ₡
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FinanzApp</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {user.name || user.email.split("@")[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CurrencySelector currentCurrency={user.currency} />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-6 lg:py-8 max-w-7xl">
        {/* Month Selector */}
        <div className="mb-6">
          <MonthSelector
            currentMonth={currentMonth}
            availableMonths={availableMonths}
            onMonthChange={handleMonthChange}
          />
        </div>

        {/* Tabs: Control vs Resumen */}
        <Tabs defaultValue="control" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="control"
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Control
            </TabsTrigger>
            <TabsTrigger
              value="resumen"
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Resumen
            </TabsTrigger>
          </TabsList>

          {/* Tab: Control (Tablas) */}
          <TabsContent
            value="control"
            className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="bg-card rounded-2xl border border-border shadow-lg p-4 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ingresos */}
                <div className="lg:col-span-3 space-y-4">
                  <IncomesTable
                    incomes={data.incomes}
                    onAdd={handleAddIncome}
                    onUpdate={handleUpdateIncome}
                    onDelete={handleDeleteIncome}
                    currentMonth={currentMonth}
                    currency={user.currency}
                  />
                </div>

                {/* Gastos Fijos y Variables lado a lado en desktop */}
                <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <FixedExpensesTable
                      expenses={data.fixedExpenses}
                      onAdd={handleAddFixedExpense}
                      onUpdate={handleUpdateFixedExpense}
                      onDelete={handleDeleteFixedExpense}
                      currentMonth={currentMonth}
                      currency={user.currency}
                    />
                  </div>

                  <div>
                    <VariableExpensesTable
                      expenses={data.variableExpenses}
                      onAdd={handleAddVariableExpense}
                      onUpdate={handleUpdateVariableExpense}
                      onDelete={handleDeleteVariableExpense}
                      currentMonth={currentMonth}
                      currency={user.currency}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Resumen (Reportes y Analytics) */}
          <TabsContent
            value="resumen"
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <SummaryCard summary={data.summary} currency={user.currency} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-8 pb-4 text-center text-xs text-muted-foreground">
          <p>FinanzApp © 2024</p>
        </footer>
      </main>
    </div>
  );
}
