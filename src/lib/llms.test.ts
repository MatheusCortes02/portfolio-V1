import { describe, expect, it } from "vitest";
import { certificacoes } from "@/conteudo/certificacoes";
import { projetos } from "@/conteudo/projetos";
import { pt } from "@/conteudo/pt";
import { EMAIL, SITE_URL } from "./site";
import { gerarLlms, gerarLlmsFull } from "./llms";

describe("EST-41 llms.txt", () => {
  const txt = gerarLlms([]);

  it("EST-41: segue o formato llmstxt.org (título, resumo em citação, seções)", () => {
    const linhas = txt.split("\n");
    expect(linhas[0]).toBe("# Matheus Cortes");
    expect(linhas.find((l) => l.startsWith("> "))).toBeTruthy();
    expect(txt.indexOf("> ")).toBeLessThan(txt.indexOf("\n## "));
    expect(txt).toMatch(/\n## Páginas\n/);
    expect(txt).toMatch(/\n## Projetos\n/);
    expect(txt).toMatch(/\n## Perfis\n/);
  });

  it("EST-41: todos os links são absolutos e incluem / e /en", () => {
    const links = [...txt.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
    expect(links.length).toBeGreaterThan(5);
    for (const l of links) expect(l).toMatch(/^(https:\/\/|mailto:)/);
    expect(links).toContain(`${SITE_URL}/`);
    expect(links).toContain(`${SITE_URL}/en`);
    expect(links).toContain(`${SITE_URL}/llms-full.txt`);
  });

  it("EST-41: cada projeto aparece com uma linha", () => {
    for (const p of projetos) {
      const linha = txt.split("\n").find((l) => l.startsWith(`- [${p.titulo.pt}]`) || l.startsWith(`- ${p.titulo.pt}:`));
      expect(linha, p.slug).toBeTruthy();
      expect(linha).toContain(p.resumo.pt);
    }
  });

  it("EST-41: currículos entram quando existem", () => {
    expect(txt).not.toContain("/curriculo/");
    expect(gerarLlms(["curriculo-pt.pdf"])).toContain(`${SITE_URL}/curriculo/curriculo-pt.pdf`);
  });
});

describe("EST-41 llms-full.txt", () => {
  const full = gerarLlmsFull([]);

  it("EST-41: traz sobre, experiência, projetos completos, certificações, tecnologias e contato", () => {
    expect(full.startsWith("# Matheus Cortes")).toBe(true);
    for (const p of pt.sobre.paragrafos) expect(full).toContain(p);
    for (const t of pt.sobre.trajetoria.itens) expect(full).toContain(t.titulo);
    for (const p of projetos) {
      expect(full).toContain(p.titulo.pt);
      expect(full).toContain(p.desafio.pt);
      expect(full).toContain(p.solucao.pt);
      expect(full).toContain(p.resultado.pt);
    }
    for (const c of certificacoes) {
      expect(full).toContain(c.titulo.pt);
      expect(full).toContain(c.emissor);
    }
    for (const g of pt.sobre.tecnologias.grupos) for (const i of g.itens) expect(full).toContain(i);
    expect(full).toContain(EMAIL);
  });

  it("EST-41: aponta a versão em inglês", () => {
    expect(full).toContain(`${SITE_URL}/en`);
  });
});
