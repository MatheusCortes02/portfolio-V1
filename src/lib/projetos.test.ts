import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CATEGORIAS, contagens, DESTAQUES, filtrar, projetos, separar, visiveis } from "@/conteudo/projetos";

describe("EST-04 projetos", () => {
  it("tem pelo menos os 8 projetos próprios, com slugs únicos", () => {
    expect(projetos.length).toBeGreaterThanOrEqual(8);
    expect(new Set(projetos.map((p) => p.slug)).size).toBe(projetos.length);
  });
  it("filtra por categoria e conta cada tipo", () => {
    const c = contagens(projetos);
    expect(c.todos).toBe(projetos.length);
    for (const cat of CATEGORIAS) expect(filtrar(projetos, cat).length).toBe(c[cat]);
    expect(filtrar(projetos, "todos")).toHaveLength(projetos.length);
  });
  it("todo projeto tem desafio, solução e resultado nos dois idiomas", () => {
    for (const p of projetos) for (const campo of [p.desafio, p.solucao, p.resultado, p.resumo, p.titulo]) {
      expect(campo.pt.length).toBeGreaterThan(3);
      expect(campo.en.length).toBeGreaterThan(3);
    }
  });
});

describe("EST-11 write-up sem deixar explícito", () => {
  it("não cita conteúdo pago nem download", () => {
    const w = projetos.find((p) => p.slug === "controle-de-acesso-video")!;
    const texto = JSON.stringify(w).toLowerCase();
    expect(texto).not.toMatch(/pago|paid|download|baix/);
  });
});

describe("EST-15 projetos principais e ver mais", () => {
  it("mostra de 4 a 6 principais e o resto fica para o ver mais", () => {
    const { principais, demais } = separar(projetos);
    expect(principais.length).toBeGreaterThanOrEqual(4);
    expect(principais.length).toBeLessThanOrEqual(6);
    expect(principais.length + demais.length).toBe(projetos.length);
    expect(principais.map((p) => p.slug)).toEqual(expect.arrayContaining(["solvered", "morro-alto-os"]));
  });
  it("todo destaque existe na lista", () => {
    for (const s of DESTAQUES) expect(projetos.some((p) => p.slug === s)).toBe(true);
  });
});

describe("EST-29 papel e trabalho profissional", () => {
  it("todo projeto, menos o write-up, tem papel nos dois idiomas", () => {
    for (const p of projetos.filter((x) => x.slug !== "controle-de-acesso-video")) {
      expect(p.papel?.pt.length, p.slug).toBeGreaterThan(10);
      expect(p.papel?.en.length, p.slug).toBeGreaterThan(10);
    }
  });
  it("clientes e o sistema da agência são profissionais; os pessoais não", () => {
    const prof = projetos.filter((p) => p.profissional).map((p) => p.slug);
    expect(prof).toEqual(expect.arrayContaining(["morro-alto-os", "dra-jania", "hanadecor", "brasigran", "sao-jorge", "bebe-tricot", "mister-cook", "diggi-saude", "morro-alto-site"]));
    for (const s of ["solvered", "arca", "robo-sumo", "cofre-de-tokens", "jogo-estatistica"]) expect(prof).not.toContain(s);
  });
});

describe("EST-30 destaques por força técnica", () => {
  it("são os seis escolhidos, nesta ordem, no começo da lista", () => {
    // 2026-10-23: "no lugar da hana decor coloque diggi" — Diggi Saúde entra no 3º lugar e a Hana Decor vai para "Ver mais"
    const ordem = ["morro-alto-os", "brasigran", "diggi-saude", "solvered", "sao-jorge", "robo-sumo"];
    expect(DESTAQUES).toEqual(ordem);
    expect(projetos.slice(0, 6).map((p) => p.slug)).toEqual(ordem);
    expect(separar(projetos).principais.map((p) => p.slug)).toEqual(ordem);
  });
});

