import { describe, expect, it } from "vitest";
import { montarEnvio } from "@/lib/contato";

const ok = { nome: "Ana Souza", email: "ana@exemplo.com", mensagem: "Olá, vi seu portfólio." };

describe("EST-19 formulário de contato", () => {
  it("monta o envio para o Web3Forms com a chave, o assunto e o e-mail de resposta", () => {
    const r = montarEnvio(ok, "chave-publica");
    expect(r).toMatchObject({ access_key: "chave-publica", subject: "Portfólio: mensagem de Ana Souza", from_name: "Ana Souza", email: "ana@exemplo.com", message: "Olá, vi seu portfólio." });
  });
  it("recusa nome curto, e-mail inválido e mensagem vazia", () => {
    expect(montarEnvio({ ...ok, nome: "A" }, "k")).toBeNull();
    expect(montarEnvio({ ...ok, email: "ana@" }, "k")).toBeNull();
    expect(montarEnvio({ ...ok, mensagem: "  " }, "k")).toBeNull();
  });
  it("sem chave configurada, não envia", () => {
    expect(montarEnvio(ok, undefined)).toBe("sem-chave");
  });
});
