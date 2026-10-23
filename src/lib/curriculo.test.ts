/* Abertura para quem recruta e currículo em PDF (spec 003, EST-32 e EST-33). */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { certificacoes } from "@/conteudo/certificacoes";
import { en } from "@/conteudo/en";
import { EMAIL, PERFIS } from "@/conteudo/perfis";
import { projetos } from "@/conteudo/projetos";
import { pt } from "@/conteudo/pt";
import { CURRICULO, montarCurriculo } from "./curriculo";

const PUBLICO = join(process.cwd(), "public");

describe("EST-32 abertura para quem recruta", () => {
  it("EST-32 sem etiqueta de disponibilidade na abertura (retirada a pedido do Matheus em 2026-10-22)", () => {
    expect("disponivel" in pt.hero).toBe(false);
    expect("disponivel" in en.hero).toBe(false);
  });
  it("EST-32 linha de metadados: cidade, curso e período", () => {
    expect(pt.hero.metadados).toEqual(["Vitória, ES", "Engenharia de Software, UVV", "2º período"]);
    expect(en.hero.metadados).toEqual(["Vitória, ES, Brazil", "Software Engineering, UVV", "2nd semester"]);
  });
  it("EST-32 ações: baixar currículo, ver projetos, LinkedIn e GitHub", () => {
    expect(pt.hero.baixarCurriculo).toBe("Baixar currículo");
    expect(en.hero.baixarCurriculo).toBe("Download résumé");
    expect(pt.hero.verProjetos).toBe("Ver projetos");
    const nomes = PERFIS.map((p) => p.nome);
    expect(nomes).toContain("LinkedIn");
    expect(nomes).toContain("GitHub");
    for (const p of PERFIS) expect(p.url).toMatch(/^https:\/\//);
  });
});

describe("EST-33 cartão Quem sou e trajetória", () => {
  it("EST-33 foco em desenvolvimento web e cibersegurança, sem jargão", () => {
    expect(pt.sobre.fatos.focoValor).toBe("Desenvolvimento web · Cibersegurança");
    expect(en.sobre.fatos.focoValor).toBe("Web development · Cybersecurity");
  });
  it("EST-33 período atual da graduação escrito como \"atual\"", () => {
    expect(pt.sobre.trajetoria.itens[0].periodo).toBe("2026 – atual · 2º período");
    expect(JSON.stringify(pt)).not.toContain("o momento");
  });
  it("EST-33 nenhum \"em breve\" no currículo", () => {
    expect(JSON.stringify(pt.sobre)).not.toContain("em breve");
    expect(JSON.stringify(en.sobre)).not.toContain("coming soon");
  });
});

describe("EST-33 conteúdo do currículo", () => {
  for (const idioma of ["pt", "en"] as const) {
    const cv = montarCurriculo(idioma);

    it(`EST-33 (${idioma}) seções padrão na ordem`, () => {
      expect(cv.secoes.map((s) => s.titulo)).toEqual(
        idioma === "pt"
          ? ["Contato", "Objetivo", "Formação", "Experiência", "Projetos", "Certificações", "Competências técnicas"]
          : ["Contact", "Objective", "Education", "Experience", "Projects", "Certifications", "Technical skills"],
      );
    });

    it(`EST-33 (${idioma}) contato: e-mail, LinkedIn, GitHub e cidade, sem telefone`, () => {
      expect(cv.contato.email).toBe(EMAIL);
      expect(cv.contato.email).toBe("mb64md@gmail.com");
      expect(cv.contato.linkedin).toBe(PERFIS.find((p) => p.nome === "LinkedIn")!.url);
      expect(cv.contato.github).toBe(PERFIS.find((p) => p.nome === "GitHub")!.url);
      expect(cv.contato.local).toContain("Vitória");
      const tudo = JSON.stringify(cv);
      expect(tudo).not.toMatch(/\(\d{2}\)\s?\d{4,5}-?\d{4}|\+55|telefone|phone|whatsapp/i);
    });

    it(`EST-33 (${idioma}) objetivo: estágio em desenvolvimento ou cibersegurança`, () => {
      expect(cv.objetivo).toMatch(idioma === "pt" ? /estágio.*desenvolvimento.*cibersegurança/i : /internship.*development.*cybersecurity/i);
    });

    it(`EST-33 (${idioma}) formação: Engenharia de Software, UVV, 2º período, início em 2026`, () => {
      expect(cv.formacao.curso).toBe(idioma === "pt" ? "Engenharia de Software" : "Software Engineering");
      expect(cv.formacao.instituicao).toBe("Universidade Vila Velha (UVV)");
      expect(cv.formacao.periodo).toContain("2026");
      expect(cv.formacao.periodo).toMatch(idioma === "pt" ? /2º período/ : /2nd semester/);
    });

    it(`EST-33 (${idioma}) experiência na Morro Alto com 3 a 4 marcos reais`, () => {
      expect(cv.experiencia).toHaveLength(1);
      const xp = cv.experiencia[0];
      expect(xp.empresa).toBe("Morro Alto – Creative Office");
      expect(xp.cargo).toBe(idioma === "pt" ? "Desenvolvimento web" : "Web development");
      expect(xp.periodo).toBe(idioma === "pt" ? "mai.–out. de 2026" : "May–Oct 2026");
      expect(xp.regime).toBe(idioma === "pt" ? "Meio período" : "Part-time");
      expect(xp.marcos.length).toBeGreaterThanOrEqual(3);
      expect(xp.marcos.length).toBeLessThanOrEqual(4);
      // cada marco vem de um projeto feito na agência (nada inventado)
      for (const m of xp.marcos) {
        const p = projetos.find((x) => x.slug === m.projeto);
        expect(p, m.projeto).toBeTruthy();
        expect(p!.credito?.pt ?? "").toContain("Morro Alto");
      }
    });

    it(`EST-33 (${idioma}) 4 a 5 projetos, uma linha cada`, () => {
      expect(cv.projetos.length).toBeGreaterThanOrEqual(4);
      expect(cv.projetos.length).toBeLessThanOrEqual(5);
      for (const p of cv.projetos) {
        expect(projetos.some((x) => x.slug === p.slug), p.slug).toBe(true);
        expect(p.descricao.length, p.slug).toBeLessThanOrEqual(150);
      }
    });

    it(`EST-33 (${idioma}) as 5 certificações do site`, () => {
      expect(cv.certificacoes).toEqual(certificacoes.map((c) => ({ titulo: c.titulo[idioma], emissor: c.emissor })));
      expect(cv.certificacoes).toHaveLength(5);
    });

    it(`EST-33 (${idioma}) competências técnicas por grupo`, () => {
      expect(cv.competencias.length).toBeGreaterThanOrEqual(4);
      for (const g of cv.competencias) expect(g.itens.length).toBeGreaterThan(0);
    });
  }

  it("EST-33 endereços dos PDFs", () => {
    expect(CURRICULO).toEqual({ pt: "/curriculo/matheus-cortes-curriculo-pt.pdf", en: "/curriculo/matheus-cortes-curriculo-en.pdf" });
  });
});

describe("EST-33 PDFs gerados", () => {
  for (const idioma of ["pt", "en"] as const) {
    it(`EST-33 (${idioma}) PDF existe e tem uma página só`, () => {
      const arquivo = join(PUBLICO, CURRICULO[idioma]);
      expect(existsSync(arquivo), arquivo).toBe(true);
      const bruto = readFileSync(arquivo).toString("latin1");
      expect(bruto.startsWith("%PDF-")).toBe(true);
      expect(bruto.match(/\/Type\s*\/Page(?!s)/g) ?? []).toHaveLength(1);
    });
  }
});
