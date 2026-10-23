/* Acessibilidade de teclado e leitor de tela (spec 003, EST-23 e EST-25), no DOM do jsdom.
   O que depende do navegador de verdade (anel de foco, Tab preso, tamanhos) fica em ferramentas/verificar-acessibilidade.mjs. */
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import reserva from "@/conteudo/contribuicoes-reserva.json";
import { en } from "@/conteudo/en";
import { projetos } from "@/conteudo/projetos";
import { pt } from "@/conteudo/pt";
import { Decifra, Navegacao, Projetos } from "./cliente";
import { Pagina } from "./Pagina";

vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-unused-vars -- dublê do next/image no teste
  default: ({ sizes: _s, priority: _p, ...props }: Record<string, unknown>) => <img {...props} />,
}));
vi.mock("@/lib/github-dados", () => ({ buscarContribuicoes: async () => ({ dias: reserva.dias, lidoEm: reserva.conferido }) }));

beforeAll(() => {
  // o jsdom não tem showModal/close nem matchMedia: dublês mínimos (movimento reduzido, para nada animar)
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & { showModal: () => void; close: () => void };
  proto.showModal = function (this: HTMLDialogElement) { this.setAttribute("open", ""); };
  proto.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
  window.matchMedia = ((q: string) => ({ matches: q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof matchMedia;
  globalThis.fetch = vi.fn(async () => ({ json: async () => ({ success: false }) })) as unknown as typeof fetch;
});
afterEach(cleanup);

const FOCAVEIS = "a[href], button:not([disabled]), input:not([tabindex='-1']), textarea, select, [tabindex]:not([tabindex='-1'])";

describe("EST-25 frase decifrada", () => {
  it("texto real em span.sr-only, animação em span aria-hidden e nenhum aria-label no <p>", () => {
    const { container } = render(<Decifra className="frase" texto={pt.hero.frase} />);
    const p = container.querySelector("p.frase")!;
    expect(p.hasAttribute("aria-label")).toBe(false);
    expect(p.querySelector(".sr-only")?.textContent).toBe(pt.hero.frase);
    expect(p.querySelector("[aria-hidden='true']")).not.toBeNull();
  });
});

describe("EST-23 navegação pelo teclado", () => {
  it("o primeiro elemento focável da página é 'Pular para o conteúdo', apontando para #conteudo", async () => {
    const { container } = render(await Pagina({ idioma: "pt" }));
    const primeiro = container.querySelector<HTMLElement>(FOCAVEIS)!;
    expect(primeiro.textContent).toBe(pt.nav.pular);
    expect(primeiro.getAttribute("href")).toBe("#conteudo");
    expect(container.querySelector("main#conteudo")).not.toBeNull();
  });
  it("os <nav> visíveis têm nomes distintos (navegação principal e rodapé), nos dois idiomas", async () => {
    for (const [idioma, t] of [["pt", pt], ["en", en]] as const) {
      const { container, unmount } = render(await Pagina({ idioma }));
      const nomes = [...container.querySelectorAll("nav[aria-label]")].filter((n) => !n.closest("dialog")).map((n) => n.getAttribute("aria-label"));
      expect(nomes).toContain(t.nav.principal);
      expect(nomes).toContain(t.nav.rodape);
      expect(new Set(nomes).size).toBe(nomes.length);
      unmount();
    }
  });
  it("menu do celular: <dialog> aberto com showModal, foco no primeiro link; Esc fecha e devolve o foco ao medalhão", async () => {
    const abrir = vi.spyOn(HTMLDialogElement.prototype, "showModal");
    render(<Navegacao t={pt.nav} idioma="pt" />);
    const medalhao = screen.getByRole("button", { name: pt.nav.menu });
    expect(medalhao.textContent).toContain(pt.nav.menu); // rótulo visível (EST-24)
    medalhao.focus();
    await act(async () => { fireEvent.click(medalhao); });
    const menu = document.querySelector("dialog.menu") as HTMLDialogElement;
    expect(menu).not.toBeNull();
    expect(abrir).toHaveBeenCalled();
    expect(menu.open).toBe(true);
    expect(medalhao.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(within(menu).getAllByRole("link")[0]);
    // Esc no navegador: o dialog dispara "cancel" e fecha sozinho
    await act(async () => { menu.dispatchEvent(new Event("cancel")); menu.close(); });
    expect(menu.open).toBe(false);
    expect(document.activeElement).toBe(medalhao);
    expect(medalhao.getAttribute("aria-expanded")).toBe("false");
  });
  it("escolher um link do menu fecha o menu e leva o foco à seção", async () => {
    document.body.insertAdjacentHTML("beforeend", `<main id="conteudo"><section id="sobre"></section></main>`);
    render(<Navegacao t={pt.nav} idioma="pt" />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: pt.nav.menu })); });
    const menu = document.querySelector("dialog.menu") as HTMLDialogElement;
    await act(async () => { fireEvent.click(within(menu).getByRole("link", { name: new RegExp(pt.nav.sobre) })); });
    expect(menu.open).toBe(false);
    expect(document.activeElement?.id).toBe("sobre");
    document.querySelector("main#conteudo")?.remove();
  });
});

