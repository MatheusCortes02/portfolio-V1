// "A vida de uma cédula" (docs/animacoes-magnific.md; spec 003, EST-46 a EST-49): regras puras das animações.
// Em 2026-10-23 saíram do site o Ato I (EST-46) e o Ato II (EST-47); fica o Ato III. Na 2ª leva do Blender (EST-56 a
// EST-59) entram a chuva de notas, o cofre, a fita de cotação e a contadora (tela de carregamento).

/** EST-59 (2026-10-23, pedido do Matheus: "toda vez que o site recarregar ou entrar novamente deve ter a animação de
 *  loading"): a tela aparece em toda carga e recarga da página; nunca com movimento reduzido. Navegação por âncora não
 *  recarrega a página, então não a mostra. Autossuficiente: também roda como texto no script anterior à hidratação. */
export function mostrarAbertura(reduzido: boolean): boolean {
  return !reduzido;
}

/** EST-59: velocidade do vídeo da contadora (5 s → 4 s) e prazo máximo da tela, contado do início da navegação
 *  (a cobertura sai ao fim do vídeo ou neste prazo). */
export const ATO1 = { velocidade: 1.25, prazoMs: 4800 } as const;

/** EST-49: mídia do Ato III. Nome novo a cada versão: o cache serve a antiga pelo mesmo nome. */
export const ATO3_MIDIA = {
  webm: "/midia/animacoes/ato3/autenticacao-v2.webm",
  mp4: "/midia/animacoes/ato3/autenticacao-v2.mp4",
  inicio: "/midia/animacoes/ato3/inicio-v2.webp",
  fim: "/midia/animacoes/ato3/fim-v2.webp",
} as const;

/** EST-49: "pronto" = pode tocar na próxima entrada; "tocou" = já tocou desde a última vez que a ficha saiu da tela. */
export type EstadoDoSelo = "pronto" | "tocou";
export type AcaoDoSelo = "tocar" | "rebobinar" | null;

/** EST-49: a cada aviso do IntersectionObserver (limiares 0 e 0,5): toca ao entrar com 50% visível; ao sair inteira
 *  da tela, volta ao quadro 0 e fica pronta para tocar de novo; oscilar em volta de 50% sem sair não repete. */
export function passoDoSelo(estado: EstadoDoSelo, e: { visivel: boolean; razao: number }): { estado: EstadoDoSelo; acao: AcaoDoSelo } {
  if (!e.visivel) return { estado: "pronto", acao: estado === "tocou" ? "rebobinar" : null };
  if (estado === "pronto" && e.razao >= 0.5) return { estado: "tocou", acao: "tocar" };
  return { estado, acao: null };
}

/** EST-56 a EST-59: mídia de um vídeo animado (WebM + MP4 e pôsteres do 1º e do último quadro). Nome com versão. */
export type MidiaVideo = { readonly webm: string; readonly mp4: string; readonly inicio: string; readonly fim: string };
const midia = (nome: string, v = 1): MidiaVideo => {
  const base = `/midia/animacoes/${nome}/${nome}-v${v}`;
  return { webm: `${base}.webm`, mp4: `${base}.mp4`, inicio: `${base}-inicio.webp`, fim: `${base}-fim.webp` };
};
/** EST-56: chuva de notas MC no fundo da abertura (loop, 1280 × 720). */
export const CHUVA_MIDIA = midia("chuva");
/** EST-57: cofre com segredo no Registro (toca uma vez a cada passagem, 1280 × 720). */
export const COFRE_MIDIA = midia("cofre");
/** EST-58: fita de cotação na Atividade (loop, 960 × 540). */
export const FITA_MIDIA = midia("fita");
/** EST-59: contadora de cédulas na tela de carregamento (960 × 540). */
export const CONTADORA_MIDIA = midia("contadora");

export type ModoVideo = "loop" | "uma-vez";

/** EST-56 a EST-58: com movimento reduzido nada toca; o pôster é o 1º quadro nos loops e o último nos de tocar uma
 *  vez; sem pôster quando o vídeo é só fundo (a chuva). */
export function posterReduzido(modo: ModoVideo, m: MidiaVideo, comPoster = true): string | null {
  if (!comPoster) return null;
  return modo === "uma-vez" ? m.fim : m.inicio;
}

/** EST-56/EST-58: o loop toca só enquanto está na tela. */
export function passoDoLoop(visivel: boolean): "tocar" | "pausar" {
  return visivel ? "tocar" : "pausar";
}

/** EST-57: marca persistente (localStorage) gravada pelo Registro quando o visitante registra a entrada, e o evento que
 *  avisa o cofre na mesma página. */
export const REGISTRO_CHAVE = "mc-registro";
export const REGISTRO_EVENTO = "registro:feito";

/** EST-57: quem já registrou a entrada vê o cofre aberto (último quadro), sem tocar de novo. */
export function cofreAberto(valor: string | null): boolean {
  return valor === "1";
}

/** EST-57: no momento do registro, o cofre termina aberto e fica aberto: se está tocando, deixa terminar; senão, vai
 *  direto ao último quadro. */
export function acaoAoRegistrar(tocando: boolean): "deixar-terminar" | "ir-ao-fim" {
  return tocando ? "deixar-terminar" : "ir-ao-fim";
}
