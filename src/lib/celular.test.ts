import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { indiceDoCarrossel } from "@/lib/carrossel";
import { OLHO_ALCANCE, olharPelaRolagem } from "@/lib/olho";

// Celular pensado para o celular (docs/specs/003, EST-78 a EST-85; pedido de 2026-10-27)
const ler = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const semComentarios = (s: string) => s.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const pagina = semComentarios(ler("src/componentes/Pagina.tsx"));
const cliente = semComentarios(ler("src/componentes/cliente.tsx"));
const cssTodo = ler("src/app/estilos.css");
/** o bloco do celular fica no fim do CSS, depois do marcador, e vence as regras anteriores */
const celular = semComentarios(cssTodo.slice(cssTodo.indexOf("CELULAR PENSADO PARA O CELULAR")));

describe("EST-78 cabeçalho de seção sem vinheta e sem número gigante no celular", () => {
  it("EST-78 o Cabecalho não desenha mais gravura (nem é baixada) e nenhuma seção passa vinheta", () => {
    const cab = pagina.slice(pagina.indexOf("function Cabecalho"), pagina.indexOf("function", pagina.indexOf("function Cabecalho") + 10));
    expect(cab).not.toMatch(/Gravura|cab-gravura/);
    expect(pagina).not.toMatch(/<Cabecalho[^>]*\sg="/);
  });
  it("EST-78 no celular o número vira uma linha \"Nº\" pequena", () => {
    expect(cssTodo).toContain("CELULAR PENSADO PARA O CELULAR");
    expect(celular).toMatch(/\.cab-num::before\{content:"Nº/);
  });
});

describe("EST-79 projetos em carrossel de deslizar", () => {
  it("EST-79 a lista desliza na horizontal com encaixe (só na horizontal)", () => {
    expect(celular).toMatch(/\.lista-projetos\{[^}]*scroll-snap-type:x mandatory/);
    expect(celular).not.toMatch(/scroll-snap-type:y/);
  });
  it("EST-79 no celular aparecem todos os projetos do filtro e o \"Ver mais\" some", () => {
    expect(cliente).toMatch(/visiveisDe\(lista, cat, mais \|\| celular\)/);
    expect(celular).toMatch(/\.ver-mais\{display:none\}/);
  });
  it("EST-79 o cartão usa a captura de celular quando existe e mostra no máximo 3 tecnologias", () => {
    // EST-93 (2026-10-27: "não tem lógica os projetos no celular serem mostrados pelo molde de celular, coloque normal"):
    // no cartão vai a captura normal (de computador); o molde de iPhone some no celular
    expect(celular).toMatch(/\.projeto-visual \.cap-celular\{display:none\}/);
    expect(celular).not.toMatch(/\.projeto:has\(\.cap-celular\) \.cap-principal\{display:none\}/);
    expect(celular).toMatch(/\.projeto \.stack li:nth-child\(n\+4\)\{display:none\}/);
  });
  it("EST-79 o filtro é uma fileira que desliza", () => {
    expect(celular).toMatch(/\.filtro\{[^}]*overflow-x:auto/);
  });
  it("EST-79 o contador acompanha o deslize: cartão mais à esquerda visível, de 1 a total", () => {
    expect(indiceDoCarrossel(0, 300, 18)).toBe(1);
    expect(indiceDoCarrossel(310, 300, 18)).toBe(2);
    expect(indiceDoCarrossel(440, 300, 18)).toBe(2);
    expect(indiceDoCarrossel(460, 300, 18)).toBe(3);
    expect(indiceDoCarrossel(99999, 300, 18)).toBe(18);
    expect(indiceDoCarrossel(10, 0, 18)).toBe(1);
  });
});

describe("EST-80/EST-81 Sobre e Certificações compactos", () => {
  it("EST-80 \"O que eu faço\" e EST-81 certificações ficam dentro de um carrossel com contador", () => {
    expect(pagina).toMatch(/<Deslizar[^>]*>\s*<ol className="faco">/);
    expect(pagina).toMatch(/<Deslizar[^>]*>\s*<ol className="cert-lista">/);
    expect(celular).toMatch(/\.faco,\s*\.cert-lista\{[^}]*scroll-snap-type:x mandatory/);
  });
  it("EST-80 tecnologias como etiquetas pequenas em linhas corridas", () => {
    expect(celular).toMatch(/\.tec-grade\{[^}]*display:flex[^}]*flex-wrap:wrap/);
  });
});

describe("EST-82 o olho segue a rolagem no celular", () => {
  it("EST-82 olho abaixo do meio da tela olha para cima; acima, para baixo; no meio, reto", () => {
    expect(olharPelaRolagem(900, 800).y).toBeLessThan(0);
    expect(olharPelaRolagem(-100, 800).y).toBeGreaterThan(0);
    expect(olharPelaRolagem(400, 800)).toEqual({ x: 0, y: 0 });
    expect(Math.abs(olharPelaRolagem(5000, 800).y)).toBeLessThanOrEqual(OLHO_ALCANCE.y);
  });
});

describe("EST-83/EST-84 Atividade, Contato e rodapé", () => {
  it("EST-83 a fita da Atividade é só do desktop (no celular nem é baixada)", () => {
    expect(pagina).toMatch(/<VideoAnimado midia=\{FITA_MIDIA\}[^>]*soDesktop/);
  });
  it("EST-84 rodapé sem a lista de links no celular", () => {
    expect(celular).toMatch(/\.rodape-nav\{display:none\}/);
  });
});

describe("EST-91 celular sem animações que quebram (Matheus, 2026-10-27: \"quando tem que arrastar para o lado a tela fica bugada\", \"os vídeos posicionados errados\", \"as imagens colocadas estão ruins\", \"tudo muito colado\")", () => {
  it("EST-91 no celular não há entradas animadas, rolagem suave nem paralaxe (cartões fora da tela ficavam invisíveis e o cofre torto)", () => {
    const mov = cliente.slice(cliente.indexOf("export function Movimento"), cliente.indexOf("return null;", cliente.indexOf("export function Movimento")));
    expect(mov).toMatch(/if \(calmo\(\) \|\| matchMedia\(CELULAR\)\.matches\) return;/);
  });
  it("EST-91 sem os ornamentos de imagem nos cartões, no Nº e entre as seções", () => {
    expect(celular).not.toMatch(/28_moldura_cartao|29_selo_oval|30_faixa_divisoria/);
  });
  it("EST-91 vídeos no lugar: cofre inteiro (sem corte lateral) e contadora centrada na máquina", () => {
    expect(celular).toMatch(/\.cofre-img\{width:100%;margin-left:0/);
    expect(celular).toMatch(/\.ato1-video\{[^}]*object-fit:cover/);
  });
  it("EST-91 texto legível e com respiro: corpo do texto no celular com pelo menos 15 px", () => {
    expect(celular).toMatch(/--texto-celular:\.9375rem/);
  });
});

describe("EST-93 Safari do iPhone: moldura da abertura e do menu sem border-image; vídeos em MP4 primeiro", () => {
  // print do Matheus (iPhone, Safari, 2026-10-27): a moldura em 9 fatias (border-image) virava uma mini-moldura em cima e
  // outra embaixo; reproduzido no WebKit do Playwright
  const ultimo = celular;
  it("EST-93 a moldura vertical vem em peças (topo, base e laterais) como fundos, sem border-image", () => {
    expect(ultimo).toMatch(/\.moldura\{[^}]*border-image:none[^}]*background-image:url\(\/midia\/molduras\/02_moldura_celular-topo-papel\.webp\)/);
    expect(ultimo).toMatch(/\.menu\{[^}]*border-image:none[^}]*02_moldura_celular-topo-preto\.webp/);
  });
  it("EST-93 em todo vídeo o MP4 vem antes do WebM (o Safari toca MP4 melhor)", () => {
    for (const arq of ["src/componentes/animacoes.tsx", "src/componentes/cliente.tsx"]) {
      const c = ler(arq);
      const fontes = [...c.matchAll(/<source src=\{[^}]*\.(webm|mp4)\}/g)].map((m) => m[1]);
      for (let i = 0; i + 1 < fontes.length; i += 2) expect(fontes.slice(i, i + 2), arq).toEqual(["mp4", "webm"]);
    }
  });
});

