import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { statSync } from "node:fs";
import { ATO1, ATO3_MIDIA, CARREGANDO_FIM, COFRE_MIDIA, HERO_INTRO_MIDIA, HERO_LOOP_MIDIA, aoFimDaIntro, inicioDoHero, CONTADORA_MIDIA, FITA_MIDIA, acaoAoRegistrar, cofreAberto, mostrarAbertura, passoDoLoop, passoDoSelo, posterReduzido, type EstadoDoSelo, type MidiaVideo } from "@/lib/animacoes";

const raiz = process.cwd();
const ler = (p: string) => readFileSync(join(raiz, p), "utf8");
function confereMidia(m: MidiaVideo, maxMb: number) {
  for (const url of [m.webm, m.mp4, m.inicio, m.fim]) {
    expect(url).toMatch(/-v\d+[.-]/);
    const arq = join(raiz, "public", url);
    expect(existsSync(arq), url).toBe(true);
    expect(statSync(arq).size / 1024 / 1024, url).toBeLessThanOrEqual(maxMb);
  }
}
const semComentarios = (s: string) => s.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("EST-59 tela de carregamento com a contadora (volta o EST-46)", () => {
  it("EST-59 a página renderiza <Carregando> antes do conteúdo", () => {
    expect(semComentarios(ler("src/componentes/Pagina.tsx"))).toMatch(/<Carregando\b/);
  });
  it("EST-59 aparece em toda carga e recarga, nunca com movimento reduzido (também como texto no script)", () => {
    expect(mostrarAbertura(false)).toBe(true);
    expect(mostrarAbertura(true)).toBe(false);
    const f = new Function(`return (${mostrarAbertura.toString()})`)() as typeof mostrarAbertura;
    expect(f(false)).toBe(true);
    expect(f(true)).toBe(false);
  });
  it("EST-59 sem marca de 'já vista' na sessão", () => {
    const c = semComentarios(ler("src/componentes/cliente.tsx"));
    expect(c).not.toMatch(/mc-cofre/);
  });
  it("EST-59 prazo de 4 a 5 s e o vídeo (5 s) cabe nele na velocidade escolhida", () => {
    expect(ATO1.prazoMs).toBeGreaterThanOrEqual(4000);
    expect(ATO1.prazoMs).toBeLessThanOrEqual(5000);
    expect((ATO1.duracaoMs / ATO1.velocidade)).toBeLessThanOrEqual(ATO1.prazoMs);
  });
  it("EST-63 sem final: o vídeo termina no visor em 100, antes da cédula sair da máquina (v2, 3,875 s)", () => {
    expect(CONTADORA_MIDIA.webm).toMatch(/contadora-v2\.webm$/);
    expect(ATO1.duracaoMs).toBe(3875);
  });
  it("EST-59 usa a mídia da contadora, sem o contador de texto antigo", () => {
    const c = semComentarios(ler("src/componentes/cliente.tsx"));
    expect(c).toMatch(/CONTADORA_MIDIA/);
    expect(c).not.toMatch(/cofre-serial|serialDoCofre|ATO1_MIDIA/);
    expect(existsSync(join(raiz, "public/midia/animacoes/ato1"))).toBe(false);
  });
  it("EST-59 mídia versionada dentro do orçamento", () => confereMidia(CONTADORA_MIDIA, 1.25));
});

