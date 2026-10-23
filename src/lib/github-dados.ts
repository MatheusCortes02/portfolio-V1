import { cacheLife } from "next/cache";
import reserva from "@/conteudo/contribuicoes-reserva.json";
import { lerContribuicoes, USUARIO, type Dia, type Repositorio } from "./github";

// GH-02: dados do GitHub buscados no servidor e guardados por um dia (Cache Components, perfil "days").
/** GH-02/GH-03: busca no servidor uma vez por dia; se falhar, usa os últimos dados guardados. */
export async function buscarContribuicoes(): Promise<{ dias: Dia[]; lidoEm: string }> {
  "use cache";
  cacheLife("days");
  try {
    const r = await fetch(`https://github.com/users/${USUARIO}/contributions`, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio-matheus-cortes)" },
    });
    if (!r.ok) throw new Error(String(r.status));
    const dias = lerContribuicoes(await r.text());
    if (dias.length < 300) throw new Error("gráfico incompleto");
    return { dias, lidoEm: new Date().toISOString().slice(0, 10) };
  } catch {
    return { dias: reserva.dias, lidoEm: reserva.conferido };
  }
}

export async function buscarRepositorios(): Promise<{ total: number; recentes: Repositorio[]; linguagens: { nome: string; pct: number }[] }> {
  "use cache";
  cacheLife("days");
  try {
    const r = await fetch(`https://api.github.com/users/${USUARIO}/repos?per_page=100&sort=pushed`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!r.ok) throw new Error(String(r.status));
    const repos = (await r.json()) as { name: string; description: string | null; language: string | null; html_url: string; pushed_at: string; fork: boolean; size: number }[];
    // EST-11: o repositório do write-up tem descrição explícita; no site ele aparece só pela seção Write-ups.
    const proprios = repos.filter((x) => !x.fork && x.name !== USUARIO && x.name !== "hls-iframe-access-writeup");
    const soma = new Map<string, number>();
    for (const x of proprios) if (x.language) soma.set(x.language, (soma.get(x.language) ?? 0) + Math.max(x.size, 1));
    const total = [...soma.values()].reduce((a, b) => a + b, 0) || 1;
    const linguagens = [...soma.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([nome, n]) => ({ nome, pct: Math.round((1000 * n) / total) / 10 }));
    return {
      total: proprios.length,
      recentes: proprios.slice(0, 6).map((x) => ({ nome: x.name, descricao: x.description, linguagem: x.language, url: x.html_url, atualizado: x.pushed_at })),
      linguagens,
    };
  } catch {
    return { total: 0, recentes: [], linguagens: [] };
  }
}