describe("EST-97 a EST-102 correções da avaliação final (2026-10-29)", () => {
  const anim = semComentarios(ler("src/componentes/animacoes.tsx"));
  it("EST-97 modal no celular: rola, foto em largura total e alvos de 44 px", () => {
    expect(celular).toMatch(/\.modal-nota\{[^}]*overflow-y:auto/);
    expect(celular).toMatch(/\.modal-nav button,\s*\.foto-seta\{[^}]*width:44px;height:44px/);
    expect(celular).toMatch(/\.modal-abas button\{[^}]*min-height:44px/);
    expect(celular).toMatch(/\.modal-aba\{[^}]*font-size:\.94rem/);
  });
  it("EST-98 carrosséis acessíveis: região com nome, trilho focável e cartão focado trazido para a tela", () => {
    expect(cliente).toMatch(/role="region" aria-label=\{rotulo\}/);
    expect(cliente).toMatch(/lista\.tabIndex = rolavel\(\) \? 0 : -1/);
    expect(cliente).toMatch(/scrollIntoView\(\{ inline: "start", block: "nearest" \}\)/);
    expect(pagina).toMatch(/<Deslizar rotulo=\{t\.sobre\.oQueFaco\.titulo\}>/);
    expect(pagina).toMatch(/<Deslizar rotulo=\{t\.certificacoes\.titulo\}>/);
  });
  it("EST-98 (bug de 2026-10-29) no desktop a lista não rola de lado: não entra no Tab nem puxa a página ao focar um cartão", () => {
    // a grade do desktop mede 1310 px num trilho de 1240 (cartões vazam), mas overflow-x é visible: medir só a largura enganava
    expect(cliente).toMatch(/const rolavel = \(\) => getComputedStyle\(lista\)\.overflowX !== "visible" && lista\.scrollWidth > lista\.clientWidth \+ 2/);
    expect(cliente).toMatch(/if \(el && rolavel\(\)\) el\.scrollIntoView/);
  });
  it("EST-99 animações em loop com botão de pausar (WCAG 2.2.2)", () => {
    expect(anim).toMatch(/className="pausar-animacao"/);
    expect(anim).toMatch(/aria-pressed=\{pausado\}/);
    expect(anim).toMatch(/!pausadoRef\.current/);
  });
  it("EST-100 tecnologias no desktop em etiquetas, em três colunas", () => {
    const desktop = semComentarios(cssTodo.slice(cssTodo.indexOf("EST-100")));
    expect(desktop).toMatch(/\.tecnologias\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
    expect(desktop).toMatch(/\.tec-grade\{display:flex;flex-wrap:wrap/);
  });
  it("EST-101 textos da abertura no celular com pelo menos 11 px", () => {
    expect(celular).toMatch(/\.funcao,\s*\.moldura-texto \.sobretitulo\{font-size:\.6875rem/);
  });
  it("EST-102 o quadro do GitHub abre nos meses recentes (rola até o fim ao montar)", () => {
    expect(pagina).toMatch(/<FimDaRolagem className="g-rolagem">/);
    expect(cliente).toMatch(/el\.scrollLeft = el\.scrollWidth/);
  });
});
