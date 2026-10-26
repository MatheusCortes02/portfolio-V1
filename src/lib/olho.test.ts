import { describe, expect, it } from "vitest";
import { OLHO_ALCANCE, olharPara } from "@/lib/olho";

describe("EST-68 o olho dos Write-ups acompanha o mouse em todas as direções", () => {
  it("EST-68 mouse longe à direita: íris no limite horizontal", () => {
    const p = olharPara(800, 0);
    expect(p.x).toBeCloseTo(OLHO_ALCANCE.x);
    expect(p.y).toBeCloseTo(0);
  });
  it("EST-68 mouse longe embaixo (ou em cima): a íris desce (ou sobe) até o limite vertical, não fica parada", () => {
    expect(olharPara(0, 800).y).toBeCloseTo(OLHO_ALCANCE.y);
    expect(olharPara(0, -800).y).toBeCloseTo(-OLHO_ALCANCE.y);
    expect(OLHO_ALCANCE.y).toBeGreaterThanOrEqual(4); // antes era 1 (≈ 2,6% da íris): quase não mexia
  });
  it("EST-68 na diagonal, o movimento é elíptico (cabe na abertura do olho)", () => {
    const p = olharPara(600, 600);
    expect((p.x / OLHO_ALCANCE.x) ** 2 + (p.y / OLHO_ALCANCE.y) ** 2).toBeCloseTo(1);
  });
  it("EST-68 mouse perto do centro: movimento proporcional, e parado no centro exato", () => {
    expect(olharPara(0, 0)).toEqual({ x: 0, y: 0 });
    expect(olharPara(0, 100).y).toBeLessThan(OLHO_ALCANCE.y);
  });
});
