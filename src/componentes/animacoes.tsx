"use client";
// "A vida de uma cédula" — Ato III (docs/animacoes-magnific.md; spec 003, EST-48 e EST-49).
// Isolado aqui e com a mídia em public/midia/animacoes/ato3/ para ser trocado sem mexer no resto da página.
// O Ato I e o Ato II saíram do site em 2026-10-23. Abaixo, o componente genérico dos vídeos da 2ª leva do Blender
// (EST-57 e EST-58) e o hero gravado da abertura (EST-65, no lugar da chuva do EST-56); a tela de carregamento com a
// contadora (EST-59) é o Carregando, em cliente.tsx.
import { useEffect, useRef, useState } from "react";
import { acaoAoRegistrar, aoFimDaIntro, ATO3_MIDIA, CARREGANDO_FIM, HERO_INTRO_MIDIA, HERO_LOOP_MIDIA, inicioDoHero, SAIDA_CARREGANDO_MS, travaMaximaDoHero, passoDoLoop, REGISTRO_EVENTO, passoDoSelo, posterReduzido, type EstadoDoSelo, type MidiaVideo, type ModoVideo } from "@/lib/animacoes";

const DESKTOP = "(min-width: 861px)";
const reduzido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------ Ato III — autenticação: o selo MC é gravado na ficha "Quem sou" (EST-48, EST-49) */
export function Autenticacao() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (reduzido()) { v.poster = ATO3_MIDIA.fim; return; } // movimento reduzido: direto o certificado selado
    if (!matchMedia(DESKTOP).matches) return; // no celular a ficha não tem esta moldura (CSS)
    v.poster = ATO3_MIDIA.inicio;
    if (typeof IntersectionObserver === "undefined") return;
    let estado: EstadoDoSelo = "pronto";
    const obs = new IntersectionObserver((es) => {
      const e = es[es.length - 1];
      const passo = passoDoSelo(estado, { visivel: e.isIntersecting, razao: e.intersectionRatio });
      estado = passo.estado;
      if (passo.acao === "tocar") {
        v.currentTime = 0;
        v.play().catch(() => { v.poster = ATO3_MIDIA.fim; }); // sem autoplay: mostra o selo já gravado
      } else if (passo.acao === "rebobinar") {
        // fora da tela: volta ao quadro 0 (oval vazio) para tocar de novo do início na próxima entrada
        v.pause();
        if (v.readyState > 0) v.currentTime = 0;
      }
    }, { threshold: [0, 0.5] });
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  // toca e para no último quadro (o selo); o texto da ficha fica por cima
  return (
    <span className="gravura certificado-moldura ato3" aria-hidden="true">
      <video ref={ref} muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width={1086} height={1448}>
        <source src={ATO3_MIDIA.mp4} type="video/mp4" />
        <source src={ATO3_MIDIA.webm} type="video/webm" />
      </video>
    </span>
  );
}

/* ------------------------------------------------ EST-99: pausa das animações em loop (WCAG 2.2.2) */
type Rotulos = { pausar: string; retomar: string };
/** Estado de pausa pedido pelo visitante; o ref é lido pelos observadores, que não voltam a tocar enquanto pausado. */
function usePausa(videos: () => (HTMLVideoElement | null)[]) {
  const [pausado, setPausado] = useState(false);
  const pausadoRef = useRef(false);
  const alternar = () => {
    const novo = !pausadoRef.current;
    pausadoRef.current = novo;
    setPausado(novo);
    for (const v of videos()) {
      if (!v || v.loop === false) continue;
      if (novo) { v.pause(); continue; }
      const r = v.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) v.play().catch(() => {}); // fora da tela, o observador retoma quando voltar
    }
  };
  return { pausado, pausadoRef, alternar };
}
function BotaoPausa({ pausado, alternar, rotulos }: { pausado: boolean; alternar: () => void; rotulos: Rotulos }) {
  return (
    <button type="button" className="pausar-animacao" aria-pressed={pausado} onClick={alternar}>
      {pausado ? `▶ ${rotulos.retomar}` : `❚❚ ${rotulos.pausar}`}
    </button>
  );
}

/* ------------------------------------------------ vídeos da 2ª leva do Blender (EST-56 a EST-58) */
/** Depois do `load` e com o navegador livre: não disputa banda nem CPU com o LCP (EST-56). */
function depoisDaCarga(fn: () => void): () => void {
  let cancelado = false, idle = 0, t = 0;
  const ocioso = () => {
    if (cancelado) return;
    if (typeof requestIdleCallback === "function") idle = requestIdleCallback(() => !cancelado && fn(), { timeout: 2500 });
    else t = setTimeout(() => !cancelado && fn(), 300) as unknown as number;
  };
  if (document.readyState === "complete") ocioso();
  else addEventListener("load", ocioso, { once: true });
  return () => {
    cancelado = true;
    removeEventListener("load", ocioso);
    if (idle && typeof cancelIdleCallback === "function") cancelIdleCallback(idle);
    clearTimeout(t);
  };
}

