import { describe, expect, it } from "vitest";
import { certificacoes } from "@/conteudo/certificacoes";

describe("EST-21 certificações", () => {
  it("tem as 5 certificações do LinkedIn, da mais recente para a mais antiga, com o emissor", () => {
    expect(certificacoes.map((c) => [c.emissor, c.titulo.pt])).toEqual([
      ["Universidade de São Paulo", "Cibersegurança: Segurança da Informação e Ataques Cibernéticos"],
      ["Google", "Certificado Profissional de Google AI"],
      ["Cisco Networking Academy", "Introdução à Cibersegurança"],
      ["FIAP", "Linux Fundamentos"],
      ["FGV Online", "Introdução ao Git e GitHub"],
    ]);
  });
  it("cada uma tem categoria, descrição e competências nos dois idiomas", () => {
    for (const c of certificacoes) {
      for (const campo of [c.titulo, c.categoria, c.descricao]) {
        expect(campo.pt.length).toBeGreaterThan(1);
        expect(campo.en.length).toBeGreaterThan(1);
      }
      expect(c.competencias.pt.length).toBeGreaterThan(0);
      expect(c.competencias.en).toHaveLength(c.competencias.pt.length);
    }
  });
});
