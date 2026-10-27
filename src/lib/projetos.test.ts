import { existsSync } from "node:fs";
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
    expect(prof).toEqual(expect.arrayContaining(["morro-alto-os", "dra-jania", "hanadecor", "brasigran", "sao-jorge", "diggi-saude"]));
    for (const s of ["solvered", "arca", "robo-sumo", "cofre-de-tokens", "jogo-estatistica"]) expect(prof).not.toContain(s);
  });
});

describe("EST-30/EST-88 destaques por força técnica", () => {
  it("são os seis escolhidos, nesta ordem, no começo da lista", () => {
    // EST-88 (2026-10-27, avaliação para cibersegurança, "pode aplicar"): Sistema, Brasigran, Solvered, Diggi Saúde
    // (no lugar do Cofre de Tokens até a v2), Robô e São Jorge
    const ordem = ["morro-alto-os", "brasigran", "solvered", "diggi-saude", "robo-sumo", "sao-jorge"];
    expect(DESTAQUES).toEqual(ordem);
    expect(projetos.slice(0, 6).map((p) => p.slug)).toEqual(ordem);
    expect(separar(projetos).principais.map((p) => p.slug)).toEqual(ordem);
  });
});

describe("EST-45 Diggi Saúde", () => {
  const p = () => projetos.find((x) => x.slug === "diggi-saude")!;
  it("é trabalho profissional de front-end, nos destaques e sem link", () => {
    expect(p().profissional).toBe(true);
    expect(p().categoria).toBe("frontend");
    expect(DESTAQUES).toContain("diggi-saude");
    expect(p().links).toEqual([]);
  });
  it("tem crédito à agência, estudo de caso nos dois idiomas e capturas de computador e de celular", () => {
    expect(p().credito?.pt).toMatch(/Morro Alto Creative Office/);
    expect(p().extra?.texto.en.length).toBeGreaterThan(10);
    expect(p().capturas.filter((c) => c.tipo === "desktop").length).toBeGreaterThanOrEqual(4);
    expect(p().capturas.filter((c) => c.tipo === "celular").length).toBe(1);
  });
  it("cada aba do estudo de caso cabe no modal (até ~75 palavras)", () => {
    const palavras = (t: string) => t.trim().split(/\s+/).length;
    for (const campo of [p().desafio, p().solucao, p().resultado, p().extra!.texto])
      for (const t of [campo.pt, campo.en]) expect(palavras(t), t.slice(0, 40)).toBeLessThanOrEqual(78);
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

describe("EST-88 portfólio enxuto para quem busca cibersegurança", () => {
  // avaliação de 2026-10-27 (docs/plano-cyber-2026-10.pdf) aplicada a pedido do Matheus ("pode aplicar"); o Jogo de
  // Estatística fica, porque a parte dele no trabalho foram os jogos (EST-87)
  const removidos = ["bebe-tricot", "sumwise-links", "scardua-lab-links", "dra-jania-links", "morro-alto-site", "mister-cook"];
  it("EST-88 saíram as páginas de links soltas, o site da Morro Alto e o Mister Cook (e as capturas deles)", () => {
    for (const s of removidos) {
      expect(projetos.some((p) => p.slug === s), s).toBe(false);
      expect(existsSync(join(process.cwd(), "public/midia/capturas", s)), s).toBe(false);
    }
  });
  it("EST-88 a página de links da Dra. Jânia entra no estudo de caso do site dela", () => {
    const p = projetos.find((x) => x.slug === "dra-jania")!;
    expect(p.links.map((l) => l.url)).toContain("https://links.janiascardua.com.br/");
    expect(p.resultado.pt).toMatch(/página de links/);
    expect(p.resultado.en).toMatch(/link-in-bio page/);
  });
  it("EST-88 ficam 13 projetos, com o write-up, o chat e o jogo", () => {
    expect(projetos).toHaveLength(13);
    for (const s of ["controle-de-acesso-video", "morro-alto-chat", "jogo-estatistica", "cofre-de-tokens"]) expect(projetos.some((p) => p.slug === s), s).toBe(true);
  });
});

describe("EST-86 Morro Alto Chat no formato do Sistema da Morro Alto, sem link", () => {
  // pedido de 2026-10-27: "quero que coloque o chat.morroalto.co [...] no portfólio também, porém sem link, e quero que o
  // formato seja parecido com sistema morro alto". O dash.morroalto.co fica pendente: "ainda está sendo feito".
  const slug = "morro-alto-chat";
  const p = projetos.find((x) => x.slug === slug);
  const palavras = (t: string) => t.trim().split(/\s+/).length;

  it("EST-86 existe como sistema profissional full stack, restrito, com crédito à agência e fora dos destaques", () => {
    expect(p, slug).toBeDefined();
    expect(p!.categoria).toBe("fullstack");
    expect(p!.profissional).toBe(true);
    expect(p!.restrito).toBe(true);
    expect(p!.credito?.pt).toMatch(/Morro Alto Creative Office/);
    expect(p!.credito?.en).toMatch(/Morro Alto Creative Office/);
    expect(DESTAQUES).not.toContain(slug);
    expect(separar(projetos).demais.map((x) => x.slug)).toContain(slug);
  });
  it("EST-86 não tem link, e nenhum projeto leva a chat.morroalto.co", () => {
    expect(p!.links).toEqual([]);
    for (const x of projetos) for (const l of x.links) expect(l.url, x.slug).not.toMatch(/chat\.morroalto\.co/);
  });
  it("EST-86 papel sem IA e com a escolha da stack; stack real da VPS (Next.js e PostgreSQL, sem Supabase nem Lovable)", () => {
    for (const t of [p!.papel!.pt, p!.papel!.en]) expect(t).not.toMatch(/\bIA\b|\bAI\b|Claude|par de programação|pair programmer/);
    expect(p!.papel!.pt).toMatch(/agência/);
    expect(p!.papel!.en).toMatch(/agency/);
    expect(p!.stack).toEqual(expect.arrayContaining(["Next.js", "PostgreSQL"]));
    expect(p!.stack.join(" ")).not.toMatch(/Supabase|Lovable/);
  });
  it("EST-86 estudo de caso com as abas do sistema da agência, cada uma cabendo no modal (até ~75 palavras)", () => {
    expect(p!.extra?.texto.pt.length).toBeGreaterThan(10);
    for (const campo of [p!.resumo, p!.desafio, p!.solucao, p!.resultado, p!.extra!.texto])
      for (const t of [campo.pt, campo.en]) expect(palavras(t), t.slice(0, 40)).toBeLessThanOrEqual(78);
    // o resultado não promete o que não foi verificado: sem "uso diário" e sem verificação em duas etapas (tirada em a00dc73)
    const texto = [p!.resumo, p!.desafio, p!.solucao, p!.resultado, p!.extra!.texto].map((c) => c.pt + " " + c.en).join(" ");
    expect(texto).not.toMatch(/uso diário|daily use|duas etapas|two-factor|2FA/i);
  });
  it("EST-86 capturas só da tela pública (entrar), no computador (2880 × 1800) e no celular (780 × 1688), que existem em public", () => {
    expect(p!.capturas.filter((c) => c.tipo === "desktop").length).toBe(1);
    expect(p!.capturas.filter((c) => c.tipo === "celular").length).toBe(1);
    for (const c of p!.capturas) {
      expect(c.arquivo.startsWith(`/midia/capturas/${slug}/`), c.arquivo).toBe(true);
      expect(existsSync(join(process.cwd(), "public", c.arquivo)), c.arquivo).toBe(true);
      const esperado = c.tipo === "celular" ? { largura: 780, altura: 1688 } : { largura: 2880, altura: 1800 };
      expect({ largura: c.largura, altura: c.altura }, c.arquivo).toEqual(esperado);
      expect(c.alt.pt.length, c.arquivo).toBeGreaterThan(30);
      expect(c.alt.en.length, c.arquivo).toBeGreaterThan(30);
    }
  });
});

describe("EST-87 Jogo de Estatística: o jogo é todo dele", () => {
  // Matheus, 2026-10-27: "esse jogo eu fiz ele inteiro e fez parte de um trabalho da faculdade, assim como fala no README"
  const p = projetos.find((x) => x.slug === "jogo-estatistica")!;
  // "o jogo eu fiz somente os jogos no Wordwall e em Python": a parte dele no trabalho foram os jogos
  it("EST-87 papel e solução dizem que a parte dele foram os jogos (Wordwall e Python) e que o de Python é todo dele", () => {
    for (const t of [p.papel!.pt, p.solucao.pt]) { expect(t).toMatch(/minha parte foram os jogos/); expect(t).toMatch(/Wordwall/); expect(t).toMatch(/fiz inteiro/); }
    expect(p.papel!.en).toMatch(/my part was the games/);
  });
  it("EST-87 nenhum texto fala em trabalho em grupo nem em \"criamos\"", () => {
    const tudo = [p.credito?.pt, p.papel!.pt, p.solucao.pt, p.credito?.en, p.papel!.en, p.solucao.en].join(" ");
    expect(tudo).not.toMatch(/grupo|criamos|compilamos|publicamos|group|we built|we compiled|we published/i);
  });
});