/** Vídeo decorativo em loop (toca só enquanto visível) ou que toca uma vez a cada passagem (regra do selo, EST-49).
 *  `preload="none"` e pôster posto só pelo script: nada é baixado antes da hora (nem no celular, com `soDesktop`). */
export function VideoAnimado({ midia, modo, className = "", largura, altura, soDesktop = false, aposCarga = false, semPosterReduzido = false, abertoAoRegistrar = false, rotulos }: {
  midia: MidiaVideo; modo: ModoVideo; className?: string; largura: number; altura: number;
  /** EST-99: nos vídeos em loop, rótulos do botão de pausa */
  rotulos?: Rotulos;
  soDesktop?: boolean; aposCarga?: boolean; semPosterReduzido?: boolean;
  /** EST-57/EST-89: ao registrar a entrada nesta visita, termina aberto e fica aberto até recarregar (nada é guardado) */
  abertoAoRegistrar?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const { pausado, pausadoRef, alternar } = usePausa(() => [ref.current]);
  const [emLoop, setEmLoop] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (soDesktop && !matchMedia(DESKTOP).matches) return;
    if (reduzido()) {
      const p = posterReduzido(modo, midia, !semPosterReduzido);
      if (p) v.poster = p;
      return;
    }
    if (typeof IntersectionObserver === "undefined") { v.poster = posterReduzido(modo, midia) ?? ""; return; }
    let obs: IntersectionObserver | undefined;
    const tocando = () => { v.dataset.tocando = "1"; if (modo === "loop") setEmLoop(true); };
    v.addEventListener("playing", tocando);
    const iniciar = () => {
      if (modo === "loop") {
        v.loop = true;
        if (!semPosterReduzido) v.poster = midia.inicio;
        obs = new IntersectionObserver((es) => {
          const e = es[es.length - 1];
          if (passoDoLoop(e.isIntersecting) === "tocar") { if (!pausadoRef.current) v.play().catch(() => {}); }
          else v.pause();
        }, { threshold: 0 });
      } else {
        v.poster = midia.inicio;
        let estado: EstadoDoSelo = "pronto";
        obs = new IntersectionObserver((es) => {
          const e = es[es.length - 1];
          const passo = passoDoSelo(estado, { visivel: e.isIntersecting, razao: e.intersectionRatio });
          estado = passo.estado;
          if (passo.acao === "tocar") {
            if (v.readyState > 0) v.currentTime = 0;
            v.play().catch(() => { v.poster = midia.fim; });
          } else if (passo.acao === "rebobinar") {
            v.pause();
            if (v.readyState > 0) v.currentTime = 0; // volta ao 1º quadro para tocar de novo na próxima passagem
          }
        }, { threshold: [0, 0.5] });
      }
      obs.observe(v);
    };
    const cancelar = aposCarga ? depoisDaCarga(iniciar) : (iniciar(), () => {});
    // EST-57: registrou a entrada agora: para de observar (não rebobina mais) e termina aberto
    const aoRegistrar = () => {
      obs?.disconnect();
      if (acaoAoRegistrar(!v.paused && !v.ended) === "deixar-terminar") return;
      v.pause();
      v.poster = midia.fim;
      if (v.readyState > 0 && Number.isFinite(v.duration)) v.currentTime = Math.max(0, v.duration - 0.05);
    };
    if (abertoAoRegistrar) addEventListener(REGISTRO_EVENTO, aoRegistrar);
    return () => { cancelar(); obs?.disconnect(); v.removeEventListener("playing", tocando); removeEventListener(REGISTRO_EVENTO, aoRegistrar); v.pause(); };
  }, [midia, modo, soDesktop, aposCarga, semPosterReduzido, abertoAoRegistrar, pausadoRef]);
  return (
    <span className={`video-animado ${className}`.trim()}>
      <video ref={ref} aria-hidden="true" muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width={largura} height={altura}>
        <source src={midia.mp4} type="video/mp4" />
        <source src={midia.webm} type="video/webm" />
      </video>
      {modo === "loop" && rotulos && emLoop && <BotaoPausa pausado={pausado} alternar={alternar} rotulos={rotulos} />}
    </span>
  );
}

/* ------------------------------------------------ hero gravado da abertura (EST-65) */
/** Sobre a moldura parada (que continua sendo a imagem do LCP): ao sair a tela de carregamento, a moldura é gravada a
 *  buril (uma vez) e as rosáceas passam a oscilar em ciclo. Só no desktop e sem movimento reduzido; a gravação é pedida
 *  depois do `load`. Se ela não estiver pronta (ou a abertura não estiver na tela), vai direto ao ciclo; o ciclo toca só
 *  enquanto a abertura está visível. Nada aparece antes de um vídeo estar tocando (a moldura parada fica por baixo). */
