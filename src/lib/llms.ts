// llms.txt e llms-full.txt (EST-41, formato llmstxt.org), gerados de src/conteudo/ para não ficarem desatualizados.
import { certificacoes } from "@/conteudo/certificacoes";
import { projetos } from "@/conteudo/projetos";
import { pt } from "@/conteudo/pt";
import { EMAIL, NOME, PERFIS, urlAbsoluta } from "./site";

/** EST-96: links internos do site (ex.: o write-up W-02) saem absolutos no llms.txt */
const absoluto = (url: string) => (url.startsWith("/") ? urlAbsoluta(url) : url);

const CATEGORIA = pt.projetos.categorias;

function linkProjeto(p: (typeof projetos)[number]): string | undefined {
  const url = p.links[0]?.url;
  return p.restrito || !url ? undefined : absoluto(url);
}

function perfis(): string[] {
  return [
    `- [GitHub](${PERFIS.github}): repositórios públicos e código dos projetos`,
    `- [LinkedIn](${PERFIS.linkedin}): experiência e certificações`,
    `- [TryHackMe](${PERFIS.tryhackme}): estudos práticos de segurança`,
    `- [LeetCode](${PERFIS.leetcode}): exercícios de algoritmos`,
    `- [E-mail](mailto:${EMAIL}): contato direto`,
  ];
}

function curriculos(pdfs: string[]): string[] {
  return pdfs.map((f) => `- [Currículo (${f})](${urlAbsoluta(`/curriculo/${f}`)}): PDF para download`);
}

export function gerarLlms(pdfs: string[]): string {
  const l: string[] = [
    `# ${NOME}`,
    "",
    `> ${pt.meta.descricao} ${pt.hero.apresentacao} Mora em Vitória, Espírito Santo, Brasil, e busca estágio em cibersegurança ou em desenvolvimento.`,
    "",
    "Site de uma página em português (/) e inglês (/en). Cada projeto é um estudo de caso com o desafio, o que foi feito e o resultado. O texto completo está em llms-full.txt.",
    "",
    "## Páginas",
    "",
    `- [Portfólio em português](${urlAbsoluta("/")}): sobre, projetos, certificações, write-ups, atividade no GitHub e contato`,
    `- [Portfolio in English](${urlAbsoluta("/en")}): the same content in English`,
    `- [Texto completo para IA](${urlAbsoluta("/llms-full.txt")}): todo o conteúdo do site em texto corrido`,
    ...curriculos(pdfs),
    "",
    "## Projetos",
    "",
    ...projetos.map((p) => {
      const url = linkProjeto(p);
      const rotulo = `${p.titulo.pt} (${CATEGORIA[p.categoria]}, ${p.ano})`;
      return url ? `- [${p.titulo.pt}](${url}): ${rotulo.slice(p.titulo.pt.length + 1)} ${p.resumo.pt}` : `- ${p.titulo.pt}: ${rotulo.slice(p.titulo.pt.length + 1)} ${p.resumo.pt} Acesso restrito.`;
    }),
    "",
    "## Perfis",
    "",
    ...perfis(),
    "",
    "## Optional",
    "",
    `- [Sitemap](${urlAbsoluta("/sitemap.xml")}): páginas e idiomas`,
    "",
  ];
  return l.join("\n");
}

export function gerarLlmsFull(pdfs: string[]): string {
  const s = pt.sobre;
  const l: string[] = [
    `# ${NOME}`,
    "",
    `> ${pt.meta.descricao} ${pt.hero.apresentacao}`,
    "",
    `Função: ${pt.hero.funcao}. Local: Vitória, Espírito Santo, Brasil. Versão em inglês: ${urlAbsoluta("/en")}.`,
    "",
    "## Sobre",
    "",
    ...s.paragrafos.flatMap((p) => [p, ""]),
    `- ${s.fatos.formacao}: ${s.fatos.formacaoValor}`,
    `- ${s.fatos.foco}: ${s.fatos.focoValor}`,
    "",
    `### ${s.oQueFaco.titulo}`,
    "",
    ...s.oQueFaco.itens.map((i) => `- ${i.titulo}: ${i.texto}`),
    "",
    "## Experiência e formação",
    "",
    ...s.trajetoria.itens.flatMap((t) => [`### ${t.titulo}`, "", `${t.periodo} · ${t.local}`, "", t.texto, ""]),
    "## Projetos",
    "",
    ...projetos.flatMap((p) => [
      `### ${p.titulo.pt}`,
      "",
      `${CATEGORIA[p.categoria]} · ${p.ano}${p.credito ? ` · ${p.credito.pt}` : ""}${p.restrito ? " · acesso restrito" : ""}`,
      "",
      p.resumo.pt,
      "",
      `- ${pt.projetos.desafio}: ${p.desafio.pt}`,
      `- ${pt.projetos.solucao}: ${p.solucao.pt}`,
      `- ${pt.projetos.resultado}: ${p.resultado.pt}`,
      ...(p.extra ? [`- ${p.extra.titulo.pt}: ${p.extra.texto.pt}`] : []),
      `- ${pt.projetos.tecnologias}: ${p.stack.join(", ")}`,
      ...(p.restrito ? [] : p.links.map((k) => `- [${k.rotulo.pt}](${absoluto(k.url)})`)),
      "",
    ]),
    "## Certificações",
    "",
    ...certificacoes.map((c) => `- ${c.titulo.pt} (${c.emissor}): ${c.descricao.pt} Competências: ${c.competencias.pt.join(", ")}.`),
    "",
    "## Tecnologias",
    "",
    ...s.tecnologias.grupos.map((g) => `- ${g.nome}: ${g.itens.join(", ")}`),
    "",
    "## Contato",
    "",
    pt.contato.lead,
    "",
    ...perfis(),
    ...curriculos(pdfs),
    "",
  ];
  return l.join("\n");
}
