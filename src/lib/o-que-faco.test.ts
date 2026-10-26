import { describe, expect, it } from "vitest";
import { pt } from "@/conteudo/pt";
import { en } from "@/conteudo/en";

describe("EST-71 \"O que eu faço\" generalista, para recrutador", () => {
  // Matheus, 2026-10-26: "seja mais generalista, tipo não fale do Solvered e nem fale que eu uso React"
  for (const [idioma, t] of [["pt", pt], ["en", en]] as const) {
    it(`EST-71 (${idioma}) sem nome de projeto nem de framework`, () => {
      const textos = t.sobre.oQueFaco.itens.map((i) => i.texto).join(" ");
      expect(textos).not.toMatch(/Solvered|Morro Alto|React|Next\.js|CSS/i);
      expect(t.sobre.oQueFaco.itens).toHaveLength(3);
    });
  }
});

describe("EST-72 trajetória mais completa na Morro Alto e no robô", () => {
  // Matheus, 2026-10-26: "complete mais na trajetória do robô e da Morro Alto"
  const tudo = (i: number, t = pt) => [t.sobre.trajetoria.itens[i].texto, ...t.sobre.trajetoria.itens[i].destaques].join(" ");
  it("EST-72 a Morro Alto conta o que foi entregue e como (sites, sistemas, testes antes do código)", () => {
    expect(tudo(1)).toMatch(/[Ss]istema interno/);
    expect(tudo(1)).toMatch(/testes escritos antes do código/);
    expect(tudo(1, en)).toMatch(/tests written before the code/);
  });
  it("EST-72 o robô diz o tamanho da equipe e a parte dele (montagem, soldagem, firmware, manual)", () => {
    for (const termo of ["equipe de cinco", "soldagem", "firmware", "manual"]) expect(tudo(2).toLowerCase()).toContain(termo.toLowerCase());
  });
});

describe("EST-73/EST-74 Sobre com profundidade na medida (nem raso, nem enorme)", () => {
  // EST-73: "deixe mais completo, ainda está muito raso"; EST-74: "colocou muita coisa … nem muito grande, nem muito pequena"
  const palavras = (s: string) => s.split(/\s+/).filter(Boolean).length;
  it("EST-74 cada cartão de \"O que eu faço\": uma frase curta e 2 pontos, iguais no pt e no en, sem framework nem projeto", () => {
    pt.sobre.oQueFaco.itens.forEach((it, i) => {
      expect(palavras(it.texto)).toBeLessThanOrEqual(16);
      expect(it.pontos).toHaveLength(2);
      for (const p of it.pontos) expect(palavras(p)).toBeLessThanOrEqual(14);
      expect(en.sobre.oQueFaco.itens[i].pontos).toHaveLength(2);
      expect(it.pontos.join(" ")).not.toMatch(/Solvered|React|Next\.js/);
    });
  });
  it("EST-74 a Morro Alto e o robô: uma frase e 3 entregas cada, iguais no pt e no en", () => {
    for (const i of [1, 2]) {
      const it = pt.sobre.trajetoria.itens[i];
      expect(palavras(it.texto)).toBeLessThanOrEqual(30);
      expect(it.destaques).toHaveLength(3);
      for (const d of it.destaques) expect(palavras(d)).toBeLessThanOrEqual(18);
    }
    pt.sobre.trajetoria.itens.forEach((it, i) => expect(en.sobre.trajetoria.itens[i].destaques).toHaveLength(it.destaques.length));
  });
  it("EST-74 colunas equilibradas: certificado à esquerda, história e trajetória à direita, \"O que eu faço\" em faixa de largura total", async () => {
    const { readFileSync } = await import("node:fs");
    const p = readFileSync("src/componentes/Pagina.tsx", "utf8");
    const esq = p.slice(p.indexOf('className="sobre-esq"'), p.indexOf('className="sobre-col"'));
    expect(esq).toMatch(/className="certificado"/);
    expect(esq).not.toMatch(/className="faco"/);
    expect(p.indexOf('className="sobre-faco"')).toBeGreaterThan(p.indexOf('className="sobre-trajetoria"'));
    const css = readFileSync("src/app/estilos.css", "utf8");
    expect(css).toMatch(/\.sobre-faco\{grid-column:1\/-1/);
    expect(p).toMatch(/className="faco-pontos"/);
    expect(p).toMatch(/className="lt-destaques"/);
  });
});
