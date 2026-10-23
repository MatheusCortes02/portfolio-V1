"use client";
// "A vida de uma cédula" — Ato III (docs/animacoes-magnific.md; spec 003, EST-48 e EST-49).
// Isolado aqui e com a mídia em public/midia/animacoes/ato3/ para ser trocado sem mexer no resto da página.
// O Ato I e o Ato II saíram do site em 2026-10-23. Abaixo, o componente genérico dos vídeos da 2ª leva do Blender
// (EST-56 a EST-58); a tela de carregamento com a contadora (EST-59) é o Carregando, em cliente.tsx.
import { useEffect, useRef } from "react";
import { acaoAoRegistrar, ATO3_MIDIA, cofreAberto, passoDoLoop, REGISTRO_CHAVE, REGISTRO_EVENTO, passoDoSelo, posterReduzido, type EstadoDoSelo, type MidiaVideo, type ModoVideo } from "@/lib/animacoes";

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
        <source src={ATO3_MIDIA.webm} type="video/webm" />
        <source src={ATO3_MIDIA.mp4} type="video/mp4" />
      </video>
    </span>
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
export function VideoAnimado({ midia, modo, className = "", largura, altura, soDesktop = false, aposCarga = false, semPosterReduzido = false, abertoAoRegistrar = false }: {
  midia: MidiaVideo; modo: ModoVideo; className?: string; largura: number; altura: number;
  soDesktop?: boolean; aposCarga?: boolean; semPosterReduzido?: boolean;
  /** EST-57: quem já registrou a entrada vê o último quadro (aberto); ao registrar, termina aberto e fica aberto */
  abertoAoRegistrar?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (soDesktop && !matchMedia(DESKTOP).matches) return;
    if (abertoAoRegistrar) {
      let registrado = false;
      try { registrado = cofreAberto(localStorage.getItem(REGISTRO_CHAVE)); } catch {}
      if (registrado) { v.poster = midia.fim; return; }
    }
    if (reduzido()) {
      const p = posterReduzido(modo, midia, !semPosterReduzido);
      if (p) v.poster = p;
      return;
    }
    if (typeof IntersectionObserver === "undefined") { v.poster = posterReduzido(modo, midia) ?? ""; return; }
    let obs: IntersectionObserver | undefined;
    const tocando = () => { v.dataset.tocando = "1"; };
    v.addEventListener("playing", tocando);
    const iniciar = () => {
      if (modo === "loop") {
        v.loop = true;
        if (!semPosterReduzido) v.poster = midia.inicio;
        obs = new IntersectionObserver((es) => {
          const e = es[es.length - 1];
          if (passoDoLoop(e.isIntersecting) === "tocar") v.play().catch(() => {});
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
  }, [midia, modo, soDesktop, aposCarga, semPosterReduzido, abertoAoRegistrar]);
  return (
    <span className={`video-animado ${className}`.trim()} aria-hidden="true">
      <video ref={ref} muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width={largura} height={altura}>
        <source src={midia.webm} type="video/webm" />
        <source src={midia.mp4} type="video/mp4" />
      </video>
    </span>
  );
}