describe("EST-65 hero gravado (substitui a chuva de notas do EST-56)", () => {
  it("EST-65 mídia versionada dentro do orçamento (≤ 2,5 MB por formato)", () => {
    confereMidia(HERO_INTRO_MIDIA, 2.5);
    confereMidia(HERO_LOOP_MIDIA, 2.5);
  });
  it("EST-65 a chuva saiu da abertura e o hero gravado entrou, só no desktop", () => {
    const p = semComentarios(ler("src/componentes/Pagina.tsx"));
    const abertura = p.slice(p.indexOf('id="inicio"'), p.indexOf('id="registro"'));
    expect(abertura).not.toMatch(/CHUVA_MIDIA|chuva-fundo/);
    expect(abertura).toMatch(/<HeroGravado/);
    expect(existsSync(join(raiz, "public/midia/animacoes/chuva"))).toBe(false);
    const css = semComentarios(ler("src/app/estilos.css"));
    expect(css).toMatch(/@media \(max-width:860px\)\{[^{}]*\.hero-gravado\{display:none\}/);
    expect(css).toMatch(/\.moldura:has\(\.hero-gravado\[data-ativo\]\) \.moldura-h\{visibility:hidden\}/);
  });
  it("EST-65 a gravação só toca se o vídeo estiver pronto e a abertura visível ao fim do carregamento; senão vai direto ao ciclo", () => {
    expect(inicioDoHero({ introPronta: true, visivel: true })).toBe("intro");
    expect(inicioDoHero({ introPronta: false, visivel: true })).toBe("loop");
    expect(inicioDoHero({ introPronta: true, visivel: false })).toBe("loop");
  });
  it("EST-65 ao fim da gravação, entra o ciclo das rosáceas (ou espera ele carregar, com a moldura parada)", () => {
    expect(aoFimDaIntro(true)).toBe("loop");
    expect(aoFimDaIntro(false)).toBe("esperar-loop");
  });
  it("EST-65 a tela de carregamento avisa quando começa a sair", () => {
    expect(CARREGANDO_FIM).toBe("carregando:fim");
    expect(semComentarios(ler("src/componentes/cliente.tsx"))).toMatch(/dispatchEvent\(new Event\(CARREGANDO_FIM\)\)/);
  });
});

describe("EST-57 cofre com segredo no Registro", () => {
  // EST-75 (2026-10-26, "deixar o cofre com maior qualidade pelo Blender"): aparece com 1333–1440 px de largura, então
  // vai em 1920 × 1080; o orçamento sobe de 1,25 para 3,5 MB (só é baixado quando o cofre entra na tela)
  it("EST-57/EST-75 mídia versionada em 1920 × 1080 dentro do orçamento", () => {
    confereMidia(COFRE_MIDIA, 3.5);
    expect(COFRE_MIDIA.webm).toMatch(/cofre-v3\.webm$/);
  });
  it("EST-57 o vídeo substitui a gravura estática e toca uma vez", () => {
    const p = semComentarios(ler("src/componentes/Pagina.tsx"));
    const reg = p.slice(p.indexOf('id="registro"'), p.indexOf("</section>", p.indexOf('id="registro"')));
    expect(reg).not.toMatch(/04_cofre_bancario/);
    expect(reg).toMatch(/<VideoAnimado[^>]*midia=\{COFRE_MIDIA\}[^>]*modo="uma-vez"/);
    expect(reg).toMatch(/<Registro\b/);
  });
  it("EST-57 repete a cada passagem: toca, sai e rebobina, toca de novo", () => {
    let e: EstadoDoSelo = "pronto";
    const seq = [[true, 0.6], [false, 0], [true, 0.6]] as const;
    const acoes = seq.map(([visivel, razao]) => { const r = passoDoSelo(e, { visivel, razao }); e = r.estado; return r.acao; });
    expect(acoes).toEqual(["tocar", "rebobinar", "tocar"]);
  });
  it("EST-57 quem já registrou a entrada vê o cofre aberto e ele não toca mais", () => {
    expect(cofreAberto("1")).toBe(true);
    expect(cofreAberto(null)).toBe(false);
    expect(cofreAberto("")).toBe(false);
  });
  it("EST-57 ao registrar: se está tocando, termina aberto; se não, vai direto ao último quadro", () => {
    expect(acaoAoRegistrar(true)).toBe("deixar-terminar");
    expect(acaoAoRegistrar(false)).toBe("ir-ao-fim");
  });
  it("EST-57 o Registro grava a marca persistente e avisa o cofre; o cofre a consulta", () => {
    const c = semComentarios(ler("src/componentes/cliente.tsx"));
    expect(c).toMatch(/localStorage\.setItem\(REGISTRO_CHAVE/);
    expect(c).toMatch(/new Event\(REGISTRO_EVENTO\)/);
    const p = semComentarios(ler("src/componentes/Pagina.tsx"));
    expect(p).toMatch(/<VideoAnimado[^>]*midia=\{COFRE_MIDIA\}[^>]*abertoAoRegistrar/);
    const a = semComentarios(ler("src/componentes/animacoes.tsx"));
    expect(a).toMatch(/localStorage\.getItem\(REGISTRO_CHAVE\)/);
  });
  it("EST-57 movimento reduzido: pôster do último quadro", () => {
    expect(posterReduzido("uma-vez", COFRE_MIDIA)).toBe(COFRE_MIDIA.fim);
  });
});

describe("EST-58 fita de cotação na Atividade", () => {
  it("EST-58 mídia versionada dentro do orçamento", () => confereMidia(FITA_MIDIA, 1.25));
  it("EST-58 vídeo em loop dentro da Atividade", () => {
    const p = semComentarios(ler("src/componentes/Pagina.tsx"));
    const at = p.slice(p.indexOf('id="atividade"'), p.indexOf('id="contato"'));
    expect(at).toMatch(/<VideoAnimado[^>]*midia=\{FITA_MIDIA\}[^>]*modo="loop"/);
  });
  it("EST-58 a fita fica no cabeçalho, alinhada ao título Atividade (fora da grade)", () => {
    const p = semComentarios(ler("src/componentes/Pagina.tsx"));
    const at = p.slice(p.indexOf('id="atividade"'), p.indexOf('id="contato"'));
    const cab = at.slice(at.indexOf("<Cabecalho"), at.indexOf("</Cabecalho>"));
    expect(cab).toMatch(/FITA_MIDIA/);
    expect(at.slice(at.indexOf('className="ativ-grade"'))).not.toMatch(/FITA_MIDIA/);
  });
  it("EST-58 no desktop o quadro do GitHub tem a altura da pilha de cards (sem vão embaixo)", () => {
    const css = semComentarios(ler("src/app/estilos.css"));
    expect(css).toMatch(/@media \(min-width:861px\)\{\s*\.ativ-grade\{align-items:stretch\}\s*\.quadro-github\{display:flex;flex-direction:column\}/);
  });
  it("EST-58 loop toca só enquanto visível; reduzido mostra o 1º quadro", () => {
    expect(passoDoLoop(true)).toBe("tocar");
    expect(passoDoLoop(false)).toBe("pausar");
    expect(posterReduzido("loop", FITA_MIDIA)).toBe(FITA_MIDIA.inicio);
  });
  it("EST-56/57/58 o componente genérico usa vídeo mudo, sem PiP, fora do Tab e decorativo", () => {
    const c = ler("src/componentes/animacoes.tsx");
    const bloco = c.slice(c.indexOf("export function VideoAnimado"));
    for (const r of [/aria-hidden="true"/, /\bmuted\b/, /playsInline/, /preload="none"/, /disablePictureInPicture/, /tabIndex=\{-1\}/]) expect(bloco).toMatch(r);
  });
});

describe("EST-47 Ato II retirado: a abertura volta ao que era", () => {
  it("sem <Circulacao>, sem canvas e sem componente do Ato II", () => {
    expect(semComentarios(ler("src/componentes/Pagina.tsx"))).not.toMatch(/Circulacao/);
    expect(semComentarios(ler("src/componentes/animacoes.tsx"))).not.toMatch(/Circulacao|<canvas/);
  });
  it("a abertura não ganha 200svh, sticky nem regras do canvas", () => {
    const css = semComentarios(ler("src/app/estilos.css"));
    expect(css).not.toMatch(/200svh/);
    expect(css).not.toMatch(/ato2/);
    expect(css).not.toMatch(/\.abertura \.moldura\{[^}]*sticky/);
  });
  it("a mídia do Ato II saiu do site", () => {
    expect(existsSync(join(raiz, "public/midia/animacoes/ato2"))).toBe(false);
  });
});

describe("EST-49 Ato III repete ao sair e voltar", () => {
  const passo = (estado: EstadoDoSelo, visivel: boolean, razao: number) => passoDoSelo(estado, { visivel, razao });
  it("na 1ª entrada com 50% visível, toca", () => {
    expect(passo("pronto", true, 0.5)).toEqual({ estado: "tocou", acao: "tocar" });
    expect(passo("pronto", true, 0.8)).toEqual({ estado: "tocou", acao: "tocar" });
  });
  it("aparecendo só um pouco (< 50%), ainda não toca", () => {
    expect(passo("pronto", true, 0.2)).toEqual({ estado: "pronto", acao: null });
  });
  it("oscilar em volta de 50% sem sair da tela não repete", () => {
    expect(passo("tocou", true, 0.3)).toEqual({ estado: "tocou", acao: null });
    expect(passo("tocou", true, 0.6)).toEqual({ estado: "tocou", acao: null });
  });
  it("ao sair inteira da tela, volta ao quadro 0 e fica pronta para tocar de novo", () => {
    expect(passo("tocou", false, 0)).toEqual({ estado: "pronto", acao: "rebobinar" });
    const volta = passo("pronto", true, 0.55);
    expect(volta).toEqual({ estado: "tocou", acao: "tocar" });
  });
  it("sair sem ter tocado não faz nada", () => {
    expect(passo("pronto", false, 0)).toEqual({ estado: "pronto", acao: null });
  });
  it("a mídia tem nome versionado (v3 desde o EST-69) e existe em public", () => {
    for (const url of Object.values(ATO3_MIDIA)) {
      expect(url, url).toMatch(/-v3[.-]/);
      expect(existsSync(join(raiz, "public", url)), url).toBe(true);
    }
  });
  it("o componente usa essa mídia, não a antiga", () => {
    const tsx = semComentarios(ler("src/componentes/animacoes.tsx"));
    expect(tsx).toMatch(/ATO3_MIDIA/);
    expect(tsx).not.toMatch(/autenticacao\.(webm|mp4)|\/(inicio|fim)\.webp/);
  });
});
