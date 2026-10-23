import type { Idioma } from "@/conteudo/tipos";

/** Idiomas do site, na ordem do menu suspenso (EST-20). O nome fica na própria língua. */
export const IDIOMAS: readonly { codigo: Idioma; nome: string; sigla: string; rota: string; lang: string }[] = [
  { codigo: "pt", nome: "Português", sigla: "PT", rota: "/", lang: "pt-BR" },
  { codigo: "en", nome: "English", sigla: "EN", rota: "/en", lang: "en" },
];

/** Rota do idioma escolhido mantendo a seção atual (`location.hash`). */
export function rotaDoIdioma(destino: Idioma, hash = ""): string {
  const rota = IDIOMAS.find((i) => i.codigo === destino)!.rota;
  const secao = hash.replace(/^#/, "");
  return secao ? `${rota}#${secao}` : rota;
}

/** Próxima opção focada no menu ao apertar uma tecla: setas dão a volta; Home e End vão às pontas. */
export function opcaoVizinha(atual: number, tecla: string, total: number): number {
  if (tecla === "ArrowDown") return (atual + 1) % total;
  if (tecla === "ArrowUp") return (atual - 1 + total) % total;
  if (tecla === "Home") return 0;
  if (tecla === "End") return total - 1;
  return atual;
}
