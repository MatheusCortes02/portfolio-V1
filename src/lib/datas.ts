import type { Idioma } from "@/conteudo/tipos";

/** Meses de experiência contando o mês de início e o atual, como o LinkedIn ("mai. de 2026 – o momento · 6 meses"). */
export function mesesDesde(inicio: string, hoje: Date = new Date()): number {
  const [ano, mes] = inicio.split("-").map(Number);
  return (hoje.getUTCFullYear() - ano) * 12 + (hoje.getUTCMonth() + 1 - mes) + 1;
}

export function duracao(meses: number, idioma: Idioma): string {
  if (idioma === "pt") return `${meses} ${meses === 1 ? "mês" : "meses"}`;
  return `${meses} ${meses === 1 ? "month" : "months"}`;
}
