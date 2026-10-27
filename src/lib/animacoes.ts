// "A vida de uma cédula" (docs/animacoes-magnific.md; spec 003, EST-46 a EST-49): regras puras das animações.
// Em 2026-10-23 saíram do site o Ato I (EST-46) e o Ato II (EST-47); fica o Ato III. Na 2ª leva do Blender (EST-56 a
// EST-59) entram a chuva de notas, o cofre, a fita de cotação e a contadora (tela de carregamento). Em 2026-10-26 a chuva
// sai e entra o hero gravado (EST-65).

/** EST-59 (2026-10-23, pedido do Matheus: "toda vez que o site recarregar ou entrar novamente deve ter a animação de
 *  loading"): a tela aparece em toda carga e recarga da página; nunca com movimento reduzido. Navegação por âncora não
 *  recarrega a página, então não a mostra. Autossuficiente: também roda como texto no script anterior à hidratação. */
export function mostrarAbertura(reduzido: boolean): boolean {
  return !reduzido;
}

/** EST-59: velocidade do vídeo da contadora e prazo máximo da tela, contado do início da navegação (a cobertura sai
 *  ao fim do vídeo ou neste prazo). EST-63 (2026-10-26, Matheus: "não precisa ter um final na tela de carregamento"):
 *  a v2 termina no visor em 100, antes da cédula sair da máquina — 3,875 s (93 quadros), ~3,1 s a 1,25×. */
export const ATO1 = { velocidade: 1.25, prazoMs: 4800, duracaoMs: 3875 } as const;

/** EST-49: mídia do Ato III. Nome novo a cada versão: o cache serve a antiga pelo mesmo nome. */
export const ATO3_MIDIA = {
  webm: "/midia/animacoes/ato3/autenticacao-v3.webm",
  mp4: "/midia/animacoes/ato3/autenticacao-v3.mp4",
  inicio: "/midia/animacoes/ato3/autenticacao-v3-inicio.webp",
  fim: "/midia/animacoes/ato3/autenticacao-v3-fim.webp",
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
/** EST-65: hero gravado no Blender (substitui a chuva de notas do EST-56), na resolução da moldura (1536 × 1024):
 *  a gravação a buril toca uma vez ao sair a tela de carregamento e termina igual à moldura parada; o ciclo das
 *  rosáceas começa nesse mesmo quadro e se repete sem emenda. */
export const HERO_INTRO_MIDIA = midia("hero-gravura");
export const HERO_LOOP_MIDIA = midia("hero-rosaceas");

/** EST-65: evento da tela de carregamento quando ela começa a sair (o hero começa a gravar por baixo do esmaecimento). */
export const CARREGANDO_FIM = "carregando:fim";
/** EST-65: duração do esmaecimento da tela de carregamento; a gravação mostra o papel em branco durante ele e só então
 *  começa, para ser vista inteira. */
export const SAIDA_CARREGANDO_MS = 750;
/** EST-65: duração da gravação (96 quadros a 24 fps). */
export const HERO_INTRO_MS = 4000;
/** EST-66 (Matheus, 2026-10-26: "só quero que permita rolagem quando a animação do hero for concluída"): a página fica
 *  sem rolar enquanto a gravação toca; por segurança, a trava cai sozinha neste prazo (esmaecimento + gravação + 1,5 s),
 *  mesmo que o vídeo engasgue. */
export function travaMaximaDoHero(): number {
  return SAIDA_CARREGANDO_MS + HERO_INTRO_MS + 1500;
}

/** EST-65: ao fim do carregamento, a gravação só toca se já pode tocar e a abertura está na tela; senão a moldura fica
 *  parada (como sempre foi) e o hero vai direto ao ciclo das rosáceas. */
export function inicioDoHero(e: { introPronta: boolean; visivel: boolean }): "intro" | "loop" {
  return e.introPronta && e.visivel ? "intro" : "loop";
}

/** EST-65: ao fim da gravação, o ciclo entra no mesmo quadro; se ainda não carregou, a moldura parada espera por ele. */
export function aoFimDaIntro(loopPronto: boolean): "loop" | "esperar-loop" {
  return loopPronto ? "loop" : "esperar-loop";
}
/** EST-57: cofre com segredo no Registro (toca uma vez a cada passagem, 1280 × 720). */
export const COFRE_MIDIA = midia("cofre", 3); // EST-69: papel e bordas já na imagem; EST-75: v3 em 1920 × 1080 (render novo)
/** EST-58: fita de cotação na Atividade (loop, 960 × 540). */
export const FITA_MIDIA = midia("fita", 2); // EST-69: idem
/** EST-59/EST-63: contadora de cédulas na tela de carregamento (960 × 540; v2 sem a cédula final). */
export const CONTADORA_MIDIA = midia("contadora", 2);

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

/** EST-57/EST-89: evento com que o Registro avisa o cofre, na mesma página, que a entrada foi registrada. Nada fica
 *  guardado no navegador (2026-10-27: "não quero" que o cofre fique salvo); na próxima visita ele anima de novo. */
export const REGISTRO_EVENTO = "registro:feito";

/** EST-57: no momento do registro, o cofre termina aberto e fica aberto: se está tocando, deixa terminar; senão, vai
 *  direto ao último quadro. */
export function acaoAoRegistrar(tocando: boolean): "deixar-terminar" | "ir-ao-fim" {
  return tocando ? "deixar-terminar" : "ir-ao-fim";
}
