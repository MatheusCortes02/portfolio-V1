/* Registro do cofre sob demanda (spec 003, EST-34): IP mascarado e local legível. */
import { describe, expect, it } from "vitest";
import { localDe, mascararIp, SERVICO_IP } from "./registro";

describe("EST-34 IP mascarado", () => {
  it("EST-34 IPv6 mostra só os dois primeiros grupos", () => {
    expect(mascararIp("2804:1b3:a2c1:5e00:1d4f:9a2b:77c0:1e01")).toBe("2804:1b3:····");
  });
  it("EST-34 IPv6 abreviado (::) também é mascarado", () => {
    expect(mascararIp("2804:1b3::1")).toBe("2804:1b3:····");
  });
  it("EST-34 IPv4 mostra só os dois primeiros octetos", () => {
    expect(mascararIp("189.6.12.34")).toBe("189.6.···.···");
  });
  it("EST-34 valor que não é IP não aparece", () => {
    expect(mascararIp("")).toBe("—");
    expect(mascararIp("abc")).toBe("—");
  });
  it("EST-34 o serviço consultado é o ipwho.is", () => {
    expect(SERVICO_IP).toBe("https://ipwho.is/");
  });
});

describe("EST-34 local", () => {
  it("EST-34 junta cidade, estado e país, ignorando o que falta", () => {
    expect(localDe({ city: "Vila Velha", region_code: "ES", country_code: "BR" })).toBe("Vila Velha, ES, BR");
    expect(localDe({ city: "Lisboa", region: "Lisboa", country_code: "PT" })).toBe("Lisboa, Lisboa, PT");
    expect(localDe({})).toBe("—");
  });
});
