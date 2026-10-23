/**
 * Dados do currículo em PDF (spec 003, EST-33). Tudo vem do próprio site: dicionários, projetos e certificações.
 * Os marcos da experiência resumem projetos feitos na Morro Alto – Creative Office (crédito em projetos.ts / projetos-clientes.ts).
 * O PDF é gerado por ferramentas/gerar_curriculo.mjs.
 */
import { certificacoes } from "@/conteudo/certificacoes";
import { en } from "@/conteudo/en";
import { EMAIL, urlDoPerfil } from "@/conteudo/perfis";
import { projetos } from "@/conteudo/projetos";
import { pt } from "@/conteudo/pt";
import type { Idioma } from "@/conteudo/tipos";

export const CURRICULO = {
  pt: "/curriculo/matheus-cortes-curriculo-pt.pdf",
  en: "/curriculo/matheus-cortes-curriculo-en.pdf",
} as const;

type T = { pt: string; en: string };

const ROTULOS: Record<"contato" | "objetivo" | "formacao" | "experiencia" | "projetos" | "certificacoes" | "competencias", T> = {
  contato: { pt: "Contato", en: "Contact" },
  objetivo: { pt: "Objetivo", en: "Objective" },
  formacao: { pt: "Formação", en: "Education" },
  experiencia: { pt: "Experiência", en: "Experience" },
  projetos: { pt: "Projetos", en: "Projects" },
  certificacoes: { pt: "Certificações", en: "Certifications" },
  competencias: { pt: "Competências técnicas", en: "Technical skills" },
};

const OBJETIVO: T = {
  pt: "Estágio em desenvolvimento de software ou em cibersegurança, para aplicar o que já entreguei em sites e sistemas publicados e seguir aprendendo com uma equipe experiente.",
  en: "An internship in software development or cybersecurity, to apply what I have already delivered in published websites and systems and keep learning from an experienced team.",
};

/** Marcos reais da experiência; `projeto` aponta para o estudo de caso de onde o fato foi tirado. */
const MARCOS: { projeto: string; texto: T }[] = [
  {
    projeto: "morro-alto-os",
    texto: {
      pt: "Sistema interno da agência em TanStack Start, React, TypeScript e Supabase, com permissões por cargo e regras de acesso por linha: pautas, financeiro, reuniões em vídeo, pesquisa de satisfação e assistente com IA, em uso diário pela equipe.",
      en: "Built the agency's internal system with TanStack Start, React, TypeScript and Supabase, with role-based permissions and row-level access rules: content tasks, finance, video meetings, satisfaction surveys and an AI assistant, in daily use by the team.",
    },
  },
  {
    projeto: "brasigran",
    texto: {
      pt: "Portal de treinamento da Brasigran Granitos em Next.js, PostgreSQL e Drizzle ORM, com autenticação JWT, senhas em bcrypt e interface em cinco idiomas, em contêineres Docker numa VPS e em uso pelos colaboradores.",
      en: "Brasigran Granitos training portal with Next.js, PostgreSQL and Drizzle ORM, JWT authentication, bcrypt-hashed passwords and a five-language interface, running in Docker containers on a VPS and used by employees.",
    },
  },
  {
    projeto: "hanadecor",
    texto: {
      pt: "Nova página da Hana Decor em HTML, CSS e JavaScript, substituindo o site em WordPress sem quebrar o funil de orçamento; testes em Node e Playwright e publicação em Docker numa VPS (no ar desde set. de 2026).",
      en: "New Hana Decor home page in HTML, CSS and JavaScript, replacing the WordPress site without breaking the quote funnel; tests in Node and Playwright and deployment in Docker on a VPS (live since Sep 2026).",
    },
  },
  {
    projeto: "sao-jorge",
    texto: {
      pt: "Site institucional bilíngue da São Jorge Group em Next.js, GSAP e Lenis, com sequência de quadros em canvas conduzida pela rolagem (saojorge.group).",
      en: "Bilingual corporate website for São Jorge Group with Next.js, GSAP and Lenis, featuring a scroll-driven canvas frame sequence (saojorge.group).",
    },
  },
];

