import { describe, expect, it } from "vitest";
import { certificacoes } from "@/conteudo/certificacoes";
import { SITE_URL, urlAbsoluta } from "./site";
import { dadosEstruturados, jsonLd, montarMetadata, montarRobots, montarSitemap, ROBOS_LIBERADOS } from "./seo";

const BASE = SITE_URL;

describe("EST-39 endereço do site", () => {
  it("EST-39: o endereço é absoluto, em https e sem barra no fim", () => {
    expect(BASE).toMatch(/^https:\/\/[^/]+$/);
    expect(urlAbsoluta("/en")).toBe(`${BASE}/en`);
    expect(urlAbsoluta("/")).toBe(`${BASE}/`);
  });
});

describe("EST-39 metadata de cada idioma", () => {
  it("EST-39: português com canonical, hreflang absolutos e x-default", () => {
    const m = montarMetadata("pt");
    expect(String(m.metadataBase)).toBe(`${BASE}/`);
    expect(m.alternates?.canonical).toBe(`${BASE}/`);
    expect(m.alternates?.languages).toEqual({ "pt-BR": `${BASE}/`, en: `${BASE}/en`, "x-default": `${BASE}/` });
    expect(m.title).toMatchObject({ template: "%s · Matheus Cortes" });
    expect(m.description).toBeTruthy();
    expect(Array.isArray(m.keywords) && m.keywords.length).toBeGreaterThan(5);
    expect(m.authors).toEqual([{ name: "Matheus Cortes", url: `${BASE}/` }]);
    expect(m.creator).toBe("Matheus Cortes");
  });

  it("EST-39: inglês aponta o canonical para /en", () => {
    const m = montarMetadata("en");
    expect(m.alternates?.canonical).toBe(`${BASE}/en`);
    expect(m.alternates?.languages).toEqual({ "pt-BR": `${BASE}/`, en: `${BASE}/en`, "x-default": `${BASE}/` });
  });

  it("EST-39: Open Graph de perfil com imagem 1200 × 630 e locale do idioma", () => {
    for (const [idioma, locale, outro] of [["pt", "pt_BR", "en_US"], ["en", "en_US", "pt_BR"]] as const) {
      const og = montarMetadata(idioma).openGraph as Record<string, unknown>;
      expect(og.type).toBe("profile");
      expect(og.locale).toBe(locale);
      expect(og.alternateLocale).toEqual([outro]);
      expect(og.siteName).toBe("Matheus Cortes");
      expect(og.url).toBe(idioma === "pt" ? `${BASE}/` : `${BASE}/en`);
      const [img] = og.images as { url: string; width: number; height: number; alt: string }[];
      expect(img).toMatchObject({ width: 1200, height: 630 });
      expect(img.url).toMatch(/^\/midia\/og\/og-(pt|en)\.jpg$/);
      expect(img.alt.length).toBeGreaterThan(10);
    }
  });

  it("EST-39: Twitter summary_large_image e robots index/follow com prévia grande", () => {
    const m = montarMetadata("pt");
    expect(m.twitter).toMatchObject({ card: "summary_large_image" });
    expect(m.robots).toMatchObject({ index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } });
  });
});

describe("EST-39 sitemap", () => {
  it("EST-39: / e /en com alternativos de idioma", () => {
    const s = montarSitemap([]);
    expect(s.map((x) => x.url)).toEqual([`${BASE}/`, `${BASE}/en`]);
    for (const x of s) expect(x.alternates?.languages).toEqual({ "pt-BR": `${BASE}/`, en: `${BASE}/en`, "x-default": `${BASE}/` });
  });

  it("EST-39: inclui os PDFs de currículo quando existem", () => {
    const s = montarSitemap(["curriculo-pt.pdf", "curriculo-en.pdf"]);
    expect(s.map((x) => x.url)).toContain(`${BASE}/curriculo/curriculo-pt.pdf`);
    expect(s.map((x) => x.url)).toContain(`${BASE}/curriculo/curriculo-en.pdf`);
  });
});

describe("EST-40 dados estruturados", () => {
  it("EST-40: ProfilePage com Person completa", () => {
    const d = dadosEstruturados("pt") as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(d["@context"]).toBe("https://schema.org");
    expect(d["@type"]).toBe("ProfilePage");
    expect(d.inLanguage).toBe("pt-BR");
    const p = d.mainEntity;
    expect(p["@type"]).toBe("Person");
    expect(p.name).toBe("Matheus Cortes");
    expect(p.jobTitle).toBe("Engenheiro de software em formação");
    expect(p.alumniOf).toMatchObject({ "@type": "CollegeOrUniversity", name: "Universidade Vila Velha (UVV)" });
    expect(p.address).toMatchObject({ "@type": "PostalAddress", addressLocality: "Vitória", addressRegion: "ES", addressCountry: "BR" });
    expect(p.email).toMatch(/^mailto:.+@.+/);
    expect(p.sameAs).toEqual(expect.arrayContaining([
      expect.stringContaining("github.com/"), expect.stringContaining("linkedin.com/"), expect.stringContaining("tryhackme.com/"),
    ]));
    expect(p.knowsAbout).toEqual(expect.arrayContaining(["TypeScript", "Next.js", "Linux", "Burp Suite"]));
  });

  it("EST-40: hasCredential traz as 5 certificações com o emissor", () => {
    const cred = (dadosEstruturados("en") as Record<string, any>).mainEntity.hasCredential; // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(cred).toHaveLength(certificacoes.length);
    expect(cred).toHaveLength(5);
    certificacoes.forEach((c, i) => {
      expect(cred[i]).toMatchObject({ "@type": "EducationalOccupationalCredential", name: c.titulo.en, recognizedBy: { "@type": "Organization", name: c.emissor } });
    });
  });

  it("EST-40: o JSON serializado não tem '<' cru", () => {
    const texto = jsonLd({ a: "</script><script>alert(1)</script>" });
    expect(texto).not.toContain("<");
    expect(JSON.parse(texto)).toEqual({ a: "</script><script>alert(1)</script>" });
  });
});

describe("EST-41 robots.txt", () => {
  it("EST-41: libera os robôs de busca e de IA pedidos e aponta o sitemap", () => {
    const r = montarRobots();
    const regras = Array.isArray(r.rules) ? r.rules : [r.rules];
    const agentes = regras.flatMap((x) => [x.userAgent].flat());
    for (const bot of ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot"]) {
      expect(agentes).toContain(bot);
      expect(ROBOS_LIBERADOS).toContain(bot);
    }
    expect(agentes).toContain("*");
    for (const x of regras) {
      expect([x.allow].flat()).toContain("/");
      expect([x.disallow].flat()).not.toContain("/");
      expect([x.disallow].flat()).not.toContain("/_next/");
    }
    expect(r.sitemap).toBe(`${BASE}/sitemap.xml`);
  });

  it("EST-41: cita o llms.txt num comentário", () => {
    const r = montarRobots();
    const regras = Array.isArray(r.rules) ? r.rules : [r.rules];
    const outros = regras.flatMap((x) => Object.entries(x.other ?? {}));
    expect(outros.some(([k, v]) => k.startsWith("#") && String(v).includes(`${BASE}/llms.txt`))).toBe(true);
  });
});
