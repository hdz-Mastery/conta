"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { MESES_NOMBRES } from "@/lib/utils/calculations";

interface MonthSelectorProps {
  currentMonth: string;
  availableMonths: string[];
  onMonthChange: (month: string) => void;
}

export function MonthSelector({ currentMonth, availableMonths, onMonthChange }: MonthSelectorProps) {

  // Generar opciones de meses para el año actual
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthNum = String(i + 1).padStart(2, "0");
    return `${currentYear}-${monthNum}`;
  });

  const getMonthName = (monthStr: string) => {
    const [y, m] = monthStr.split("-");
    return `${MESES_NOMBRES[parseInt(m) - 1]} ${y}`;
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Período</h3>
            <p className="text-lg font-bold text-foreground">{getMonthName(currentMonth)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={currentMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="w-full sm:w-60 h-11 border-primary/30 focus:ring-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {getMonthName(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {availableMonths.length > 0 && (
            <div className="hidden xl:flex gap-2">
              {availableMonths.slice(0, 3).map((m) => {
                const [y, monthNum] = m.split("-");
                return (
                  <Button
                    key={m}
                    variant={m === currentMonth ? "default" : "outline"}
                    size="sm"
                    onClick={() => onMonthChange(m)}
                    className="text-xs h-9"
                  >
                    {MESES_NOMBRES[parseInt(monthNum) - 1].substring(0, 3)}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
