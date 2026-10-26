import localFont from "next/font/local";

// EST-76 (2026-10-26): fontes no próprio repositório (subconjunto latin, ferramentas/baixar_fontes.py, licença OFL).
// O build na Vercel quebrava no carregador de fontes do Google ("queries have exactly one entry", na Grenze Gotisch); assim o build
// não depende do Google e o visitante também não busca nada lá.
export const gotica = localFont({ src: "../fontes/unifraktur-maguntia-400.woff2", weight: "400", variable: "--f-gotica", display: "swap" });
// variável (um arquivo para 500, 600 e 700, os pesos usados no CSS; EST-28)
export const mono = localFont({ src: "../fontes/jetbrains-mono-variavel.woff2", weight: "100 800", variable: "--f-mono", display: "swap" });
// sem itálico: nenhum texto do site usa (EST-28)
export const corpo = localFont({
  src: [
    { path: "../fontes/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../fontes/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--f-corpo", display: "swap",
});
/** Gótica mais aberta para títulos: a Unifraktur fica só no nome e nos números (pedido de 2026-10-20: "essa fonte é um pouco difícil de ler"). */
// sem pré-carregar: só aparece abaixo da primeira tela e não deve disputar banda com a fonte do nome, que é o LCP;
// variável (500 a 600): um arquivo de 41 KB no lugar dos dois de antes (~83 KB)
export const titulo = localFont({ src: "../fontes/grenze-gotisch-variavel.woff2", weight: "500 600", variable: "--f-titulo", display: "swap", preload: false });
export const classesFontes = `${gotica.variable} ${titulo.variable} ${mono.variable} ${corpo.variable}`;
