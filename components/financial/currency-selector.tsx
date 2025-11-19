"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY_LIST, type CurrencyCode } from "@/lib/utils/currencies";
import { updateUserCurrency } from "@/actions/userActions";
import { toast } from "sonner";


interface CurrencySelectorProps {
  currentCurrency: CurrencyCode;
}

export function CurrencySelector({ currentCurrency }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(currentCurrency);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateUserCurrency(selectedCurrency);
        toast.success(`Moneda actualizada a ${CURRENCY_LIST.find(c => c.code === selectedCurrency)?.name}`);
        setIsOpen(false);
        // Recargar la página para aplicar los cambios
        window.location.reload();
      } catch (error) {
        toast.error("Error al actualizar la moneda");
        console.error(error);
      }
    });
  };

  const currentCurrencyInfo = CURRENCY_LIST.find(c => c.code === currentCurrency);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-primary/10"
        >
       
          <span className="hidden sm:inline">{currentCurrencyInfo?.symbol}</span>
          <span className="text-xs text-muted-foreground hidden md:inline">
            {currentCurrencyInfo?.code}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
   
            Cambiar Moneda
          </DialogTitle>
          <DialogDescription>
            Selecciona la moneda que usarás en toda la aplicación
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Moneda Preferida</label>
            <Select
              value={selectedCurrency}
              onValueChange={(value) => setSelectedCurrency(value as CurrencyCode)}
            >
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {CURRENCY_LIST.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg">{currency.symbol}</span>
                      <div>
                        <p className="font-medium">{currency.code}</p>
                        <p className="text-xs text-muted-foreground">
                          {currency.name}
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium mb-1">Vista Previa:</p>
            <p className="text-2xl font-bold text-primary">
              {CURRENCY_LIST.find(c => c.code === selectedCurrency)?.symbol}
              {(1234567.89).toLocaleString(
                CURRENCY_LIST.find(c => c.code === selectedCurrency)?.locale,
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              )}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending || selectedCurrency === currentCurrency}
              className="flex-1"
            >
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
