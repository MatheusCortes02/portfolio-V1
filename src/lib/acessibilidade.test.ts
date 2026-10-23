import { describe, expect, it } from "vitest";
import { abaVizinha, focarDestino, setaDaFoto } from "@/lib/acessibilidade";

describe("EST-25 abas do modal no padrão da APG", () => {
  it("→ e ← percorrem as abas dando a volta; Home e End vão às pontas", () => {
    expect(abaVizinha(0, "ArrowRight", 3)).toBe(1);
    expect(abaVizinha(2, "ArrowRight", 3)).toBe(0);
    expect(abaVizinha(0, "ArrowLeft", 3)).toBe(2);
    expect(abaVizinha(2, "Home", 3)).toBe(0);
    expect(abaVizinha(0, "End", 3)).toBe(2);
  });
  it("outras teclas não mudam a aba (null: o evento segue normal)", () => {
    expect(abaVizinha(1, "Tab", 3)).toBeNull();
    expect(abaVizinha(1, "ArrowDown", 3)).toBeNull();
  });
});

describe("EST-25 setas trocam a foto só quando o foco não está nas abas", () => {
  it("fora das abas: → avança e ← volta a foto (EST-17)", () => {
    expect(setaDaFoto("ArrowRight", false)).toBe(1);
    expect(setaDaFoto("ArrowLeft", false)).toBe(-1);
  });
  it("com o foco nas abas, as setas são das abas: a foto não muda", () => {
    expect(setaDaFoto("ArrowRight", true)).toBe(0);
    expect(setaDaFoto("ArrowLeft", true)).toBe(0);
  });
  it("outras teclas não trocam a foto", () => {
    expect(setaDaFoto("Enter", false)).toBe(0);
  });
});

describe("EST-23 foco vai para o destino do link (pular para o conteúdo, menu do celular)", () => {
  it("foca a seção do hash sem rolar, tornando-a focável só por programa", () => {
    document.body.innerHTML = `<main id="conteudo"><section id="sobre"><h2>Sobre</h2></section></main>`;
    expect(focarDestino("#sobre")).toBe(true);
    const s = document.getElementById("sobre")!;
    expect(document.activeElement).toBe(s);
    expect(s.getAttribute("tabindex")).toBe("-1");
  });
  it("aceita o id sem '#' e não mexe num tabindex que já existe", () => {
    document.body.innerHTML = `<main id="conteudo" tabindex="0"></main>`;
    expect(focarDestino("conteudo")).toBe(true);
    expect(document.getElementById("conteudo")!.getAttribute("tabindex")).toBe("0");
  });
  it("destino que não existe: não faz nada", () => {
    document.body.innerHTML = "";
    expect(focarDestino("#nada")).toBe(false);
  });
});
