// EST-68 (Matheus, 2026-10-26: "quando o mouse está embaixo ele quase não se mexe"): para onde a íris olha.
// Unidades: x em % da largura do olho, y em % da altura (o componente converte para % da íris).

/** Limite da íris: ±34% da largura da íris na horizontal e ±12% na vertical (testado sobre a gravura: a íris
 *  não entra nas pálpebras). Antes o vertical era 1 (≈ 2,6% da íris). */
export const OLHO_ALCANCE = { x: 7.6, y: 4.7 } as const;
const DISTANCIA_PLENA = 500; // px do centro do olho até o movimento chegar ao limite

/** Deslocamento da íris para o ponteiro em (dx, dy) px do centro do olho: elipse dentro do alcance. */
export function olharPara(dx: number, dy: number): { x: number; y: number } {
  const dist = Math.hypot(dx, dy);
  if (dist === 0) return { x: 0, y: 0 };
  const forca = Math.min(1, dist / DISTANCIA_PLENA);
  return { x: (dx / dist) * forca * OLHO_ALCANCE.x, y: (dy / dist) * forca * OLHO_ALCANCE.y };
}
