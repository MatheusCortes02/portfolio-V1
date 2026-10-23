import { describe, expect, it } from "vitest";
import { serialDoCofre, progressoDoCofre } from "@/lib/carregando";

describe("EST-16 tela de carregamento", () => {
  it("o número de série vai de 000 a 100, sempre com três dígitos", () => {
    expect(serialDoCofre(0)).toBe("000");
    expect(serialDoCofre(0.07)).toBe("007");
    expect(serialDoCofre(1)).toBe("100");
    expect(serialDoCofre(1.4)).toBe("100");
  });
  it("o progresso desacelera no fim e não passa de 1", () => {
    expect(progressoDoCofre(0, 1400)).toBe(0);
    expect(progressoDoCofre(700, 1400)).toBeGreaterThan(0.5);
    expect(progressoDoCofre(5000, 1400)).toBe(1);
  });
});