describe("EST-45 Diggi Saúde e site da Morro Alto", () => {
  const novos = ["diggi-saude", "morro-alto-site"];
  it("estão na lista como trabalho profissional de front-end; Diggi nos destaques (no lugar da Hana Decor) e sem link", () => {
    for (const s of novos) {
      const p = projetos.find((x) => x.slug === s);
      expect(p, s).toBeDefined();
      expect(p!.profissional, s).toBe(true);
      expect(p!.categoria, s).toBe("frontend");
    }
    expect(DESTAQUES).toContain("diggi-saude");
    expect(DESTAQUES).not.toContain("morro-alto-site");
    expect(separar(projetos).demais.map((x) => x.slug)).toEqual(expect.arrayContaining(["morro-alto-site", "hanadecor"]));
    expect(projetos.find((x) => x.slug === "diggi-saude")!.links).toEqual([]);
  });
  it("EST-50 o site da Morro Alto leva a https://morroalto.co/ (pedido de 2026-10-23)", () => {
    const p = projetos.find((x) => x.slug === "morro-alto-site")!;
    expect(p.links.map((l) => l.url)).toEqual(["https://morroalto.co/"]);
    expect(p.resultado.pt).not.toMatch(/sem link/);
    expect(p.resultado.en).not.toMatch(/no link/);
  });
  it("têm crédito à agência, papel, estudo de caso nos dois idiomas e capturas de computador e de celular", () => {
    for (const s of novos) {
      const p = projetos.find((x) => x.slug === s)!;
      expect(p.credito?.pt, s).toMatch(/Morro Alto Creative Office/);
      expect(p.extra?.texto.en.length, s).toBeGreaterThan(10);
      expect(p.capturas.filter((c) => c.tipo === "desktop").length, s).toBeGreaterThanOrEqual(4);
      expect(p.capturas.filter((c) => c.tipo === "celular").length, s).toBe(1);
      for (const c of p.capturas) expect(c.arquivo.startsWith(`/midia/capturas/${s}/`), c.arquivo).toBe(true);
    }
  });
  it("cada aba do estudo de caso cabe no modal (até ~75 palavras)", () => {
    const palavras = (t: string) => t.trim().split(/\s+/).length;
    for (const s of novos) {
      const p = projetos.find((x) => x.slug === s)!;
      for (const campo of [p.desafio, p.solucao, p.resultado, p.extra!.texto])
        for (const t of [campo.pt, campo.en]) expect(palavras(t), `${s}: ${t.slice(0, 40)}`).toBeLessThanOrEqual(78);
    }
  });
  it("o site da Morro Alto avisa que é a versão nova, em desenvolvimento", () => {
    const p = projetos.find((x) => x.slug === "morro-alto-site")!;
    expect(p.resumo.pt + p.resultado.pt).toMatch(/em desenvolvimento/);
    expect(p.resumo.en + p.resultado.en).toMatch(/in development/);
  });
});

describe("EST-31 filtro sem ver mais", () => {
  it("em Todos mostra só os destaques até abrir o ver mais", () => {
    expect(visiveis(projetos, "todos", false).itens).toHaveLength(6);
    expect(visiveis(projetos, "todos", false).temMais).toBe(true);
    expect(visiveis(projetos, "todos", true).itens).toHaveLength(projetos.length);
  });
  it.each(CATEGORIAS)("no tipo %s mostra todos, sem botão", (cat) => {
    const v = visiveis(projetos, cat, false);
    expect(v.itens).toHaveLength(filtrar(projetos, cat).length);
    expect(v.temMais).toBe(false);
  });
});

describe("EST-52 Sistema da Morro Alto: Supabase e Lovable não foram decisão do Matheus", () => {
  // pedido de 2026-10-23: "deixe claro que a opção de usar supabase não foi minha e que tambem eu não usuaria lovable"
  const p = projetos.find((x) => x.slug === "morro-alto-os")!;
  it("o papel diz que Supabase e Lovable foram escolhas da agência, sem chamar as decisões de minhas", () => {
    expect(p.papel?.pt).toMatch(/Supabase/);
    expect(p.papel?.pt).toMatch(/Lovable/);
    expect(p.papel?.pt).toMatch(/agência/);
    expect(p.papel?.en).toMatch(/agency/);
    expect(p.papel?.pt).not.toMatch(/decisões e revisão minhas/);
  });
  it("a aba \"O que eu faria diferente\" explica que não foi decisão minha e que eu não hospedaria na Lovable", () => {
    expect(p.extra?.titulo.pt).toBe("O que eu faria diferente");
    for (const t of [p.extra!.texto.pt, p.extra!.texto.en]) {
      expect(t).toMatch(/Supabase/);
      expect(t).toMatch(/Lovable/);
      expect(t.trim().split(/\s+/).length).toBeLessThanOrEqual(70);
    }
    expect(p.extra!.texto.pt).toMatch(/não foi decisão minha|não foram decisões minhas/);
  });
});

describe("EST-54 subtítulos (papel) sem menção a ajuda de IA", () => {
  // pedido de 2026-10-23: "quero que altere esses subtitulos não fale de ajuda de ia em nenhum"
  it("nenhum papel cita IA, AI ou Claude", () => {
    for (const p of projetos) if (p.papel)
      for (const t of [p.papel.pt, p.papel.en]) expect(t, p.slug).not.toMatch(/\bIA\b|\bAI\b|Claude|par de programação|pair programmer/);
  });
});

