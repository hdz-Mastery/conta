// Configuración de monedas disponibles

export const CURRENCIES = {
  CRC: {
    code: "CRC",
    symbol: "₡",
    name: "Colón Costarricense",
    locale: "es-CR",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "Dólar Estadounidense",
    locale: "en-US",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    locale: "es-ES",
  },
  MXN: {
    code: "MXN",
    symbol: "$",
    name: "Peso Mexicano",
    locale: "es-MX",
  },
  ARS: {
    code: "ARS",
    symbol: "$",
    name: "Peso Argentino",
    locale: "es-AR",
  },
  CLP: {
    code: "CLP",
    symbol: "$",
    name: "Peso Chileno",
    locale: "es-CL",
  },
  COP: {
    code: "COP",
    symbol: "$",
    name: "Peso Colombiano",
    locale: "es-CO",
  },
  PEN: {
    code: "PEN",
    symbol: "S/",
    name: "Sol Peruano",
    locale: "es-PE",
  },
  BRL: {
    code: "BRL",
    symbol: "R$",
    name: "Real Brasileño",
    locale: "pt-BR",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "Libra Esterlina",
    locale: "en-GB",
  },
  CAD: {
    code: "CAD",
    symbol: "CA$",
    name: "Dólar Canadiense",
    locale: "en-CA",
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Yen Japonés",
    locale: "ja-JP",
  },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const CURRENCY_LIST = Object.values(CURRENCIES);

// Formato de moneda mejorado
export function formatCurrencyWithCode(
  amount: number,
  currencyCode: CurrencyCode = "CRC"
): string {
  const currency = CURRENCIES[currencyCode];
  
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback si hay error con el locale
    return `${currency.symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
