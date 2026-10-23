// Filtro de clientes automatizados (EST-43). Função pura usada por src/proxy.ts.
// Limite: o User-Agent é escolhido por quem faz o pedido; isto só afasta ferramenta sem disfarce.
// A proteção real fica na Vercel (Firewall, Bot Protection, Attack Challenge Mode, limite de taxa).

/** Caminhos que nunca passam pelo filtro: arquivos para robôs, ícones, estáticos, mídia e currículos. */
const ARQUIVOS_LIVRES = new Set([
  "/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt",
  "/favicon.ico", "/icon.png", "/apple-icon.png", "/manifest.webmanifest",
]);
const PASTAS_LIVRES = ["/_next/", "/midia/", "/curriculo/", "/.well-known/"];

/** Robôs de busca, de IA e de pré-visualização de link: liberados mesmo que tragam um termo da lista de bloqueio. */
const ROBOS = /googlebot|google-inspectiontool|googleother|google-extended|apis-google|storebot-google|adsbot-google|bingbot|bingpreview|msnbot|duckduckbot|applebot|yandexbot|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-user|claude-searchbot|anthropic-ai|perplexitybot|perplexity-user|facebookexternalhit|facebot|meta-externalagent|twitterbot|linkedinbot|slackbot|whatsapp|discordbot|telegrambot|pinterestbot|redditbot|skypeuripreview|vercel/i;

/** Ferramentas de linha de comando, bibliotecas HTTP e scanners. */
const FERRAMENTAS = new RegExp([
  "curl", "wget", "python-requests", "python-urllib", "python-httpx", "aiohttp", "httpx", "go-http-client", "java/",
  "apache-httpclient", "jakarta commons-httpclient", "okhttp", "libwww-perl", "lwp::", "scrapy", "httrack", "node-fetch",
  "axios", "undici", "postmanruntime", "insomnia", "httpie", "powershell", "guzzlehttp", "php/", "mechanize", "colly",
  "nmap", "sqlmap", "nuclei", "fuzz faster u fool", "ffuf", "gobuster", "dirbuster", "nikto", "wpscan", "masscan", "zgrab",
  "deno/", "bun/", "dart/", "reqwest", "hackney", "faraday", "rest-client", "http_request2",
].map((s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|"), "i");
/** User-Agent que é só o nome de um runtime ("node", "undici", "Ruby"). */
const SO_RUNTIME = /^(node|undici|ruby|python|java|go|perl|php)$/i;

export function caminhoLivre(caminho: string): boolean {
  return ARQUIVOS_LIVRES.has(caminho) || PASTAS_LIVRES.some((p) => caminho.startsWith(p));
}

/** true quando o pedido de página deve receber 403. */
export function deveBloquear(ua: string | null | undefined, caminho: string): boolean {
  if (caminhoLivre(caminho)) return false;
  const agente = (ua ?? "").trim();
  if (!agente) return true;
  if (ROBOS.test(agente)) return false;
  return FERRAMENTAS.test(agente) || SO_RUNTIME.test(agente);
}
