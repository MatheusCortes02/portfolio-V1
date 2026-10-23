export type Idioma = "pt" | "en";

/** Texto nos dois idiomas do site. */
export interface Texto {
  pt: string;
  en: string;
}

export type Categoria = "fullstack" | "frontend" | "seguranca" | "hardware" | "jogos";

export interface Captura {
  /** Caminho a partir de /public, ex.: "/midia/capturas/solvered/inicio-01.jpg" */
  arquivo: string;
  largura: number;
  altura: number;
  alt: Texto;
  tipo: "desktop" | "celular" | "render" | "terminal";
}

export interface Projeto {
  slug: string;
  titulo: Texto;
  categoria: Categoria;
  ano: string;
  /** Ex.: "Cliente da Morro Alto Creative Office" */
  credito?: Texto;
  /** Uma frase para a lista. */
  resumo: Texto;
  desafio: Texto;
  solucao: Texto;
  resultado: Texto;
  /** Bloco opcional, ex.: "O que eu faria diferente". */
  extra?: { titulo: Texto; texto: Texto };
  stack: string[];
  links: { rotulo: Texto; url: string }[];
  capturas: Captura[];
  /** Nome-base da gravura de /public/midia/gravuras (sem "-papel.webp"/"-preto.webp"). */
  gravura?: string;
  /** Sistema interno: sem link público. */
  restrito?: boolean;
  /** EST-29: "Meu papel · Equipe", com base na vault (sem menção a IA: EST-54). */
  papel?: Texto;
  /** EST-29: cliente ou sistema da agência (cartão mostra "Trabalho profissional"). */
  profissional?: boolean;
}
