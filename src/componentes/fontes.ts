import { Grenze_Gotisch, IBM_Plex_Mono, JetBrains_Mono, UnifrakturMaguntia } from "next/font/google";

export const gotica = UnifrakturMaguntia({ weight: "400", subsets: ["latin"], variable: "--f-gotica", display: "swap" });
// variável (um arquivo para 500, 600 e 700, os pesos usados no CSS); antes 400/500/700 e o 600 caía no 700 (EST-28)
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });
// sem itálico: nenhum texto do site usa (dois arquivos a menos pré-carregados, EST-28)
export const corpo = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], style: ["normal"], variable: "--f-corpo", display: "swap" });
/** Gótica mais aberta para títulos: a Unifraktur fica só no nome e nos números (pedido de 2026-10-20: "essa fonte é um pouco difícil de ler"). */
// sem pré-carregar: só aparece abaixo da primeira tela, e os 2 arquivos (~83 KB) disputavam banda com a fonte do nome, que é o LCP
export const titulo = Grenze_Gotisch({ subsets: ["latin"], weight: ["500", "600"], variable: "--f-titulo", display: "swap", preload: false });
export const classesFontes = `${gotica.variable} ${titulo.variable} ${mono.variable} ${corpo.variable}`;
