import { describe, expect, it } from "vitest";
import { IDIOMAS, opcaoVizinha, rotaDoIdioma } from "@/lib/idioma";

describe("EST-20 idioma em menu suspenso", () => {
  it("lista Português e English, nesta ordem", () => {
    expect(IDIOMAS.map((i) => i.nome)).toEqual(["Português", "English"]);
  });
  it("monta a rota do outro idioma mantendo a seção (#âncora)", () => {
    expect(rotaDoIdioma("en", "#sobre")).toBe("/en#sobre");
    expect(rotaDoIdioma("pt", "#contato")).toBe("/#contato");
  });
  it("sem seção (hash vazio ou só '#'), vai para o topo da rota", () => {
    expect(rotaDoIdioma("en", "")).toBe("/en");
    expect(rotaDoIdioma("pt", "#")).toBe("/");
    expect(rotaDoIdioma("en")).toBe("/en");
  });
  it("aceita a seção sem o '#' na frente", () => {
    expect(rotaDoIdioma("en", "projetos")).toBe("/en#projetos");
  });
  it("setas percorrem a lista em volta; Home e End vão às pontas", () => {
    expect(opcaoVizinha(0, "ArrowDown", 2)).toBe(1);
    expect(opcaoVizinha(1, "ArrowDown", 2)).toBe(0);
    expect(opcaoVizinha(0, "ArrowUp", 2)).toBe(1);
    expect(opcaoVizinha(1, "Home", 2)).toBe(0);
    expect(opcaoVizinha(0, "End", 2)).toBe(1);
    expect(opcaoVizinha(1, "Tab", 2)).toBe(1);
  });
});
