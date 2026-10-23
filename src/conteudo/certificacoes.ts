import type { Texto } from "./tipos";

export interface Certificacao {
  emissor: string;
  titulo: Texto;
  categoria: Texto;
  /** Frase geral sobre o tema do curso (sem afirmar conteúdo específico que não foi informado). */
  descricao: Texto;
  /** Do LinkedIn quando existem; senão, os temas do próprio título. */
  competencias: { pt: string[]; en: string[] };
}

/** Certificações (EST-21), da mais recente para a mais antiga (LinkedIn, 2026-10-22). */
export const certificacoes: Certificacao[] = [
  {
    emissor: "Universidade de São Paulo",
    titulo: { pt: "Cibersegurança: Segurança da Informação e Ataques Cibernéticos", en: "Cybersecurity: Information Security and Cyber Attacks" },
    categoria: { pt: "Segurança", en: "Security" },
    descricao: {
      pt: "Fundamentos de segurança da informação e dos principais tipos de ataques cibernéticos.",
      en: "Foundations of information security and the main types of cyber attacks.",
    },
    competencias: { pt: ["Segurança da informação", "Ataques cibernéticos"], en: ["Information security", "Cyber attacks"] },
  },
  {
    emissor: "Google",
    titulo: { pt: "Certificado Profissional de Google AI", en: "Google AI Professional Certificate" },
    categoria: { pt: "IA", en: "AI" },
    descricao: {
      pt: "Uso de inteligência artificial e aprendizado de máquina na prática profissional.",
      en: "Using artificial intelligence and machine learning in professional practice.",
    },
    competencias: { pt: ["Inteligência artificial", "Aprendizado de máquina"], en: ["Artificial intelligence", "Machine learning"] },
  },
  {
    emissor: "Cisco Networking Academy",
    titulo: { pt: "Introdução à Cibersegurança", en: "Introduction to Cybersecurity" },
    categoria: { pt: "Segurança", en: "Security" },
    descricao: {
      pt: "Primeiro contato estruturado com ameaças, vulnerabilidades e formas de proteção no ambiente digital.",
      en: "A structured first look at threats, vulnerabilities and ways to protect the digital environment.",
    },
    competencias: { pt: ["Cibersegurança"], en: ["Cybersecurity"] },
  },
  {
    emissor: "FIAP",
    titulo: { pt: "Linux Fundamentos", en: "Linux Fundamentals" },
    categoria: { pt: "Sistemas", en: "Systems" },
    descricao: {
      pt: "Fundamentos do sistema operacional Linux e do uso do terminal.",
      en: "Foundations of the Linux operating system and of working in the terminal.",
    },
    competencias: { pt: ["Linux"], en: ["Linux"] },
  },
  {
    emissor: "FGV Online",
    titulo: { pt: "Introdução ao Git e GitHub", en: "Introduction to Git and GitHub" },
    categoria: { pt: "Ferramentas", en: "Tools" },
    descricao: {
      pt: "Controle de versão com Git e trabalho com repositórios no GitHub.",
      en: "Version control with Git and working with repositories on GitHub.",
    },
    competencias: { pt: ["Git", "GitHub"], en: ["Git", "GitHub"] },
  },
];
