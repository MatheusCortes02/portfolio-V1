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

/** EST-82: sem mouse (celular), a íris segue a rolagem: com o olho abaixo do meio da tela ela olha para cima (para o
 *  texto que já passou), acima do meio olha para baixo; no meio, reto. `centroY` é o centro do olho na tela. */
export function olharPelaRolagem(centroY: number, alturaTela: number): { x: number; y: number } {
  const meio = alturaTela / 2;
  if (meio <= 0) return { x: 0, y: 0 };
  const t = Math.max(-1, Math.min(1, (centroY - meio) / meio));
  return { x: 0, y: -t * OLHO_ALCANCE.y || 0 };
}