describe("EST-55 robô de mini sumô: a maior parte foi do Matheus, com montagem e soldagem", () => {
  // pedido de 2026-10-23: "no robo eu fiz praticamente tudo principalmente na montagem incluindo soldagem"
  const p = projetos.find((x) => x.slug === "robo-sumo")!;
  it("papel e \"O que eu fiz\" citam a montagem e a soldagem", () => {
    for (const t of [p.papel!.pt, p.solucao.pt]) { expect(t).toMatch(/montagem/); expect(t).toMatch(/sold/); }
    for (const t of [p.papel!.en, p.solucao.en]) { expect(t).toMatch(/assembl/); expect(t).toMatch(/solder/); }
    expect(p.papel!.pt).not.toMatch(/minha parte/);
  });
});

describe("EST-70 páginas de links da SumWise, do Scardua Lab e da Dra. Jânia", () => {
  // pedido de 2026-10-26: "coloque também o linktree da sumwise como projeto pro link: links.sumwise.com.br" e
  // "coloque da scardua lab também com link para links.labscardua.com.br, coloque a página de links da jania scardua também"
  const novos: Record<string, string> = {
    "sumwise-links": "https://sumwiselinktree.vercel.app/", // EST-77: os subdomínios pedidos ainda não têm DNS
    "scardua-lab-links": "https://scardualab.vercel.app/",
    "dra-jania-links": "https://links.janiascardua.com.br/",
  };
  const slugs = Object.keys(novos);
  const palavras = (t: string) => t.trim().split(/\s+/).length;
  /** Largura e altura reais de um JPEG (marcador SOF). */
  const medidasJpeg = (caminho: string) => {
    const b = readFileSync(caminho);
    for (let i = 2; i < b.length - 9; ) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { largura: b.readUInt16BE(i + 7), altura: b.readUInt16BE(i + 5) };
      i += 2 + b.readUInt16BE(i + 2);
    }
    return null;
  };

  it("EST-70 os três existem como trabalho profissional de front-end, com crédito à agência e link para o endereço pedido", () => {
    for (const s of slugs) {
      const p = projetos.find((x) => x.slug === s);
      expect(p, s).toBeDefined();
      expect(p!.profissional, s).toBe(true);
      expect(p!.categoria, s).toBe("frontend");
      expect(p!.credito?.pt, s).toMatch(/Morro Alto Creative Office/);
      expect(p!.links.map((l) => l.url), s).toEqual([novos[s]]);
    }
  });
  it("EST-70 ficam no Ver mais, sem mexer nos destaques", () => {
    for (const s of slugs) expect(DESTAQUES).not.toContain(s);
    expect(separar(projetos).demais.map((x) => x.slug)).toEqual(expect.arrayContaining(slugs));
  });
  it("EST-70 nenhum papel cita IA e cada aba do estudo de caso cabe no modal (até ~75 palavras)", () => {
    for (const s of slugs) {
      const p = projetos.find((x) => x.slug === s)!;
      for (const t of [p.papel!.pt, p.papel!.en]) expect(t, s).not.toMatch(/\bIA\b|\bAI\b|Claude|par de programação|pair programmer/);
      expect(p.extra?.titulo.pt, s).toBe("O que eu faria diferente");
      for (const campo of [p.desafio, p.solucao, p.resultado, p.extra!.texto])
        for (const t of [campo.pt, campo.en]) expect(palavras(t), `${s}: ${t.slice(0, 40)}`).toBeLessThanOrEqual(78);
    }
  });
  it("EST-70 a SumWise não se apresenta como autora do site institucional sumwise.com.br", () => {
    const p = projetos.find((x) => x.slug === "sumwise-links")!;
    const texto = [p.resumo, p.desafio, p.solucao, p.resultado].map((c) => c.pt + " " + c.en).join(" ");
    expect(texto).not.toMatch(/site institucional|corporate website|WordPress/i);
  });
  it("EST-70 têm uma captura de computador (2880 × 1800) e uma de celular (780 × 1688) que existem em public", () => {
    for (const s of slugs) {
      const p = projetos.find((x) => x.slug === s)!;
      expect(p.capturas.filter((c) => c.tipo === "desktop").length, s).toBe(1);
      expect(p.capturas.filter((c) => c.tipo === "celular").length, s).toBe(1);
      for (const c of p.capturas) {
        expect(c.arquivo.startsWith(`/midia/capturas/${s}/`), c.arquivo).toBe(true);
        const caminho = join(process.cwd(), "public", c.arquivo);
        expect(existsSync(caminho), c.arquivo).toBe(true);
        const esperado = c.tipo === "celular" ? { largura: 780, altura: 1688 } : { largura: 2880, altura: 1800 };
        expect({ largura: c.largura, altura: c.altura }, c.arquivo).toEqual(esperado);
        expect(medidasJpeg(caminho), c.arquivo).toEqual(esperado);
        expect(c.alt.pt.length, c.arquivo).toBeGreaterThan(30);
        expect(c.alt.en.length, c.arquivo).toBeGreaterThan(30);
      }
    }
  });
});