const PROJETOS: { slug: string; texto: T }[] = [
  { slug: "solvered", texto: { pt: "Loja virtual em Next.js e TypeScript com catálogo, carrinho, contas com bcrypt, sessão JWT e SQLite.", en: "Online store in Next.js and TypeScript with catalogue, cart, bcrypt-hashed accounts, JWT sessions and SQLite." } },
  { slug: "arca", texto: { pt: "Plataforma de proteção animal com front-end em React e API em FastAPI (Python) com SQLite, publicada.", en: "Animal protection platform with a React front-end and a FastAPI (Python) API with SQLite, published." } },
  { slug: "dra-jania", texto: { pt: "Site de captação de pacientes em HTML, CSS e JavaScript, com SEO local e origem de cada contato registrada.", en: "Patient acquisition site in HTML, CSS and JavaScript, with local SEO and the source of every contact recorded." } },
  { slug: "cofre-de-tokens", texto: { pt: "Ferramenta de terminal em Python que gera tokens com o módulo secrets e os guarda num cofre protegido por senha.", en: "Python command-line tool that generates tokens with the secrets module and keeps them in a password-protected vault." } },
  { slug: "robo-sumo", texto: { pt: "Robô autônomo de mini sumô (InovaWeek UVV): firmware em C++ para ESP32, modelagem e manual de montagem.", en: "Autonomous mini sumo robot (InovaWeek UVV): C++ firmware for ESP32, modelling and an assembly manual." } },
];

const COMPETENCIAS: { grupo: T; itens: string[] }[] = [
  { grupo: { pt: "Linguagens", en: "Languages" }, itens: ["TypeScript", "JavaScript", "Python", "C++", "SQL", "HTML", "CSS"] },
  { grupo: { pt: "Front-end", en: "Front-end" }, itens: ["React", "Next.js", "Tailwind CSS"] },
  { grupo: { pt: "Back-end e dados", en: "Back-end and data" }, itens: ["Node.js", "FastAPI", "PostgreSQL", "SQLite", "Drizzle ORM"] },
  { grupo: { pt: "Segurança e redes", en: "Security and networking" }, itens: ["Linux", "Redes TCP/IP", "Modelo OSI", "DNS", "HTTP", "Nmap", "Burp Suite", "TryHackMe"] },
  { grupo: { pt: "Ferramentas e qualidade", en: "Tools and quality" }, itens: ["Git", "GitHub", "Docker", "Vitest", "Playwright", "ESP32"] },
];
const TRADUZ_ITEM: Record<string, string> = { "Redes TCP/IP": "TCP/IP networking", "Modelo OSI": "OSI model" };

export interface Curriculo {
  idioma: Idioma;
  nome: string;
  funcao: string;
  secoes: { id: keyof typeof ROTULOS; titulo: string }[];
  contato: { email: string; linkedin: string; github: string; local: string };
  objetivo: string;
  formacao: { curso: string; instituicao: string; periodo: string; texto: string };
  experiencia: { cargo: string; empresa: string; periodo: string; regime: string; local: string; marcos: { projeto: string; texto: string }[] }[];
  projetos: { slug: string; titulo: string; descricao: string; ano: string }[];
  certificacoes: { titulo: string; emissor: string }[];
  competencias: { grupo: string; itens: string[] }[];
}

export function montarCurriculo(idioma: Idioma): Curriculo {
  const t = idioma === "pt" ? pt : en;
  const ehPt = idioma === "pt";
  return {
    idioma,
    nome: "Matheus Cortes",
    funcao: t.hero.funcao,
    secoes: (Object.keys(ROTULOS) as (keyof typeof ROTULOS)[]).map((id) => ({ id, titulo: ROTULOS[id][idioma] })),
    contato: {
      email: EMAIL,
      linkedin: urlDoPerfil("LinkedIn"),
      github: urlDoPerfil("GitHub"),
      local: ehPt ? "Vitória, ES, Brasil" : "Vitória, ES, Brazil",
    },
    objetivo: OBJETIVO[idioma],
    formacao: {
      curso: t.sobre.trajetoria.itens[0].titulo,
      instituicao: t.sobre.trajetoria.itens[0].local,
      periodo: ehPt ? "2026 – atual · 2º período" : "2026 – present · 2nd semester",
      texto: t.sobre.trajetoria.itens[0].texto,
    },
    experiencia: [{
      cargo: t.sobre.trajetoria.itens[1].titulo,
      empresa: "Morro Alto – Creative Office",
      periodo: ehPt ? "mai.–out. de 2026" : "May–Oct 2026",
      regime: ehPt ? "Meio período" : "Part-time",
      local: ehPt ? "Vila Velha, ES · Presencial" : "Vila Velha, ES · On-site",
      marcos: MARCOS.map((m) => ({ projeto: m.projeto, texto: m.texto[idioma] })),
    }],
    projetos: PROJETOS.map(({ slug, texto }) => {
      const p = projetos.find((x) => x.slug === slug)!;
      return { slug, titulo: p.titulo[idioma], descricao: texto[idioma], ano: p.ano };
    }),
    certificacoes: certificacoes.map((c) => ({ titulo: c.titulo[idioma], emissor: c.emissor })),
    competencias: COMPETENCIAS.map((g) => ({ grupo: g.grupo[idioma], itens: ehPt ? g.itens : g.itens.map((i) => TRADUZ_ITEM[i] ?? i) })),
  };
}
