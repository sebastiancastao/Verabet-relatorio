// pt-BR formatting helpers (dot = thousands, comma = decimals)

export const nf = new Intl.NumberFormat("pt-BR");

export function fmtInt(value: number): string {
  return nf.format(Math.round(value));
}

export function fmtDecimal(value: number, digits = 2): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function fmtPct(value: number, digits = 1): string {
  return `${fmtDecimal(value, digits)}%`;
}

export function fmtCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${fmtDecimal(value / 1_000_000, 2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${fmtDecimal(value / 1_000, 0)}k`;
  }
  return fmtInt(value);
}

export function fmtBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
