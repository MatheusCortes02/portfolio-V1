// Ícones das tecnologias (EST-12): logotipos do Simple Icons (CC0) em uma cor só; glifos próprios para o que não tem marca.
import {
  siBurpsuite, siCplusplus, siCss, siLeetcode, siEspressif, siFastapi, siGit, siGithub, siHtml5, siJavascript, siLinux,
  siNextdotjs, siNodedotjs, siDocker, siSupabase, siVitest, siDrizzle, siGsap, siPostgresql, siPython, siReact, siSqlite, siTailwindcss, siTryhackme, siTypescript,
} from "simple-icons";

export type Icone = { tipo: "logo" | "glifo"; path: string };

const logo = (i: { path: string }): Icone => ({ tipo: "logo", path: i.path });
// glifos em traço, caixa 24 × 24
const BANCO: Icone = { tipo: "glifo", path: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" };
const REDE: Icone = { tipo: "glifo", path: "M12 6.5v5m0 0-6 5.6m6-5.6 6 5.6M14.5 4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM6.5 19a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm16 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" };
// LinkedIn saiu do Simple Icons a pedido da marca; este é o desenho que o pacote publicava (CC0)
const LINKEDIN: Icone = { tipo: "logo", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" };
const EMAIL: Icone = { tipo: "glifo", path: "M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7" };
// ferramentas e conteúdos do Pre Security (TryHackMe) sem logotipo livre: glifos próprios, sem imitar marca
const NMAP: Icone = { tipo: "glifo", path: "M12 3a9 9 0 1 0 9 9M12 7.5a4.5 4.5 0 1 0 4.5 4.5M12 12l7.5-7.5M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" };
const OSI: Icone = { tipo: "glifo", path: "M12 3 3 7.5l9 4.5 9-4.5L12 3ZM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" };
const DNS: Icone = { tipo: "glifo", path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" };
const HTTP: Icone = { tipo: "glifo", path: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" };
const JANELA: Icone = { tipo: "glifo", path: "M3 5h18v14H3zM12 5v14M3 12h18" };
// Playwright não está no Simple Icons: glifo próprio (navegador com marca de conferido)
const NAVEGADOR_TESTE: Icone = { tipo: "glifo", path: "M3 5h18v14H3zM3 9h18M6 7h.01M8.5 14.5l2.5 2.5 5-5" };
const TRAFEGO: Icone = { tipo: "glifo", path: "M2 12h4l2.5-7 4 14 3-9 1.8 2H22" };

const ICONES: Record<string, Icone> = {
  TypeScript: logo(siTypescript), JavaScript: logo(siJavascript), Python: logo(siPython), "C++": logo(siCplusplus),
  SQL: BANCO, HTML: logo(siHtml5), CSS: logo(siCss),
  React: logo(siReact), "Next.js": logo(siNextdotjs), "Tailwind CSS": logo(siTailwindcss),
  "Node.js": logo(siNodedotjs), Docker: logo(siDocker), Supabase: logo(siSupabase), Playwright: NAVEGADOR_TESTE,
  Vitest: logo(siVitest), "Drizzle ORM": logo(siDrizzle), GSAP: logo(siGsap),
  FastAPI: logo(siFastapi), PostgreSQL: logo(siPostgresql), SQLite: logo(siSqlite),
  Linux: logo(siLinux), "Redes TCP/IP": REDE, "TCP/IP networking": REDE, "Análise de tráfego": TRAFEGO, "Traffic analysis": TRAFEGO,
  TryHackMe: logo(siTryhackme), Git: logo(siGit), GitHub: logo(siGithub), ESP32: logo(siEspressif),
  Windows: JANELA, "Modelo OSI": OSI, "OSI model": OSI, DNS, HTTP, Nmap: NMAP, "Burp Suite": logo(siBurpsuite),
  // perfis do Contato
  LinkedIn: LINKEDIN, LeetCode: logo(siLeetcode), "E-mail": EMAIL,
};

export function iconeDe(nome: string): Icone | undefined {
  return ICONES[nome];
}
