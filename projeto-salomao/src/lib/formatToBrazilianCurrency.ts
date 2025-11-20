const LANG = "pt-BR";
const CURRENCY = "BRL";

export function formatToBrazilianCurrency(value: number): string {
  return value.toLocaleString(LANG, {
    style: "currency",
    currency: CURRENCY,
  });
}
