/* Registro do cofre sob demanda (spec 003, EST-34), no DOM do jsdom. */
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/conteudo/en";
import { pt } from "@/conteudo/pt";
import { Registro } from "./cliente";

const resposta = { success: true, ip: "2804:1b3:a2c1:5e00:1d4f:9a2b:77c0:1e01", city: "Vila Velha", region_code: "ES", country_code: "BR", connection: { isp: "Provedor Exemplo" } };
let fetchFalso: ReturnType<typeof vi.fn>;

beforeEach(() => {
  window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} })) as unknown as typeof matchMedia;
  fetchFalso = vi.fn(async () => ({ json: async () => resposta }));
  globalThis.fetch = fetchFalso as unknown as typeof fetch;
});
afterEach(cleanup);

describe("EST-34 registro do cofre sob demanda", () => {
  it("EST-34 ao carregar, não consulta o IP e mostra o botão e o aviso", () => {
    render(<Registro t={pt.registro} idioma="pt" />);
    expect(fetchFalso).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Registrar minha entrada" })).toBeTruthy();
    expect(screen.getByText("A consulta é feita ao serviço externo ipwho.is; este site não guarda nada.")).toBeTruthy();
  });

  it("EST-34 em inglês, o botão é \"Log my entry\"", () => {
    render(<Registro t={en.registro} idioma="en" />);
    expect(screen.getByRole("button", { name: "Log my entry" })).toBeTruthy();
  });

  it("EST-34 ao clicar, consulta o ipwho.is uma vez e mostra o IP mascarado, o local e o provedor", async () => {
    const { container } = render(<Registro t={pt.registro} idioma="pt" />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Registrar minha entrada" })); });
    expect(fetchFalso).toHaveBeenCalledTimes(1);
    expect(String(fetchFalso.mock.calls[0][0])).toBe("https://ipwho.is/");
    expect(screen.getByText("2804:1b3:····")).toBeTruthy();
    expect(screen.getByText("Vila Velha, ES, BR")).toBeTruthy();
    expect(screen.getByText("Provedor Exemplo")).toBeTruthy();
    expect(container.textContent).not.toContain("a2c1");
  });

  it("EST-34 a região aria-live fica vazia até o resultado e então anuncia só o resultado final", async () => {
    let soltar: (v: unknown) => void = () => {};
    fetchFalso.mockImplementationOnce(() => new Promise((r) => { soltar = r; }));
    const { container } = render(<Registro t={pt.registro} idioma="pt" />);
    const viva = container.querySelector("[aria-live]")!;
    expect(viva).toBeTruthy();
    expect(viva.textContent).toBe("");
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Registrar minha entrada" })); });
    expect(viva.textContent).toBe("");
    await act(async () => { soltar({ json: async () => resposta }); });
    expect(viva.textContent).toContain("2804:1b3:····");
    expect(viva.textContent).toContain("Vila Velha, ES, BR");
  });

  it("EST-34 se a consulta falha, mostra \"origem não identificada\"", async () => {
    fetchFalso.mockImplementationOnce(async () => { throw new Error("rede"); });
    render(<Registro t={pt.registro} idioma="pt" />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Registrar minha entrada" })); });
    expect(screen.getAllByText("origem não identificada").length).toBeGreaterThan(0);
  });

  it("EST-34 não troca o texto letra a letra: depois do resultado não há temporizador de digitação", async () => {
    vi.useFakeTimers();
    try {
      const espiao = vi.spyOn(globalThis, "setInterval");
      render(<Registro t={pt.registro} idioma="pt" />);
      await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Registrar minha entrada" })); });
      expect(espiao).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});
