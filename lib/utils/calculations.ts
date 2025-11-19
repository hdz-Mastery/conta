import { formatCurrencyWithCode, type CurrencyCode } from "./currencies";

export function formatCRC(value: number): string {
  return formatCurrencyWithCode(value, "CRC");
}

/**
 * Formatea un número a moneda USD
 */
export function formatUSD(value: number): string {
  return formatCurrencyWithCode(value, "USD");
}

/**
 * Formatea un número a moneda según el código proporcionado
 */
export function formatCurrency(value: number, currencyCode: CurrencyCode = "CRC"): string {
  return formatCurrencyWithCode(value, currencyCode);
}

/**
 * Nombres de meses en español
 */
export const MESES_NOMBRES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/**
 * Nombres cortos de meses
 */
export const MESES_CORTOS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

/**
 * Obtiene el nombre del mes
 */
export function getNombreMes(mes: number, corto = false): string {
  const nombres = corto ? MESES_CORTOS : MESES_NOMBRES;
  return nombres[mes - 1] || "";
}
