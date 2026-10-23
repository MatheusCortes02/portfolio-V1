/* Regras de CSS que sustentam o foco visível, os alvos de toque e o tamanho mínimo de texto (spec 003, EST-22 a EST-24).
   Confere o texto do estilos.css; a prova visual fica em ferramentas/verificar-acessibilidade.mjs. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/estilos.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const REGRAS = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ seletores: m[1].split(",").map((s) => s.trim().replace(/\s+/g, " ")), corpo: m[2] }));

/** Corpos de todas as regras (inclusive dentro de @media) que têm exatamente este seletor. */
const regras = (seletor: string) => REGRAS.filter((r) => r.seletores.includes(seletor)).map((r) => r.corpo);
const px = (v: string) => (v.endsWith("rem") ? parseFloat(v) * 16 : parseFloat(v));
/** Tamanhos de fonte declarados para o seletor (font-size ou no atalho font). */
function tamanhos(seletor: string): number[] {
  return regras(seletor).flatMap((c) => [
    ...[...c.matchAll(/font-size:\s*([\d.]+(?:rem|px))/g)].map((m) => px(m[1])),
    ...[...c.matchAll(/font:[^;]*?\s([\d.]+(?:rem|px))(?:\/|\s)/g)].map((m) => px(m[1])),
  ]);
}

describe("EST-22 foco visível", () => {
  it(".botao:focus-visible troca a moldura de 1 px por um anel de 3 px afastado", () => {
    const c = regras(".botao:focus-visible").join(";");
    expect(c).toMatch(/outline:\s*3px solid/);
    expect(c).toMatch(/outline-offset:\s*[5-9]px/);
  });
  it("links do menu de tela cheia têm anel claro (o menu fica fora das seções, sem as variáveis de cor)", () => {
    expect(regras(".menu :focus-visible").join(";")).toMatch(/outline:\s*\dpx solid #C9DCC4/i);
  });
  it("campos do formulário: contorno no foco, não só a borda inferior", () => {
    const c = regras(".ficha input:focus-visible").join(";");
    expect(c).toMatch(/outline:\s*2px solid/);
    expect(css).not.toMatch(/\.ficha input:focus,\s*\.ficha textarea:focus\{outline:none/);
  });
});

describe("EST-23 navegação escondida não recebe foco invisível", () => {
  it("o topo aparece quando algo dentro dele recebe foco", () => {
    expect(regras(".nav-topo:focus-within").join(";")).toMatch(/opacity:\s*1/);
  });
  it("'Pular para o conteúdo' fica fora da tela até receber foco; existe .sr-only", () => {
    expect(regras(".pular:focus").join(";")).toMatch(/transform:\s*none/);
    expect(regras(".sr-only").join(";")).toMatch(/clip/);
  });
});

describe("EST-24 tamanho mínimo de texto e alvos de toque", () => {
  it("links e idioma do cartucho com 12 px", () => {
    for (const s of [".c-painel a", ".c-painel .idioma"]) for (const t of tamanhos(s)) expect(t, s).toBeGreaterThanOrEqual(12);
  });
  it("rótulos em caixa-alta com pelo menos 11 px (inclusive no celular)", () => {
    for (const s of [".tec-item", ".ativ-numeros dt", ".filtro button", ".ficha label", ".idioma", ".seletor-idioma .idioma-lista a", ".lt-periodo", ".cert-categoria", ".projeto-texto .sobretitulo", ".c-movel-rotulo"]) {
      const ts = tamanhos(s);
      expect(ts.length, `${s} sem tamanho declarado`).toBeGreaterThan(0);
      for (const t of ts) expect(t, s).toBeGreaterThanOrEqual(11);
    }
  });
  it("alvos de toque com 44 px: filtros, rodapé, idioma do menu e botões do topo do modal no celular", () => {
    expect(regras(".filtro button").join(";")).toMatch(/min-height:\s*44px/);
    expect(regras(".rodape-nav a").join(";")).toMatch(/min-height:\s*44px/);
    expect(regras(".menu .idioma").join(";")).toMatch(/min-height:\s*44px/);
    // o botão do topo do modal pode ser desenhado menor (34 px no celular): a área de toque cresce 5 px por lado no ::after
    const modal = regras(".modal-nav button").at(-1)!;
    const lado = Math.min(...[...modal.matchAll(/(?:^|;)\s*(?:width|height):\s*(\d+)px/g)].map((m) => Number(m[1])));
    const extra = Number(regras(".modal-nav button::after").join(";").match(/inset:\s*-(\d+)px/)?.[1] ?? 0);
    expect(lado + 2 * extra, ".modal-nav button (área de toque)").toBeGreaterThanOrEqual(44);
  });
  it("medalhão do celular com 52 px", () => {
    expect(regras(".c-movel .c-movel-selo").join(";")).toMatch(/--alt:\s*52px/);
  });
});

describe("EST-60 Projetos com a gravura da prensa ao longo da seção inteira", () => {
  // pedido de 2026-10-23: "depois não tem imagem de fundo ... coloque outras 2 daquela"
  const pagina = readFileSync(join(process.cwd(), "src/componentes/Pagina.tsx"), "utf8");
  it("a seção Projetos tem três fundos com a prensa: no topo, no meio e embaixo", () => {
    const secao = pagina.slice(pagina.indexOf('id="projetos"'), pagina.indexOf("<Cabecalho", pagina.indexOf('id="projetos"')));
    expect(secao.match(/<Gravura g="06_prensa_antiga_gravura"/g)?.length).toBe(3);
    expect(secao).toMatch(/fundo fundo-meio/);
    expect(secao).toMatch(/fundo fundo-baixo/);
  });
  it("as cópias descem pela seção e se fundem nas bordas de cima e de baixo", () => {
    expect(regras(".projetos-secao .fundo-meio").join(";")).toMatch(/top:\s*3\d%/);
    expect(regras(".projetos-secao .fundo-baixo").join(";")).toMatch(/top:\s*auto/);
    expect(regras(".projetos-secao .fundo-baixo").join(";")).toMatch(/bottom:\s*0/);
    for (const s of [".projetos-secao .fundo-meio", ".projetos-secao .fundo-baixo"])
      expect(regras(s).join(";") + regras(".projetos-secao .fundo-meio,.projetos-secao .fundo-baixo").join(";")).toBeTruthy();
  });
});

describe("EST-62 gravura maior no modal do write-up (sem captura)", () => {
  // pedido de 2026-10-23: "a foto do controle de acesso em player deixe ela maior também pois assim ficou pequeno"
  it("a gravura ocupa quase toda a largura da coluna da foto, sem passar da altura do modal", () => {
    const c = regras(".cap-vazia.grande .gravura").join(";");
    expect(c).toMatch(/width:\s*min\(\s*(\d+)px\s*,\s*9\d%\s*\)/);
    expect(Number(c.match(/width:\s*min\(\s*(\d+)px/)![1])).toBeGreaterThanOrEqual(700);
    expect(regras(".cap-vazia.grande img").join(";")).toMatch(/max-height:/);
  });
});