describe("EST-53 captura de celular no formato de um iPhone 17", () => {
  it("a captura fica dentro do aparelho, com Dynamic Island e botões decorativos escondidos do leitor de tela", () => {
    const comCelular = projetos.find((p) => p.capturas.some((c) => c.tipo === "celular"))!;
    const { container } = render(<Projetos lista={[comCelular]} t={pt.projetos} idioma="pt" />);
    const aparelho = container.querySelector(".cap-celular.iphone")!;
    expect(aparelho).not.toBeNull();
    expect(aparelho.querySelector("img")?.getAttribute("alt")).toBe(comCelular.capturas.find((c) => c.tipo === "celular")!.alt.pt);
    expect(aparelho.querySelector(".iphone-ilha")?.getAttribute("aria-hidden")).toBe("true");
    expect(aparelho.querySelector(".iphone-botoes")?.getAttribute("aria-hidden")).toBe("true");
  });
});

describe("EST-25 abas do modal (APG)", () => {
  const comFotos = projetos.find((p) => p.capturas.length > 1)!;
  async function abrirModal() {
    render(<Projetos lista={[comFotos]} t={pt.projetos} idioma="pt" />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: `${pt.projetos.abrir}: ${comFotos.titulo.pt}` })); });
    return document.querySelector("dialog.modal") as HTMLDialogElement;
  }

  it("cada aba controla o painel, o painel é rotulado pela aba atual e só a aba atual está no Tab", async () => {
    const modal = await abrirModal();
    const abas = within(modal).getAllByRole("tab");
    const painel = within(modal).getByRole("tabpanel");
    expect(abas.length).toBeGreaterThanOrEqual(3);
    for (const a of abas) {
      expect(a.id).not.toBe("");
      expect(a.getAttribute("aria-controls")).toBe(painel.id);
    }
    expect(painel.getAttribute("aria-labelledby")).toBe(abas[0].id);
    expect(abas.map((a) => a.getAttribute("tabindex"))).toEqual(["0", ...abas.slice(1).map(() => "-1")]);
  });
  it("EST-51 \"O que eu fiz\" é a primeira aba e abre selecionada", async () => {
    const modal = await abrirModal();
    const abas = within(modal).getAllByRole("tab");
    expect(abas.map((a) => a.textContent)).toEqual(
      expect.arrayContaining([pt.projetos.solucao, pt.projetos.desafio, pt.projetos.resultado]));
    expect(abas[0].textContent).toBe(pt.projetos.solucao);
    expect(abas[1].textContent).toBe(pt.projetos.desafio);
    expect(abas[0].getAttribute("aria-selected")).toBe("true");
    expect(within(modal).getByRole("tabpanel").textContent).toBe(comFotos.solucao.pt);
  });
  it("com o foco nas abas, → troca a ABA (e a foto fica); fora delas, → troca a FOTO", async () => {
    const modal = await abrirModal();
    const conta = () => modal.querySelector(".foto-conta")?.textContent;
    const abas = within(modal).getAllByRole("tab");
    abas[0].focus();
    await act(async () => { fireEvent.keyDown(abas[0], { key: "ArrowRight" }); });
    const depois = within(modal).getAllByRole("tab");
    expect(depois[1].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(depois[1]);
    expect(within(modal).getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(depois[1].id);
    expect(conta()).toBe(`1 / ${comFotos.capturas.length}`);
    await act(async () => { fireEvent.keyDown(depois[1], { key: "End" }); });
    expect(within(modal).getAllByRole("tab").at(-1)!.getAttribute("aria-selected")).toBe("true");
    await act(async () => { fireEvent.keyDown(document.body, { key: "ArrowRight" }); });
    expect(conta()).toBe(`2 / ${comFotos.capturas.length}`);
  });
});
