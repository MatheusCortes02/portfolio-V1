import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ler = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const css = ler("src/app/estilos.css").replace(/\/\*[\s\S]*?\*\//g, "");
const regras = (seletor: RegExp) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter((m) => seletor.test(m[1])).map((m) => m[2]).join(";");

describe("EST-69 vídeos sem efeitos que repintam a cada quadro (rolagem fluida)", () => {
  it("EST-69 cofre, fita, selo e hero sem mix-blend-mode, máscara ou filtro", () => {
    const r = regras(/cofre-video|fita-video|\.ato3|hero-gravado/);
    expect(r).not.toMatch(/mix-blend-mode|mask|filter/);
  });
  it("EST-69 o papel assado em cada vídeo bate com o tom da seção em que ele está (ímpar #F1EFE4, par #E9E6D8)", () => {
    // ferramentas/assar_videos.py assa: cofre (Registro) no par; fita (Atividade) e selo (Sobre) no ímpar;
    // ferramentas/preparar_fundo_projetos.py assa a prensa (Projetos) no par. Reordenar as seções exige refazer a mídia.
    const p = ler("src/componentes/Pagina.tsx");
    const ordem = [...p.matchAll(/<section className="secao[^"]*" id="([a-z]+)"/g)].map((m) => m[1]);
    const posicao = (id: string) => ordem.indexOf(id) + 1;
    expect(posicao("registro") % 2).toBe(0);
    expect(posicao("projetos") % 2).toBe(0);
    expect(posicao("sobre") % 2).toBe(1);
    expect(posicao("atividade") % 2).toBe(1);
    expect(css).toMatch(/main > \.secao:nth-of-type\(even\)\{--fundo:#E9E6D8/);
  });
});
