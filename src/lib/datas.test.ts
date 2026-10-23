import { describe, expect, it } from "vitest";
import { duracao, mesesDesde } from "@/lib/datas";

describe("Trajetória: duração como no LinkedIn", () => {
  it("conta os meses incluindo o de início e o atual", () => {
    expect(mesesDesde("2026-05", new Date("2026-10-20T12:00:00Z"))).toBe(6);
    expect(mesesDesde("2026-05", new Date("2026-05-02T12:00:00Z"))).toBe(1);
    expect(mesesDesde("2026-05", new Date("2027-01-10T12:00:00Z"))).toBe(9);
  });
  it("escreve em português e em inglês, com singular", () => {
    expect(duracao(6, "pt")).toBe("6 meses");
    expect(duracao(1, "pt")).toBe("1 mês");
    expect(duracao(6, "en")).toBe("6 months");
    expect(duracao(1, "en")).toBe("1 month");
  });
});
