// Teclado e foco (spec 003, EST-23 e EST-25).

/** Próxima aba no padrão da APG: ←/→ dão a volta, Home/End vão às pontas; outra tecla devolve null. */
export function abaVizinha(atual: number, tecla: string, total: number): number | null {
  if (tecla === "ArrowRight") return (atual + 1) % total;
  if (tecla === "ArrowLeft") return (atual - 1 + total) % total;
  if (tecla === "Home") return 0;
  if (tecla === "End") return total - 1;
  return null;
}

/** Quanto a foto anda com a tecla: as setas são das abas quando o foco está nelas (EST-25); senão, da foto (EST-17). */
export function setaDaFoto(tecla: string, focoNasAbas: boolean): -1 | 0 | 1 {
  if (focoNasAbas) return 0;
  if (tecla === "ArrowRight") return 1;
  if (tecla === "ArrowLeft") return -1;
  return 0;
}

/** Leva o foco ao destino de um link interno (#id), sem rolar: a rolagem fica com o navegador ou o Lenis. */
export function focarDestino(hash: string): boolean {
  const el = document.getElementById(hash.replace(/^#/, ""));
  if (!el) return false;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}
