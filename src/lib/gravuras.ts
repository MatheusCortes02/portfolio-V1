// Tamanhos responsivos das gravuras (EST-26): variantes geradas por ferramentas/preparar_midia.py --variantes.

export const LARGURAS_VARIANTES = [480, 800, 1200] as const;
export type Tinta = "papel" | "preto";
export type Formato = "webp" | "avif";

/** Larguras servidas: as variantes menores que o original e o próprio original. */
export function largurasDe(original: number): number[] {
  return [...LARGURAS_VARIANTES.filter((l) => l < original), original];
}

/** Caminho público de uma variante; `null` é o original (sem sufixo de largura). */
export function arquivoGravura(g: string, tinta: Tinta, largura: number | null, formato: Formato): string {
  return `/midia/gravuras/${g}-${tinta}${largura ? `-${largura}` : ""}.${formato}`;
}

export function srcsetGravura(g: string, tinta: Tinta, original: number, formato: Formato): string {
  return largurasDe(original).map((l) => `${arquivoGravura(g, tinta, l === original ? null : l, formato)} ${l}w`).join(", ");
}

// largura em tela de cada uso (estilos.css); nas preguiçosas o navegador usa a largura real (`auto`) e isto é a reserva
const TAMANHOS: [string, string][] = [
  ["moldura-h", "(max-width: 1562px) 96vw, 1500px"],
  ["moldura-v", "(max-width: 552px) 94vw, 520px"],
  ["menu-moldura", "(max-width: 1250px) 96vw, 1200px"],
  ["s-camera", "(max-width: 860px) 120px, 320px"],
  ["s-cadeado", "(max-width: 860px) 100px, 250px"],
  ["cofre-img", "(max-width: 860px) 178vw, (max-width: 1400px) 100vw, 1400px"],
  ["cab-gravura", "180px"],
  ["certificado-moldura", "(max-width: 1100px) 620px, 45vw"],
  ["olho-palpebra", "(max-width: 860px) 100vw, 45vw"],
];

export function tamanhosGravura(className: string, preguicosa: boolean): string {
  const classes = className.split(/\s+/);
  const reserva = TAMANHOS.find(([c]) => classes.includes(c))?.[1] ?? "100vw";
  return preguicosa ? `auto, ${reserva}` : reserva;
}
