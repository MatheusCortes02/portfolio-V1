import { describe, expect, it } from "vitest";
import { deveBloquear } from "./bloqueio";

const CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36";
const HEADLESS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/142.0.0.0 Safari/537.36";
const NAVEGADORES = [
  CHROME,
  HEADLESS,
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0",
];
const ROBOS = [
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/142.0.0.0 Safari/537.36",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  "Claude-User/1.0 (+https://support.anthropic.com/)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)",
  // pré-visualização de link: o LinkedInBot se anuncia com "Apache-HttpClient", que está na lista de bloqueio
  "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)",
  "WhatsApp/2.23.20.0",
  "Twitterbot/1.0",
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
  "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)",
  "TelegramBot (like TwitterBot)",
];
const FERRAMENTAS = [
  "curl/8.9.1",
  "Wget/1.24.5",
  "python-requests/2.32.3",
  "Python/3.12 aiohttp/3.10.5",
  "python-httpx/0.27.0",
  "Python-urllib/3.12",
  "Go-http-client/2.0",
  "Java/21.0.4",
  "Apache-HttpClient/5.3 (Java/21)",
  "okhttp/4.12.0",
  "libwww-perl/6.77",
  "Scrapy/2.11.2 (+https://scrapy.org)",
  "Mozilla/4.5 (compatible; HTTrack 3.0x; Windows 98)",
  "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)",
  "axios/1.7.7",
  "node",
  "undici",
  "PostmanRuntime/7.42.0",
  "insomnia/2023.5.8",
  "HTTPie/3.2.3",
  "Mozilla/5.0 (Windows NT; Windows NT 10.0; pt-BR) WindowsPowerShell/5.1.26100.1",
  "Ruby",
  "GuzzleHttp/7",
  "Mozilla/5.0 (compatible; Nmap Scripting Engine; https://nmap.org/book/nse.html)",
  "sqlmap/1.8#stable (https://sqlmap.org)",
  "Mozilla/5.0 (compatible; Nuclei - Open-source project (github.com/projectdiscovery/nuclei))",
  "Fuzz Faster U Fool v2.1.0",
  "gobuster/3.6",
  "Mozilla/5.00 (Nikto/2.5.0) (Evasions:None) (Test:Port Check)",
  "masscan/1.3",
  "Mozilla/5.0 zgrab/0.x",
  "Deno/2.0.0",
  "Bun/1.1.30",
  "Dart/3.5 (dart:io)",
  "colly - https://github.com/gocolly/colly",
];

describe("EST-43 deveBloquear: pedidos de página", () => {
  it("EST-43: bloqueia User-Agent vazio ou só espaços", () => {
    expect(deveBloquear("", "/")).toBe(true);
    expect(deveBloquear(null, "/")).toBe(true);
    expect(deveBloquear(undefined, "/en")).toBe(true);
    expect(deveBloquear("   ", "/")).toBe(true);
  });

  it.each(FERRAMENTAS)("EST-43: bloqueia ferramenta de linha de comando ou raspagem: %s", (ua) => {
    expect(deveBloquear(ua, "/")).toBe(true);
    expect(deveBloquear(ua, "/en")).toBe(true);
  });

  it.each(NAVEGADORES)("EST-43: nunca bloqueia navegador comum nem o Chrome headless: %s", (ua) => {
    expect(deveBloquear(ua, "/")).toBe(false);
    expect(deveBloquear(ua, "/en")).toBe(false);
  });

  it.each(ROBOS)("EST-43: libera robôs de busca, de IA e de pré-visualização: %s", (ua) => {
    expect(deveBloquear(ua, "/")).toBe(false);
    expect(deveBloquear(ua, "/en")).toBe(false);
  });
});

describe("EST-43 deveBloquear: caminhos sempre liberados", () => {
  const LIVRES = [
    "/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt",
    "/favicon.ico", "/icon.png", "/apple-icon.png", "/manifest.webmanifest",
    "/_next/static/chunks/app.js", "/_next/image?url=%2Fmidia%2Fa.jpg&w=640&q=75",
    "/midia/og/og-pt-v2.jpg", "/midia/gravuras/04_cofre_bancario-papel.webp",
    "/curriculo/curriculo-pt.pdf", "/.well-known/security.txt",
  ];
  it.each(LIVRES)("EST-43: %s fica livre até para curl e User-Agent vazio", (caminho) => {
    expect(deveBloquear("curl/8.9.1", caminho)).toBe(false);
    expect(deveBloquear("", caminho)).toBe(false);
  });

  it("EST-43: caminho parecido com os livres continua protegido", () => {
    expect(deveBloquear("curl/8.9.1", "/midiax")).toBe(true);
    expect(deveBloquear("curl/8.9.1", "/llms.txt.html")).toBe(true);
    expect(deveBloquear("curl/8.9.1", "/en/")).toBe(true);
  });
});
