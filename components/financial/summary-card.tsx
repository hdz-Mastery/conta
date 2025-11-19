"use client";

import { formatCurrency } from "@/lib/utils/calculations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type { Summary } from "@/types";
import type { CurrencyCode } from "@/lib/utils/currencies";

interface SummaryCardProps {
  summary: Summary | null;
  currency: CurrencyCode;
}

export function SummaryCard({ summary, currency }: SummaryCardProps) {
  const totalIngresos = summary ? parseFloat(summary.totalIngresos) : 0;
  const totalGastosFijos = summary ? parseFloat(summary.totalGastosFijos) : 0;
  const totalGastosVariables = summary
    ? parseFloat(summary.totalGastosVariables)
    : 0;
  const balance = summary ? parseFloat(summary.balance) : 0;

  const totalGastos = totalGastosFijos + totalGastosVariables;
  const isPositive = balance >= 0;

  // Cálculos adicionales
  const porcentajeGastosFijos =
    totalIngresos > 0 ? (totalGastosFijos / totalIngresos) * 100 : 0;
  const porcentajeGastosVariables =
    totalIngresos > 0 ? (totalGastosVariables / totalIngresos) * 100 : 0;
  const porcentajeAhorro =
    totalIngresos > 0 ? (balance / totalIngresos) * 100 : 0;
  const tasaGasto = totalIngresos > 0 ? (totalGastos / totalIngresos) * 100 : 0;

  // Estado financiero
  const estadoFinanciero =
    balance > totalIngresos * 0.2
      ? {
          estado: "Excelente",
          color: "text-green-600 dark:text-green-400",
          icon: CheckCircle2,
        }
      : balance > 0
      ? {
          estado: "Saludable",
          color: "text-blue-600 dark:text-blue-400",
          icon: TrendingUp,
        }
      : {
          estado: "Crítico",
          color: "text-red-600 dark:text-red-400",
          icon: AlertCircle,
        };

  return (
    <div className="space-y-6">
      {/* Header con estado financiero */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <PieChart className="h-8 w-8 text-primary" />
            Análisis Financiero
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Resumen completo de tu situación financiera
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Estado</p>
          <p
            className={`text-xl font-bold flex items-center gap-2 ${estadoFinanciero.color}`}
          >
            <estadoFinanciero.icon className="h-5 w-5" />
            {estadoFinanciero.estado}
          </p>
        </div>
      </div>

      {/* Cards principales en grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Ingresos */}
        <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Ingresos
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(totalIngresos, currency)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Base mensual</p>
          </CardContent>
        </Card>

        {/* Total Gastos */}
        <Card
          className="border-red-500/20 bg-linear-to-br from-red-500/5 to-transparent animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ animationDelay: "50ms" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Gastos
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(totalGastos, currency)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {tasaGasto.toFixed(1)}% de ingresos
            </p>
          </CardContent>
        </Card>

        {/* Balance */}
        <Card
          className={`${
            isPositive
              ? "border-green-500/20 bg-linear-to-br from-green-500/5"
              : "border-orange-500/20 bg-linear-to-br from-orange-500/5"
          } to-transparent animate-in fade-in slide-in-from-bottom-2 duration-300`}
          style={{ animationDelay: "100ms" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Balance Final
              </CardTitle>
              <div
                className={`h-8 w-8 rounded-lg ${
                  isPositive ? "bg-green-500/10" : "bg-orange-500/10"
                } flex items-center justify-center`}
              >
                <Wallet
                  className={`h-4 w-4 ${
                    isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            >
              {formatCurrency(balance, currency)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {porcentajeAhorro.toFixed(1)}% ahorro
            </p>
          </CardContent>
        </Card>

        {/* Tasa de Gasto */}
        <Card
          className="border-blue-500/20 bg-linear-to-br from-blue-500/5 to-transparent animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ animationDelay: "150ms" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Eficiencia
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center"></div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {(100 - tasaGasto).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Capacidad de ahorro
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Desglose detallado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución de Gastos */}
        <Card className="border-border/40 shadow-lg animate-in fade-in slide-in-from-left-4 duration-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Distribución de Gastos
            </CardTitle>
            <CardDescription>
              Cómo se dividen tus gastos mensuales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Gastos Fijos */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gastos Fijos</span>
                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(totalGastosFijos, currency)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-red-600 dark:bg-red-400 transition-all duration-500 rounded-full"
                  style={{ width: `${porcentajeGastosFijos}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {porcentajeGastosFijos.toFixed(1)}% de tus ingresos
              </p>
            </div>

            {/* Gastos Variables */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gastos Variables</span>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                  {formatCurrency(totalGastosVariables, currency)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-orange-600 dark:bg-orange-400 transition-all duration-500 rounded-full"
                  style={{ width: `${porcentajeGastosVariables}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {porcentajeGastosVariables.toFixed(1)}% de tus ingresos
              </p>
            </div>

            {/* Ahorro/Balance */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ahorro/Balance</span>
                <span
                  className={`text-sm font-bold ${
                    isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {formatCurrency(balance, currency)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${
                    isPositive
                      ? "bg-green-600 dark:bg-green-400"
                      : "bg-red-600 dark:bg-red-400"
                  } transition-all duration-500 rounded-full`}
                  style={{ width: `${Math.abs(porcentajeAhorro)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {porcentajeAhorro.toFixed(1)}% de tus ingresos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Resumen y Recomendaciones */}
        <Card className="border-border/40 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Análisis y Recomendaciones
            </CardTitle>
            <CardDescription>
              Insights sobre tu salud financiera
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Estado actual */}
            <div
              className={`p-4 rounded-lg ${
                balance > totalIngresos * 0.2
                  ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900"
                  : balance > 0
                  ? "bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900"
                  : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
              }`}
            >
              <div className="flex items-start gap-3">
                <estadoFinanciero.icon
                  className={`h-5 w-5 mt-0.5 ${estadoFinanciero.color}`}
                />
                <div>
                  <h4 className="font-semibold text-sm mb-1">
                    Estado: {estadoFinanciero.estado}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {balance > totalIngresos * 0.2
                      ? "¡Excelente! Estás ahorrando más del 20% de tus ingresos."
                      : balance > 0
                      ? "Tu balance es positivo, pero podrías mejorar tu capacidad de ahorro."
                      : "⚠️ Estás gastando más de lo que ingresas. Es momento de ajustar gastos."}
                  </p>
                </div>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">📊 Métricas Clave</h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Gastos Fijos</p>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    {porcentajeGastosFijos.toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {porcentajeGastosFijos > 50 ? "⚠️ Alto" : "✅ Saludable"}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">
                    Gastos Variables
                  </p>
                  <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {porcentajeGastosVariables.toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {porcentajeGastosVariables > 30
                      ? "⚠️ Alto"
                      : "✅ Controlado"}
                  </p>
                </div>
              </div>

              {/* Consejos */}
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                <p className="text-xs font-medium mb-2">💡 Consejo del mes:</p>
                <p className="text-xs text-muted-foreground">
                  {porcentajeGastosFijos > 50
                    ? "Tus gastos fijos son altos. Considera negociar servicios o buscar alternativas más económicas."
                    : porcentajeGastosVariables > 30
                    ? "Tus gastos variables están elevados. Revisa compras innecesarias y establece un presupuesto mensual."
                    : balance < 0
                    ? "Estás en déficit. Prioriza recortar gastos variables y busca fuentes adicionales de ingreso."
                    : "¡Vas por buen camino! Mantén tus hábitos de ahorro y considera invertir tu excedente."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
