// Cálculos da rolagem: seção sob a faixa de serial (EST-13) e atraso das entradas em sequência (EST-14).
export function secaoAtiva(secoes: { id: string; topo: number }[], linha: number): string | undefined {
  let atual = secoes[0]?.id;
  for (const s of secoes) if (s.topo <= linha) atual = s.id;
  return atual;
}

export function atrasoEscalonado(indice: number): number {
  return Math.min(indice, 6) * 90;
}

/** rootMargin do IntersectionObserver que reduz a tela a uma linha de 1 px na altura da faixa (EST-28). */
export function linhaDeLeitura(linha: number, altura: number): string {
  const topo = Math.max(0, Math.min(linha, altura - 1));
  const px = (n: number) => (n > 0 ? `-${n}px` : "0px");
  return `${px(topo)} 0px ${px(Math.max(0, altura - topo - 1))} 0px`;
}

/** EST-61: depois que a lista de projetos encolhe ("Ver menos"), a rolagem que deixa o botão na mesma altura da tela
 *  em que foi clicado (`antes` e `depois` são o topo do botão na tela, antes e depois de encolher). */
export function manterNaTela(rolagem: number, antes: number, depois: number): number {
  return Math.max(0, Math.round(rolagem + depois - antes));
}
