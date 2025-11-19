"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils/calculations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { VariableExpense } from "@/types";
import type { CurrencyCode } from "@/lib/utils/currencies";

interface VariableExpensesTableProps {
  expenses: VariableExpense[];
  onAdd: (expense: Omit<VariableExpense, "id" | "createdAt">) => Promise<void>;
  onUpdate: (id: string, expense: Partial<VariableExpense>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  currentMonth: string;
  currency: CurrencyCode;
}

export function VariableExpensesTable({ expenses, onAdd, onUpdate, onDelete, currentMonth, currency }: VariableExpensesTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    fecha: "",
    fuenteGasto: "",
    cantidad: "",
  });

  const handleAdd = async () => {
    if (!newRow.fecha || !newRow.fuenteGasto || !newRow.cantidad) {
      return;
    }

    await onAdd({
      clerkId: "", // Will be filled by server action
      fecha: newRow.fecha,
      fuenteGasto: newRow.fuenteGasto,
      cantidad: newRow.cantidad,
      mes: currentMonth,
    });

    setNewRow({ fecha: "", fuenteGasto: "", cantidad: "" });
    setIsOpen(false);
  };

  const handleUpdate = async (id: string, field: keyof VariableExpense, value: string) => {
    await onUpdate(id, { [field]: value });
  };

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 animate-in zoom-in duration-300">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Gastos Variables</h2>
            <p className="text-xs text-muted-foreground">Total: <span className="font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(
                expenses.reduce((sum, exp) => sum + parseFloat(exp.cantidad), 0),
                currency
              )}
            </span></p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in zoom-in duration-300"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Agregar</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md animate-in zoom-in duration-300">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-white" />
                </div>
                Nuevo Gasto Variable
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha</label>
                <Input
                  type="date"
                  value={newRow.fecha}
                  onChange={(e) => setNewRow({ ...newRow, fecha: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Concepto</label>
                <Input
                  value={newRow.fuenteGasto}
                  onChange={(e) => setNewRow({ ...newRow, fuenteGasto: e.target.value })}
                  placeholder="Ej: Compras, Entretenimiento"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cantidad (₡)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={newRow.cantidad}
                  onChange={(e) => setNewRow({ ...newRow, cantidad: e.target.value })}
                  placeholder="0.00"
                  className="h-10 text-right"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={!newRow.fecha || !newRow.fuenteGasto || !newRow.cantidad}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                >
                  Agregar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card/50 backdrop-blur overflow-hidden shadow-lg">
        <div className="overflow-x-auto max-h-80 overflow-y-auto custom-scrollbar">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fecha</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Concepto</th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cantidad</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-3 py-2">
                    <Input
                      type="date"
                      defaultValue={expense.fecha}
                      onBlur={(e) => handleUpdate(expense.id, "fecha", e.target.value)}
                      className="h-9 text-sm border-0 focus-visible:ring-1 bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      defaultValue={expense.fuenteGasto}
                      onBlur={(e) => handleUpdate(expense.id, "fuenteGasto", e.target.value)}
                      placeholder="Ej: Entretenimiento"
                      className="h-9 text-sm border-0 focus-visible:ring-1 bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      type="number"
                      step="0.01"
                      defaultValue={expense.cantidad}
                      onBlur={(e) => handleUpdate(expense.id, "cantidad", e.target.value)}
                      className="h-9 text-sm border-0 focus-visible:ring-1 bg-transparent text-right font-semibold"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(expense.id)}
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {expenses.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm animate-in fade-in duration-500">
          <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-20" />
          <p>No hay gastos variables registrados</p>
          <p className="text-xs">Haz clic en &quot;Agregar&quot; para comenzar</p>
        </div>
      )}
    </div>
  );
}
