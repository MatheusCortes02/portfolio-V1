import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ler = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("EST-64 Sobre vem antes de Projetos", () => {
  it("EST-64 na página, a seção Sobre (02) vem antes de Projetos (03)", () => {
    const p = ler("src/componentes/Pagina.tsx");
    expect(p.indexOf('id="sobre"')).toBeGreaterThan(0);
    expect(p.indexOf('id="sobre"')).toBeLessThan(p.indexOf('id="projetos"'));
    expect(p).toMatch(/<Cabecalho num="02" sobre=\{t\.sobre\./);
    expect(p).toMatch(/<Cabecalho num="03" sobre=\{t\.projetos\./);
  });
  it("EST-64 no menu, Sobre vem antes de Projetos", () => {
    expect(ler("src/componentes/cliente.tsx")).toMatch(/const LINKS = \["sobre", "projetos",/);
  });
});
