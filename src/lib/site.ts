// Endereço e dados fixos do site (EST-39 a EST-41).
// O domínio definitivo ainda não foi escolhido. Ordem: NEXT_PUBLIC_SITE_URL (definir na Vercel quando houver domínio),
// depois VERCEL_PROJECT_PRODUCTION_URL (domínio de produção que a própria Vercel informa no build, sem "https://"),
// e por fim a reserva abaixo — pergunta aberta na spec 003.

const RESERVA = "https://matheuscortes.vercel.app";

function normalizar(url: string | undefined): string | undefined {
  let limpo = (url ?? "").trim().replace(/\/+$/, "");
  if (limpo && !/^https?:\/\//.test(limpo)) limpo = `https://${limpo}`;
  return /^https?:\/\/[^/\s]+$/.test(limpo) ? limpo : undefined;
}

/** Origem absoluta do site, sem barra no fim. */
export const SITE_URL =
  normalizar(process.env.NEXT_PUBLIC_SITE_URL) ?? normalizar(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? RESERVA;

/** Caminho do site ("/", "/en", "/llms.txt") como endereço absoluto. */
export function urlAbsoluta(caminho: string): string {
  return `${SITE_URL}${caminho.startsWith("/") ? caminho : `/${caminho}`}`;
}

export const NOME = "Matheus Cortes";

// Mesmos valores de src/componentes/Pagina.tsx (PERFIS e EMAIL); se mudar lá, mude aqui.
export const EMAIL = "mb64md@gmail.com";
export const PERFIS = {
  github: "https://github.com/MatheusCortes02",
  linkedin: "https://www.linkedin.com/in/matheuscortes-cyber/",
  tryhackme: "https://tryhackme.com/p/MatheusCortes02",
  leetcode: "https://leetcode.com/u/VZrlA6VpFT/",
} as const;

/** Rotas de cada idioma. */
export const ROTAS = { pt: "/", en: "/en" } as const;

/** hreflang absolutos, iguais nas duas páginas e no sitemap. */
export function idiomasAlternativos(): Record<string, string> {
  return { "pt-BR": urlAbsoluta(ROTAS.pt), en: urlAbsoluta(ROTAS.en), "x-default": urlAbsoluta(ROTAS.pt) };
}