export function HeroGravado({ rotulos }: { rotulos: Rotulos }) {
  const caixa = useRef<HTMLSpanElement>(null);
  const intro = useRef<HTMLVideoElement>(null);
  const loop = useRef<HTMLVideoElement>(null);
  const { pausado, pausadoRef, alternar } = usePausa(() => [loop.current]);
  const [emLoop, setEmLoop] = useState(false);
  useEffect(() => {
    const cx = caixa.current, vi = intro.current, vl = loop.current;
    if (!cx || !vi || !vl) return;
    vi.muted = vl.muted = true;
    if (!matchMedia(DESKTOP).matches || reduzido()) return;
    let fase: "espera" | "intro" | "esperar-loop" | "loop" = "espera";
    let visivel = true, espera = 0, seguranca = 0;
    const h = document.documentElement;
    // EST-66: a página só volta a rolar quando a gravação termina (ou falha, ou no prazo de segurança)
    const destravar = () => {
      clearTimeout(seguranca);
      if (!h.classList.contains("hero-gravando")) return;
      h.classList.remove("hero-gravando");
      dispatchEvent(new Event("rolagem:volta"));
      removeEventListener("keydown", teclado);
    };
    // acessibilidade: quem navega pelo teclado precisa ver o elemento focado; Tab solta a trava na hora
    const teclado = (e: KeyboardEvent) => { if (e.key === "Tab") destravar(); };
    const pronto = (v: HTMLVideoElement) => v.readyState >= 3;
    const pedir = (v: HTMLVideoElement) => { if (v.preload !== "auto") { v.preload = "auto"; v.load(); } };
    const tocarLoop = () => {
      fase = "loop";
      cx.dataset.ativo = "loop";
      setEmLoop(true);
      vi.pause();
      if (visivel && !pausadoRef.current) vl.play().catch(() => {});
    };
    const esperarLoop = () => {
      destravar();
      pedir(vl);
      if (aoFimDaIntro(pronto(vl)) === "loop") tocarLoop();
      else { fase = "esperar-loop"; vl.addEventListener("canplay", tocarLoop, { once: true }); }
    };
    const comecar = () => {
      if (fase !== "espera") return;
      const r = cx.getBoundingClientRect();
      visivel = r.bottom > 0 && r.top < innerHeight;
      if (inicioDoHero({ introPronta: pronto(vi), visivel }) === "intro") {
        fase = "intro";
        h.classList.add("hero-gravando");
        addEventListener("keydown", teclado);
        seguranca = window.setTimeout(destravar, travaMaximaDoHero());
        // papel em branco (1º quadro) enquanto a tela de carregamento esmaece; a gravação começa quando ela some
        cx.dataset.ativo = "intro";
        vi.addEventListener("ended", esperarLoop, { once: true });
        espera = window.setTimeout(() => vi.play().then(() => pedir(vl)).catch(esperarLoop), SAIDA_CARREGANDO_MS);
      } else esperarLoop();
    };
    const obs = new IntersectionObserver((es) => {
      visivel = es[es.length - 1].isIntersecting;
      if (fase === "loop") { if (passoDoLoop(visivel) === "tocar") { if (!pausadoRef.current) vl.play().catch(() => {}); } else vl.pause(); }
    }, { threshold: 0 });
    obs.observe(cx);
    const comLoader = document.documentElement.classList.contains("cofre-ativo");
    const cancelar = depoisDaCarga(() => {
      if (comLoader) pedir(vi); // a gravação só faz sentido saindo da tela de carregamento
      else comecar(); // sem tela de carregamento: a moldura já está à vista, vai direto ao ciclo
    });
    if (comLoader) addEventListener(CARREGANDO_FIM, comecar, { once: true });
    return () => {
      cancelar(); clearTimeout(espera); destravar(); obs.disconnect(); removeEventListener(CARREGANDO_FIM, comecar);
      vi.removeEventListener("ended", esperarLoop); vl.removeEventListener("canplay", tocarLoop); vi.pause(); vl.pause();
    };
  }, [pausadoRef]);
  return (
    <>
    <span ref={caixa} className="hero-gravado" aria-hidden="true">
      <video ref={intro} className="hero-intro" muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width={1536} height={1024}>
        <source src={HERO_INTRO_MIDIA.mp4} type="video/mp4" />
        <source src={HERO_INTRO_MIDIA.webm} type="video/webm" />
      </video>
      <video ref={loop} className="hero-loop" muted loop playsInline preload="none" disablePictureInPicture tabIndex={-1} width={1536} height={1024}>
        <source src={HERO_LOOP_MIDIA.mp4} type="video/mp4" />
        <source src={HERO_LOOP_MIDIA.webm} type="video/webm" />
      </video>
    </span>
    {emLoop && <BotaoPausa pausado={pausado} alternar={alternar} rotulos={rotulos} />}
    </>
  );
}
