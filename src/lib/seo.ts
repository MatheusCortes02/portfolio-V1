// SEO, dados estruturados, sitemap e robots (EST-39 a EST-41). Funções puras, testadas em seo.test.ts.
import type { Metadata, MetadataRoute } from "next";
import { certificacoes } from "@/conteudo/certificacoes";
import { en } from "@/conteudo/en";
import { pt } from "@/conteudo/pt";
import type { Idioma } from "@/conteudo/tipos";
import { EMAIL, NOME, PERFIS, ROTAS, SITE_URL, idiomasAlternativos, urlAbsoluta } from "./site";

const DIC = { pt, en };

const PALAVRAS = {
  pt: ["Matheus Cortes", "portfólio", "engenharia de software", "desenvolvedor web", "Next.js", "React", "TypeScript",
    "cibersegurança", "segurança ofensiva", "estágio em cibersegurança", "estágio em desenvolvimento", "UVV", "Vitória", "Espírito Santo"],
  en: ["Matheus Cortes", "portfolio", "software engineering", "web developer", "Next.js", "React", "TypeScript",
    "cybersecurity", "offensive security", "cybersecurity internship", "developer internship", "UVV", "Vitória", "Brazil"],
};

const ALT_OG = {
  pt: "Cédula em gravura verde com o nome Matheus Cortes, a função Engenheiro de software em formação e o foco em desenvolvimento web e cibersegurança",
  en: "Green engraved banknote with the name Matheus Cortes, the role Software engineer in training and a focus on web development and cybersecurity",
};

export function montarMetadata(idioma: Idioma): Metadata {
  const t = DIC[idioma].meta;
  const url = urlAbsoluta(ROTAS[idioma]);
  const imagem = { url: `/midia/og/og-${idioma}-v2.jpg`, width: 1200, height: 630, alt: ALT_OG[idioma], type: "image/jpeg" };
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.titulo, template: `%s · ${NOME}` },
    description: t.descricao,
    keywords: PALAVRAS[idioma],
    authors: [{ name: NOME, url: urlAbsoluta("/") }],
    creator: NOME,
    publisher: NOME,
    alternates: { canonical: url, languages: idiomasAlternativos() },
    openGraph: {
      type: "profile",
      url,
      siteName: NOME,
      title: t.titulo,
      description: t.descricao,
      locale: idioma === "pt" ? "pt_BR" : "en_US",
      alternateLocale: [idioma === "pt" ? "en_US" : "pt_BR"],
      firstName: "Matheus",
      lastName: "Cortes",
      images: [imagem],
    },
    twitter: { card: "summary_large_image", title: t.titulo, description: t.descricao, images: [imagem] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false },
  };
}

/** ProfilePage + Person (schema.org) no idioma da página. */
export function dadosEstruturados(idioma: Idioma) {
  const t = DIC[idioma];
  const url = urlAbsoluta(ROTAS[idioma]);
  const conhecimentos = [...new Set(t.sobre.tecnologias.grupos.flatMap((g) => g.itens))];
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#pagina`,
    url,
    name: t.meta.titulo,
    description: t.meta.descricao,
    inLanguage: idioma === "pt" ? "pt-BR" : "en",
    mainEntity: {
      "@type": "Person",
      "@id": `${urlAbsoluta("/")}#pessoa`,
      name: NOME,
      givenName: "Matheus",
      familyName: "Cortes",
      url: urlAbsoluta("/"),
      image: urlAbsoluta(`/midia/og/og-${idioma}-v2.jpg`),
      jobTitle: t.hero.funcao,
      description: t.hero.apresentacao,
      email: `mailto:${EMAIL}`,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade Vila Velha (UVV)", url: "https://www.uvv.br/" },
      address: { "@type": "PostalAddress", addressLocality: "Vitória", addressRegion: "ES", addressCountry: "BR" },
      nationality: { "@type": "Country", name: "Brasil" },
      sameAs: [PERFIS.github, PERFIS.linkedin, PERFIS.tryhackme],
      knowsAbout: conhecimentos,
      knowsLanguage: ["pt-BR", "en"],
      hasCredential: certificacoes.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.titulo[idioma],
        credentialCategory: idioma === "pt" ? "certificado" : "certificate",
        about: c.competencias[idioma],
        recognizedBy: { "@type": "Organization", name: c.emissor },
      })),
    },
  };
}

/** JSON para <script type="application/ld+json">, sem "<" cru (evita fechar a tag). */
export function jsonLd(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, "\\u003c");
}

export function montarSitemap(pdfs: string[]): MetadataRoute.Sitemap {
  const languages = idiomasAlternativos();
  const paginas: MetadataRoute.Sitemap = [
    { url: urlAbsoluta(ROTAS.pt), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: urlAbsoluta(ROTAS.en), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
  const curriculos: MetadataRoute.Sitemap = pdfs.map((f) => ({ url: urlAbsoluta(`/curriculo/${f}`), changeFrequency: "monthly", priority: 0.6 }));
  return [...paginas, ...curriculos];
}

/** Robôs de busca e de IA citados nominalmente no robots.txt (todos liberados). */
export const ROBOS_LIBERADOS = [
  "Googlebot", "Bingbot", "Applebot", "DuckDuckBot", "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended",
];

// Não bloqueia /_next/: o Google precisa do CSS e do JS para renderizar a página (orientação do Search Central).
const FORA_DO_INDICE = ["/api/", "/*?_rsc="];

export function montarRobots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: FORA_DO_INDICE, other: { "# Resumo para IA (llmstxt.org)": urlAbsoluta("/llms.txt") } },
      { userAgent: ROBOS_LIBERADOS, allow: "/", disallow: FORA_DO_INDICE, other: { "# Texto completo para IA": urlAbsoluta("/llms-full.txt") } },
    ],
    sitemap: urlAbsoluta("/sitemap.xml"),
  };
}
