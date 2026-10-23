import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { estatisticas, lerContribuicoes } from "@/lib/github";

const html = readFileSync(join(__dirname, "__fixtures__", "contribuicoes.html"), "utf-8");

describe("GH-01 leitura do gráfico público", () => {
  it("lê um ano de dias, com nível e quantidade", () => {
    const dias = lerContribuicoes(html);
    expect(dias.length).toBeGreaterThan(360);
    expect(dias.every((d) => d.nivel >= 0 && d.nivel <= 4)).toBe(true);
    expect(dias[0].data < dias[dias.length - 1].data).toBe(true);
    expect(dias.reduce((s, d) => s + d.qtd, 0)).toBeGreaterThan(400);
  });
});

describe("GH-09 números", () => {
  it("calcula total, dias ativos e maior sequência", () => {
    const dias = [0, 2, 1, 0, 3, 3, 3, 0].map((qtd, i) => ({ data: `2026-01-0${i + 1}`, nivel: qtd ? 1 : 0, qtd }));
    expect(estatisticas(dias)).toEqual({ total: 12, ativos: 5, maiorSequencia: 3 });
  });
});
