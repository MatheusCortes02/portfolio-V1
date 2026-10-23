import type { Idioma } from "@/conteudo/tipos";

// Desempenho (EST-44): componentes de cliente recebem os dados já reduzidos ao idioma da página.
// Cada texto { pt, en } vira { [idioma]: valor }, então `texto[idioma]` continua funcionando no componente,
// e o outro idioma não entra no HTML (o payload do React levava os dois).
function ehTexto(v: unknown): v is Record<Idioma, unknown> {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const chaves = Object.keys(v);
  return chaves.length === 2 && chaves.includes("pt") && chaves.includes("en");
}

export function soIdioma<T>(valor: T, idioma: Idioma): T {
  if (Array.isArray(valor)) return valor.map((v) => soIdioma(v, idioma)) as T;
  if (ehTexto(valor)) return { [idioma]: valor[idioma] } as T;
  if (valor && typeof valor === "object") {
    return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, soIdioma(v, idioma)])) as T;
  }
  return valor;
}
