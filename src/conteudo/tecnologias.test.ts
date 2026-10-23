import { describe, expect, it } from "vitest";
import { en } from "@/conteudo/en";
import { pt } from "@/conteudo/pt";
import { iconeDe } from "@/conteudo/tecnologias";

describe("EST-12 tecnologias com ícone", () => {
  it.each([["pt", pt], ["en", en]] as const)("toda tecnologia em %s tem logotipo ou ícone próprio", (_, t) => {
    const semIcone = t.sobre.tecnologias.grupos.flatMap((g) => g.itens).filter((i) => !iconeDe(i));
    expect(semIcone).toEqual([]);
  });

  it.each([["pt", pt], ["en", en]] as const)("EST-31 a grade de %s tem o que aparece nos projetos", (_, t) => {
    const todas = t.sobre.tecnologias.grupos.flatMap((g) => g.itens);
    expect(todas).toEqual(expect.arrayContaining(["Node.js", "Docker", "Playwright", "Vitest", "Drizzle ORM"]));
    // retirados a pedido do Matheus em 2026-10-23: "tire gsap, supabase de tecnologias"
    expect(todas).not.toEqual(expect.arrayContaining(["GSAP"]));
    expect(todas).not.toEqual(expect.arrayContaining(["Supabase"]));
  });

  it("logotipo vem do Simple Icons com caminho SVG", () => {
    const react = iconeDe("React");
    expect(react?.tipo).toBe("logo");
    expect(react?.path).toMatch(/^M/);
  });
});

describe("EST-18 ícones dos perfis do Contato", () => {
  it.each(["E-mail", "GitHub", "LinkedIn", "TryHackMe", "LeetCode"])("%s tem ícone", (nome) => {
    expect(iconeDe(nome)?.path).toBeTruthy();
  });
});
