"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/calculations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Income } from "@/types";
import type { CurrencyCode } from "@/lib/utils/currencies";

interface IncomesTableProps {
  incomes: Income[];
  onAdd: (income: Omit<Income, "id" | "createdAt">) => Promise<void>;
  onUpdate: (id: string, income: Partial<Income>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  currentMonth: string;
  currency: CurrencyCode;
}

export function IncomesTable({ incomes, onAdd, onUpdate, onDelete, currentMonth, currency }: IncomesTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    fecha: "",
    fuenteIngreso: "",
    categoria: "",
    cantidad: "",
  });

  const handleAdd = async () => {
    if (!newRow.fecha || !newRow.fuenteIngreso || !newRow.categoria || !newRow.cantidad) {
      return;
    }

    await onAdd({
      clerkId: "", // Will be filled by server action
      fecha: newRow.fecha,
      fuenteIngreso: newRow.fuenteIngreso,
      categoria: newRow.categoria,
      cantidad: newRow.cantidad,
      mes: currentMonth,
    });

    setNewRow({ fecha: "", fuenteIngreso: "", categoria: "", cantidad: "" });
    setIsOpen(false);
  };

  const handleUpdate = async (id: string, field: keyof Income, value: string) => {
    await onUpdate(id, { [field]: value });
  };

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 animate-in zoom-in duration-300">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Ingresos</h2>
            <p className="text-xs text-muted-foreground">Total: <span className="font-bold text-primary">
              {formatCurrency(
                incomes.reduce((sum, inc) => sum + parseFloat(inc.cantidad), 0),
                currency
              )}
            </span></p>
          </div>
        </div>

        {/* Botón agregar siempre visible */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in zoom-in duration-300"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Agregar</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md animate-in zoom-in duration-300">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary to-primary/60 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                Nuevo Ingreso
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
                <label className="text-sm font-medium">Fuente de Ingreso</label>
                <Input
                  value={newRow.fuenteIngreso}
                  onChange={(e) => setNewRow({ ...newRow, fuenteIngreso: e.target.value })}
                  placeholder="Ej: Salario, Freelance"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <Input
                  value={newRow.categoria}
                  onChange={(e) => setNewRow({ ...newRow, categoria: e.target.value })}
                  placeholder="Ej: Trabajo, Inversión"
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
                  disabled={!newRow.fecha || !newRow.fuenteIngreso || !newRow.categoria || !newRow.cantidad}
                  className="flex-1 bg-primary hover:bg-primary/90"
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
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fuente</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Categoría</th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cantidad</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {incomes.map((income) => (
                <tr key={income.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-3 py-2">
                    <Input
                      type="date"
                      defaultValue={income.fecha}
                      onBlur={(e) => handleUpdate(income.id, "fecha", e.target.value)}
                      className="h-9 text-sm border-0 focus-visible:ring-1 bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      defaultValue={income.fuenteIngreso}
                      onBlur={(e) => handleUpdate(income.id, "fuenteIngreso", e.target.value)}
                      placeholder="Ej: Salario"
                      className="h-9 text-sm border-0 focus-visible:ring-1 bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2 hidden md:table-cell">
                    <Input
                      defaultValue={income.categoria}
                      onBlur={(e) => handleUpdate(income.id, "categoria", e.target.value)}
                      placeholder="Ej: Trabajo"
                      className="h-9 text-sm border-0 focus-visible:ring-1 bg-transparent"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <Input
                      type="number"
                      step="0.01"
                      defaultValue={income.cantidad}
                      onBlur={(e) => handleUpdate(income.id, "cantidad", e.target.value)}
                      className="h-9 text-sm border-0 focus-visible:ring-1 bg-transparent text-right font-semibold"
                    />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(income.id)}
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

      {incomes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm animate-in fade-in duration-500">
          <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-20" />
          <p>No hay ingresos registrados</p>
          <p className="text-xs">Haz clic en &quot;Agregar&quot; para comenzar</p>
        </div>
      )}
    </div>
  );
}
