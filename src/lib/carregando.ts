// Tela de carregamento (EST-16): número de série do cofre e progresso com desaceleração no fim.
export function progressoDoCofre(decorrido: number, duracao: number): number {
  const p = Math.min(1, Math.max(0, decorrido / duracao));
  return 1 - (1 - p) ** 3;
}

export function serialDoCofre(p: number): string {
  return String(Math.round(Math.min(1, p) * 100)).padStart(3, "0");
}
