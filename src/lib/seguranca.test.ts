import { describe, expect, it } from "vitest";
import nextConfig, { cabecalhosSeguranca, politicaCsp } from "../../next.config";

const diretivas = (csp: string) => Object.fromEntries(csp.split(";").map((d) => d.trim()).filter(Boolean).map((d) => {
  const [nome, ...valores] = d.split(/\s+/);
  return [nome, valores];
}));

describe("EST-42 cabeçalhos de segurança", () => {
  it("EST-42: não anuncia o X-Powered-By", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("EST-42: next.config aplica os cabeçalhos a todas as rotas", async () => {
    const regras = await nextConfig.headers!();
    const todas = regras.find((r) => r.source === "/:path*");
    expect(todas).toBeTruthy();
    const nomes = todas!.headers.map((h) => h.key);
    for (const n of ["Content-Security-Policy", "Strict-Transport-Security", "X-Frame-Options", "X-Content-Type-Options",
      "Referrer-Policy", "Permissions-Policy", "Cross-Origin-Opener-Policy"]) expect(nomes).toContain(n);
  });

  it("EST-42: valores dos cabeçalhos", () => {
    const h = Object.fromEntries(cabecalhosSeguranca(false).map((x) => [x.key, x.value]));
    expect(h["X-Frame-Options"]).toBe("DENY");
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["Cross-Origin-Opener-Policy"]).toBe("same-origin");
    expect(h["Strict-Transport-Security"]).toMatch(/^max-age=(\d+); includeSubDomains$/);
    expect(Number(h["Strict-Transport-Security"].match(/max-age=(\d+)/)![1])).toBeGreaterThanOrEqual(31536000);
    for (const f of ["camera=()", "microphone=()", "geolocation=()", "payment=()", "usb=()", "browsing-topics=()"]) {
      expect(h["Permissions-Policy"]).toContain(f);
    }
  });

  it("EST-42: CSP só com o que o site usa", () => {
    const d = diretivas(politicaCsp(false));
    expect(d["default-src"]).toEqual(["'self'"]);
    expect(d["script-src"]).toEqual(["'self'", "'unsafe-inline'"]);
    expect(d["style-src"]).toEqual(["'self'", "'unsafe-inline'"]);
    expect(d["img-src"]).toEqual(["'self'", "data:", "blob:"]);
    expect(d["font-src"]).toEqual(["'self'"]);
    expect(d["connect-src"]).toEqual(["'self'", "https://api.web3forms.com", "https://ipwho.is", "https://ipapi.co"]);
    expect(d["object-src"]).toEqual(["'none'"]);
    expect(d["base-uri"]).toEqual(["'self'"]);
    expect(d["form-action"]).toEqual(["'self'"]);
    expect(d["frame-ancestors"]).toEqual(["'none'"]);
    expect(d["frame-src"]).toEqual(["'none'"]);
    expect(d).toHaveProperty("upgrade-insecure-requests");
  });

  it("EST-42: 'unsafe-eval' e websocket só em desenvolvimento", () => {
    expect(politicaCsp(false)).not.toContain("unsafe-eval");
    const dev = diretivas(politicaCsp(true));
    expect(dev["script-src"]).toContain("'unsafe-eval'");
    expect(dev["connect-src"]).toContain("ws:");
    expect(dev).not.toHaveProperty("upgrade-insecure-requests");
  });
});
