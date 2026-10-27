// EST-79 a EST-81: carrosséis de deslizar no celular (projetos, "O que eu faço", certificações).

/** Número (1 a total) do cartão mais à esquerda visível, a partir do deslocamento da lista e da distância entre cartões. */
export function indiceDoCarrossel(scrollLeft: number, passo: number, total: number): number {
  if (passo <= 0 || total <= 0) return 1;
  return Math.min(total, Math.max(1, Math.round(scrollLeft / passo) + 1));
}
