import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { quantosFundos } from "@/conteudo/projetos";

const ler = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const semComentarios = (s: string) => s.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("EST-67 a gravura de fundo acompanha a lista de projetos, também depois de \"Ver mais\"", () => {
  it("EST-67 uma prensa a cada 2 projetos visíveis (no mínimo 1)", () => {
    expect(quantosFundos(0)).toBe(1);
    expect(quantosFundos(6)).toBe(3);
    expect(quantosFundos(13)).toBe(7);
  });
  it("EST-67 os fundos ficam dentro da lista (crescem com ela), não em posições fixas da seção", () => {
    const p = semComentarios(ler("src/componentes/Pagina.tsx"));
    expect(p).not.toMatch(/fundo-meio|fundo-baixo/);
    const c = semComentarios(ler("src/componentes/cliente.tsx"));
    expect(c).toMatch(/className="fundos-projetos"/);
    expect(c).toMatch(/quantosFundos\(visiveis\.length\)/);
  });
});
