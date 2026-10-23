import { describe, expect, it } from "vitest";
import { atrasoEscalonado, linhaDeLeitura, secaoAtiva } from "@/lib/rolagem";

const SECOES = [
  { id: "inicio", topo: -2000 }, { id: "projetos", topo: -300 }, { id: "sobre", topo: 40 }, { id: "trilha", topo: 900 },
];

describe("EST-13 seção atual na faixa de serial", () => {
  it("é a última seção cujo topo já passou da linha da faixa", () => {
    expect(secaoAtiva(SECOES, 80)).toBe("sobre");
    expect(secaoAtiva(SECOES, 20)).toBe("projetos");
  });
  it("antes de qualquer seção, devolve a primeira", () => {
    expect(secaoAtiva([{ id: "a", topo: 500 }, { id: "b", topo: 900 }], 80)).toBe("a");
  });
});

describe("EST-14 entrada em sequência", () => {
  it("cresce 90 ms por item e para no 6º passo", () => {
    expect(atrasoEscalonado(0)).toBe(0);
    expect(atrasoEscalonado(2)).toBe(180);
    expect(atrasoEscalonado(20)).toBe(540);
  });
});

describe("EST-28 seção atual por IntersectionObserver", () => {
  it("a área observada é uma linha de 1 px na altura da faixa", () => {
    expect(linhaDeLeitura(72, 823)).toBe("-72px 0px -750px 0px");
    expect(linhaDeLeitura(72, 900)).toBe("-72px 0px -827px 0px");
  });
  it("em tela mais baixa que a faixa, não gera margem negativa inválida", () => {
    expect(linhaDeLeitura(72, 50)).toBe("-49px 0px 0px 0px");
  });
});

describe("EST-61 \"Ver menos\" não teleporta a página", () => {
  // bug de 2026-10-23: "quando clica no botão ver mais e depois no ver menos a seção é teleportada lá para baixo"
  it("rola para que o botão fique na mesma altura da tela em que foi clicado", async () => {
    const { manterNaTela } = await import("./rolagem");
    // botão estava a 600 px do topo da tela com a página em 9000; a lista encolheu e ele subiu para -4400
    expect(manterNaTela(9000, 600, -4400)).toBe(4000);
    expect(manterNaTela(0, 300, 300)).toBe(0);
    expect(manterNaTela(100, 500, 200)).toBe(0); // nunca negativo
  });
});
