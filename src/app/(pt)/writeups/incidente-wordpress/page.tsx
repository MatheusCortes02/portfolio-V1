import type { Metadata } from "next";
import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// EST-96: write-up W-02 publicado no próprio site (gerado de docs/writeups/ por ferramentas/gerar_writeup.py)
export const metadata: Metadata = {
  title: "Resposta a incidente: WordPress comprometido — Matheus Cortes",
  description: "Write-up de resposta a incidente: SEO spam com cloaking num WordPress, persistência, MITRE ATT&CK, limpeza e o que corrigir. Cliente e agência anonimizados.",
  alternates: { canonical: "/writeups/incidente-wordpress" },
};

const html = readFileSync(join(process.cwd(), "src/conteudo/writeups/incidente-wordpress.html"), "utf8");

export default function WriteupIncidenteWordpress() {
  return (
    <main id="conteudo" className="writeup-pagina lado-papel">
      <Link className="writeup-voltar" href="/#writeups">← Voltar ao portfólio</Link>
      <article className="writeup-texto" dangerouslySetInnerHTML={{ __html: html }} />
      <Link className="writeup-voltar" href="/#writeups">← Voltar ao portfólio</Link>
    </main>
  );
}
