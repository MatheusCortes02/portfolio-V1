/** Perfis públicos e e-mail de contato (usados na página, na abertura e no currículo em PDF). */
export const PERFIS = [
  { nome: "GitHub", url: "https://github.com/MatheusCortes02" },
  { nome: "LinkedIn", url: "https://www.linkedin.com/in/matheuscortes-cyber/" },
  { nome: "TryHackMe", url: "https://tryhackme.com/p/MatheusCortes02" },
  { nome: "LeetCode", url: "https://leetcode.com/u/VZrlA6VpFT/" },
];
export const EMAIL = "mb64md@gmail.com";
export const urlDoPerfil = (nome: string) => PERFIS.find((p) => p.nome === nome)!.url;
