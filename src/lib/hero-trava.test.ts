import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { HERO_INTRO_MS, SAIDA_CARREGANDO_MS, travaMaximaDoHero } from "@/lib/animacoes";

const ler = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const semComentarios = (s: string) => s.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("EST-66 a rolagem só é liberada quando a gravação do hero termina", () => {
  it("EST-66 enquanto grava, a página não rola (classe hero-gravando no html)", () => {
    const css = semComentarios(ler("src/app/estilos.css"));
    expect(css).toMatch(/\.hero-gravando,\.hero-gravando body\{overflow:hidden\}/);
  });
  it("EST-66 a tela de carregamento não devolve a rolagem se o hero começou a gravar", () => {
    const c = semComentarios(ler("src/componentes/cliente.tsx"));
    expect(c).toMatch(/if \(!h\.classList\.contains\("hero-gravando"\)\) dispatchEvent\(new Event\("rolagem:volta"\)\)/);
    expect(c).toMatch(/classList\.contains\("hero-gravando"\)\) lenis\.stop\(\)|hero-gravando"\)[^;]*\) lenis\.stop\(\)/);
  });
  it("EST-66 o hero trava ao começar a gravar e libera ao fim (ou por segurança, no prazo máximo)", () => {
    const a = semComentarios(ler("src/componentes/animacoes.tsx"));
    expect(a).toMatch(/classList\.add\("hero-gravando"\)/);
    expect(a).toMatch(/classList\.remove\("hero-gravando"\)/);
    expect(travaMaximaDoHero()).toBe(SAIDA_CARREGANDO_MS + HERO_INTRO_MS + 1500);
    expect(HERO_INTRO_MS).toBe(4000);
  });
  it("EST-66 acessibilidade: quem navega pelo teclado (Tab) solta a trava na hora, para ver o que está focado", () => {
    const a = semComentarios(ler("src/componentes/animacoes.tsx"));
    expect(a).toMatch(/e\.key === "Tab"\) destravar\(\)/);
  });
});
