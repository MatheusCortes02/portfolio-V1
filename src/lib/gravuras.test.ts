import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import dimensoes from "@/conteudo/dimensoes.json";
import { arquivoGravura, largurasDe, LARGURAS_VARIANTES, srcsetGravura, tamanhosGravura } from "@/lib/gravuras";

const PASTA = join(process.cwd(), "public", "midia", "gravuras");
const DIM = dimensoes as unknown as Record<string, [number, number]>;

describe("EST-26 variantes responsivas das gravuras", () => {
  it("usa 480, 800 e 1200 px, só as menores que o original, e o original por último", () => {
    expect(LARGURAS_VARIANTES).toEqual([480, 800, 1200]);
    expect(largurasDe(1983)).toEqual([480, 800, 1200, 1983]);
    expect(largurasDe(1000)).toEqual([480, 800, 1000]);
    expect(largurasDe(800)).toEqual([480, 800]);
    expect(largurasDe(300)).toEqual([300]);
  });

  it("monta o caminho de cada variante (o original fica sem sufixo de largura)", () => {
    expect(arquivoGravura("04_cofre_bancario", "papel", 800, "webp")).toBe("/midia/gravuras/04_cofre_bancario-papel-800.webp");
    expect(arquivoGravura("04_cofre_bancario", "preto", null, "avif")).toBe("/midia/gravuras/04_cofre_bancario-preto.avif");
  });

  it("monta o srcset em descritores w, do menor ao original", () => {
    expect(srcsetGravura("11_iris_redonda", "papel", 1000, "avif")).toBe(
      "/midia/gravuras/11_iris_redonda-papel-480.avif 480w, /midia/gravuras/11_iris_redonda-papel-800.avif 800w, /midia/gravuras/11_iris_redonda-papel.avif 1000w",
    );
  });

  it("sizes: preguiçosa usa auto com reserva; a da abertura usa a largura da moldura", () => {
    expect(tamanhosGravura("moldura-h", false)).toBe("(max-width: 1562px) 96vw, 1500px");
    expect(tamanhosGravura("solto s-camera", true)).toMatch(/^auto, /);
    expect(tamanhosGravura("cofre-img", true)).toContain("178vw");
    expect(tamanhosGravura("cab-gravura", true)).toBe("auto, 180px");
    expect(tamanhosGravura("", true)).toBe("auto, 100vw");
  });

  const originais = readdirSync(PASTA).filter((n) => /-(papel|preto)\.webp$/.test(n));
  it("há gravuras para conferir", () => expect(originais.length).toBeGreaterThan(30));

  it.each(originais)("%s tem todas as variantes geradas (WebP e AVIF) e dimensões registradas", (nome) => {
    const [w] = DIM[`/midia/gravuras/${nome}`] ?? [0];
    expect(w).toBeGreaterThan(0);
    const base = nome.replace(/\.webp$/, "");
    const faltando: string[] = [];
    for (const l of largurasDe(w)) {
      for (const ext of ["webp", "avif"]) {
        const arq = l === w ? `${base}.${ext}` : `${base}-${l}.${ext}`;
        if (!existsSync(join(PASTA, arq))) faltando.push(arq);
      }
    }
    expect(faltando).toEqual([]);
  });
});
