import { describe, expect, it } from "vitest";
import { en } from "@/conteudo/en";
import { pt } from "@/conteudo/pt";

function chaves(o: unknown, prefixo = ""): string[] {
  if (typeof o !== "object" || o === null) return [prefixo];
  return Object.entries(o).flatMap(([k, v]) => chaves(v, prefixo ? `${prefixo}.${k}` : k));
}

describe("EST-01 idiomas", () => {
  it("todo texto existe em português e em inglês", () => {
    expect(chaves(en).sort()).toEqual(chaves(pt).sort());
  });
});
