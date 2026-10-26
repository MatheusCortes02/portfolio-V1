import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("EST-76 fontes hospedadas no próprio site (o build da Vercel quebrava no next/font/google)", () => {
  const f = readFileSync(join(process.cwd(), "src/componentes/fontes.ts"), "utf8");
  it("EST-76 nada vem do next/font/google; tudo pelo next/font/local", () => {
    expect(f).not.toMatch(/next\/font\/google/);
    expect(f).toMatch(/next\/font\/local/);
  });
  it("EST-76 os arquivos referenciados existem em src/fontes", () => {
    const arquivos = [...f.matchAll(/"\.\.\/fontes\/([^"]+\.woff2)"/g)].map((m) => m[1]);
    expect(arquivos.length).toBeGreaterThanOrEqual(5);
    for (const a of arquivos) expect(existsSync(join(process.cwd(), "src/fontes", a)), a).toBe(true);
  });
  it("EST-76 mantém as mesmas variáveis CSS de antes", () => {
    for (const v of ["--f-gotica", "--f-titulo", "--f-mono", "--f-corpo"]) expect(f).toContain(v);
  });
});
