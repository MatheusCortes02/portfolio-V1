export const USUARIO = "MatheusCortes02";

export interface Dia {
  data: string;
  nivel: number;
  qtd: number;
}

export interface Repositorio {
  nome: string;
  descricao: string | null;
  linguagem: string | null;
  url: string;
  atualizado: string;
}

/** Lê o HTML público do gráfico de contribuições (a mesma página que o perfil do GitHub usa). */
export function lerContribuicoes(html: string): Dia[] {
  const quantidade = new Map<string, number>();
  for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = /(\d[\d,]*) contribution/.exec(m[2]);
    quantidade.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
  }
  const dias: Dia[] = [];
  for (const m of html.matchAll(/<td\b[^>]*ContributionCalendar-day[^>]*>/g)) {
    const tag = m[0];
    const data = /data-date="([\d-]+)"/.exec(tag)?.[1];
    const nivel = /data-level="(\d)"/.exec(tag)?.[1];
    const id = /\bid="([^"]+)"/.exec(tag)?.[1] ?? "";
    if (data && nivel) dias.push({ data, nivel: Number(nivel), qtd: quantidade.get(id) ?? 0 });
  }
  return dias.sort((a, b) => a.data.localeCompare(b.data));
}

export function estatisticas(dias: Dia[]) {
  let total = 0, ativos = 0, seq = 0, maiorSequencia = 0;
  for (const d of dias) {
    total += d.qtd;
    if (d.qtd) { ativos++; seq++; } else seq = 0;
    maiorSequencia = Math.max(maiorSequencia, seq);
  }
  return { total, ativos, maiorSequencia };
}
