import { describe, expect, it } from "vitest";
import { soIdioma } from "@/lib/so-idioma";

describe("EST-44 só o idioma da página vai para o navegador", () => {
  it("troca cada texto {pt, en} por só o idioma pedido, em qualquer profundidade", () => {
    const dado = { slug: "x", titulo: { pt: "Olá", en: "Hi" }, capturas: [{ arquivo: "/a.jpg", alt: { pt: "foto", en: "photo" } }], competencias: { pt: ["A"], en: ["B"] }, ano: "2026" };
    expect(soIdioma(dado, "en")).toEqual({ slug: "x", titulo: { en: "Hi" }, capturas: [{ arquivo: "/a.jpg", alt: { en: "photo" } }], competencias: { en: ["B"] }, ano: "2026" });
  });
  it("não mexe em objetos que não são textos bilíngues", () => {
    expect(soIdioma({ pt: 1, outro: 2 }, "pt")).toEqual({ pt: 1, outro: 2 });
  });
});
