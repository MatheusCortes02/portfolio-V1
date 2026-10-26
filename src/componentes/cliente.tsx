"use client";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CATEGORIAS, contagens, quantosFundos, visiveis as visiveisDe } from "@/conteudo/projetos";
import type { pt } from "@/conteudo/pt";
import type { Categoria, Idioma, Projeto } from "@/conteudo/tipos";
import { olharPara } from "@/lib/olho";
import { ATO1, CARREGANDO_FIM, CONTADORA_MIDIA, SAIDA_CARREGANDO_MS, mostrarAbertura, REGISTRO_CHAVE, REGISTRO_EVENTO } from "@/lib/animacoes";
import { montarEnvio } from "@/lib/contato";
import { abaVizinha, focarDestino, setaDaFoto } from "@/lib/acessibilidade";
import { IDIOMAS, opcaoVizinha, rotaDoIdioma } from "@/lib/idioma";
import { localDe, mascararIp, SERVICO_IP } from "@/lib/registro";
import { atrasoEscalonado, linhaDeLeitura, manterNaTela } from "@/lib/rolagem";
import { Gravura, ImgGravura } from "./Gravura";

const calmo = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------ navegação: faixa de serial da cédula, aparece ao rolar (EST-13) */
const LINKS = ["sobre", "projetos", "certificacoes", "writeups", "atividade", "contato"] as const;
const FAIXA = 72; // altura da faixa: a seção que passa dessa linha é a atual

/* idioma em menu suspenso (EST-20): botão com o idioma atual e lista com os dois; leva à outra rota mantendo a seção */
function SeletorIdioma({ idioma, rotulo, paraCima = false, className = "" }: { idioma: Idioma; rotulo: string; paraCima?: boolean; className?: string }) {
  const [aberto, setAberto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const opcoes = useRef<(HTMLAnchorElement | null)[]>([]);
  const id = useId();
  const atual = IDIOMAS.findIndex((i) => i.codigo === idioma);
  const focar = (k: number) => requestAnimationFrame(() => opcoes.current[k]?.focus({ preventScroll: true }));
  const abrir = (k = atual) => { setAberto(true); focar(k); };
  const fechar = (devolverFoco: boolean) => { setAberto(false); if (devolverFoco) botao.current?.focus({ preventScroll: true }); };

  // fecha ao clicar fora ou ao rolar a página (a faixa some ao descer)
  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => { if (!raiz.current?.contains(e.target as Node)) setAberto(false); };
    const rolar = () => setAberto(false);
    document.addEventListener("pointerdown", fora);
    addEventListener("scroll", rolar, { passive: true });
    return () => { document.removeEventListener("pointerdown", fora); removeEventListener("scroll", rolar); };
  }, [aberto]);

  return (
    <div ref={raiz} className={`seletor-idioma${aberto ? " aberto" : ""}${paraCima ? " para-cima" : ""}${className ? ` ${className}` : ""}`}>
      <button ref={botao} type="button" className="idioma" aria-haspopup="menu" aria-expanded={aberto} aria-controls={id}
        aria-label={`${rotulo}: ${IDIOMAS[atual].nome}`}
        onClick={() => (aberto ? fechar(false) : abrir())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); abrir(e.key === "ArrowUp" ? IDIOMAS.length - 1 : atual); }
        }}>
        {IDIOMAS[atual].sigla}<span className="idioma-seta" aria-hidden="true" />
      </button>
      <ul className="idioma-lista" id={id} role="menu" aria-label={rotulo} hidden={!aberto}
        onKeyDown={(e) => {
          const k = opcoes.current.findIndex((el) => el === document.activeElement);
          if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); fechar(true); }
          else if (e.key === "Tab") setAberto(false);
          else if (e.key === " ") { e.preventDefault(); opcoes.current[k]?.click(); }
          else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) { e.preventDefault(); focar(opcaoVizinha(Math.max(k, 0), e.key, IDIOMAS.length)); }
        }}>
        {IDIOMAS.map((op, k) => (
          <li key={op.codigo} role="none">
            <a ref={(el) => { opcoes.current[k] = el; }} role="menuitemradio" aria-checked={op.codigo === idioma} tabIndex={-1}
              href={op.rota} hrefLang={op.lang} lang={op.lang}
              onClick={(e) => {
                e.preventDefault();
                if (op.codigo === idioma) fechar(true);
                else location.href = rotaDoIdioma(op.codigo, location.hash);
              }}>
              <span className="idioma-sigla" aria-hidden="true">{op.sigla}</span>{op.nome}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Navegacao({ t, idioma: lingua }: { t: typeof pt.nav; idioma: Idioma }) {
  const [aberto, setAberto] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [passou, setPassou] = useState(false);
  const [ativa, setAtiva] = useState<{ id?: string; preto: boolean }>({ preto: false });

  useEffect(() => {
    const secoes = [...document.querySelectorAll<HTMLElement>("main > section[id]")];
    let ultimo = scrollY;
    const aoRolar = () => {
      const y = scrollY;
      // aparece ao rolar para cima; some ao descer, para não cobrir a leitura
      if (Math.abs(y - ultimo) > 6) { setVisivel(y > 40 && y < ultimo); ultimo = y; }
      if (y <= 40) setVisivel(false);
      setPassou(y > 240);
    };
    // seção atual: a que cruza a linha da faixa, sem medir todas a cada rolagem (EST-28)
    let obs: IntersectionObserver | undefined;
    const observar = () => {
      obs?.disconnect();
      if (typeof IntersectionObserver === "undefined") return;
      obs = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        setAtiva((a) => (a.id === el.id ? a : { id: el.id, preto: el.classList.contains("lado-preto") }));
      }), { rootMargin: linhaDeLeitura(FAIXA, innerHeight) });
      secoes.forEach((el) => obs!.observe(el));
    };
    observar();
    addEventListener("resize", observar, { passive: true });
    aoRolar();
    addEventListener("scroll", aoRolar, { passive: true });
    return () => { removeEventListener("scroll", aoRolar); removeEventListener("resize", observar); obs?.disconnect(); };
  }, []);
  // menu de tela cheia em <dialog> modal (EST-23): foco no primeiro link, Tab preso, Esc fecha e devolve o foco
  const menu = useRef<HTMLDialogElement>(null);
  const medalhao = useRef<HTMLButtonElement>(null);
  const primeiro = useRef<HTMLAnchorElement>(null);
  const destino = useRef<string | null>(null);
  useEffect(() => {
    const d = menu.current;
    if (!d) return;
    if (aberto && !d.open) { d.showModal(); primeiro.current?.focus(); }
    if (!aberto && d.open) d.close();
  }, [aberto]);
  const aoFecharMenu = () => {
    setAberto(false);
    const hash = destino.current;
    destino.current = null;
    if (!hash || !focarDestino(hash)) medalhao.current?.focus({ preventScroll: true });
  };
  const escolher = (hash: string) => { destino.current = hash; setAberto(false); };

  const link = (k: (typeof LINKS)[number]) => <a key={k} href={`#${k}`} aria-current={ativa.id === k ? "true" : undefined}>{t[k]}</a>;

  return (
    <>
      {/* primeiro elemento focável da página (EST-23) */}
      <a className="pular" href="#conteudo" onClick={() => focarDestino("#conteudo")}>{t.pular}</a>
      <header className={`nav-topo ${ativa.preto ? "lado-preto" : "lado-papel"}${visivel ? " visivel" : ""}${passou ? " passou" : ""}`}>
        <nav className="cartucho" aria-label={t.principal}>
          <span className="c-peca c-ponta-esq" aria-hidden="true" />
          <div className="c-painel c-painel-esq">{LINKS.slice(0, 3).map(link)}</div>
          <span className="c-peca c-junta-esq" aria-hidden="true" />
          <a className="c-peca c-medalhao" href="#inicio" aria-label="Matheus Cortes" />
          <span className="c-peca c-junta-dir" aria-hidden="true" />
          <div className="c-painel c-painel-dir">{LINKS.slice(3).map(link)}<SeletorIdioma idioma={lingua} rotulo={t.idioma} /></div>
          <span className="c-peca c-ponta-dir" aria-hidden="true" />
        </nav>
        {/* celular: só o medalhão, flutuando ao alcance do polegar, abre o menu (EST-13b) */}
        {/* rótulo visível "Menu" abaixo do selo de 52 px (EST-24) */}
        <button ref={medalhao} type="button" className="c-movel" aria-haspopup="dialog" aria-expanded={aberto} onClick={() => setAberto(true)}>
          <span className="c-medalhao c-movel-selo" aria-hidden="true" />
          <span className="c-movel-rotulo">{t.menu}</span>
        </button>
      </header>

      <dialog ref={menu} className={`menu${aberto ? " aberto" : ""}`} aria-label={t.menu} onClose={aoFecharMenu} data-lenis-prevent>
        <Gravura g="01_moldura_horizontal_ornamental" className="menu-moldura" />
        <nav className="menu-lista">
          <a ref={primeiro} href="#inicio" onClick={() => escolher("#inicio")}><span className="n">01</span>{t.inicio}</a>
          {LINKS.map((k, i) => <a key={k} href={`#${k}`} onClick={() => escolher(`#${k}`)}><span className="n">0{i + 2}</span>{t[k]}</a>)}
        </nav>
        <div className="menu-acoes"><SeletorIdioma idioma={lingua} rotulo={t.idioma} paraCima className="lado-preto" />
          <button type="button" className="botao vazado" onClick={() => setAberto(false)}>{t.fechar} ✕</button>
        </div>
      </dialog>
    </>
  );
}

/* ------------------------------------------------ tela de carregamento: a contadora de cédulas (EST-16, EST-46, EST-59) */
// roda antes da hidratação: decide se a tela aparece (toda carga e recarga; nunca com movimento reduzido) e já dá o play no vídeo, que tem preload="none" e só é baixado (com o pôster) quando a tela aparece
const SCRIPT_COFRE = `try{var h=document.documentElement;if((${mostrarAbertura.toString()})(matchMedia("(prefers-reduced-motion: reduce)").matches)){h.classList.add("cofre-ativo");var v=document.getElementById("ato1");if(v){v.muted=true;v.poster="${CONTADORA_MIDIA.inicio}";v.defaultPlaybackRate=v.playbackRate=${ATO1.velocidade};var p=v.play();if(p&&p.catch)p.catch(function(){})}}else h.classList.add("sem-cofre")}catch(e){document.documentElement.classList.add("sem-cofre")}`;

/** EST-59: papel #F1EFE4 com o vídeo da contadora no centro (o visor do vídeo já conta; sem contador de texto).
 *  Sai ao fim do vídeo ou no prazo máximo (ATO1.prazoMs desde o início da navegação), com esmaecimento; se o vídeo
 *  falhar ou não houver autoplay, sai logo. */
export function Carregando() {
  const [fase, setFase] = useState<"contando" | "saindo" | "fim">("contando");
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const h = document.documentElement;
    if (!h.classList.contains("cofre-ativo")) return; // já vista ou movimento reduzido: o CSS nem mostra
    const v = video.current;
    let prazo = 0, saiu = false;
    const sair = () => {
      if (saiu) return;
      saiu = true;
      clearTimeout(prazo);
      setFase("saindo");
      dispatchEvent(new Event(CARREGANDO_FIM)); // EST-65: o hero começa a gravar por baixo do esmaecimento
      setTimeout(() => {
        h.classList.remove("cofre-ativo");
        // EST-66: se o hero começou a gravar, é ele quem devolve a rolagem ao terminar
        if (!h.classList.contains("hero-gravando")) dispatchEvent(new Event("rolagem:volta"));
        setFase("fim");
      }, SAIDA_CARREGANDO_MS);
    };
    prazo = window.setTimeout(sair, Math.max(0, ATO1.prazoMs - performance.now()));
    if (!v) return () => clearTimeout(prazo);
    v.muted = true;
    v.defaultPlaybackRate = v.playbackRate = ATO1.velocidade;
    if (v.ended || v.error) sair();
    else if (v.paused) v.play().catch(() => setTimeout(sair, 400)); // sem autoplay (ex.: economia de bateria): sai logo
    v.addEventListener("ended", sair);
    v.addEventListener("error", sair);
    const fontes = [...v.querySelectorAll("source")];
    fontes.at(-1)?.addEventListener("error", sair); // erro de rede na última fonte não dispara "error" no <video>
    return () => { clearTimeout(prazo); v.removeEventListener("ended", sair); v.removeEventListener("error", sair); fontes.at(-1)?.removeEventListener("error", sair); };
  }, []);

  if (fase === "fim") return null;
  return (
    <>
      <div className={`cofre-tela${fase === "saindo" ? " saindo" : ""}`} aria-hidden="true">
        <video ref={video} id="ato1" className="ato1-video" suppressHydrationWarning muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width={960} height={540}>
          {/* suppressHydrationWarning: o script anterior à hidratação põe o pôster neste vídeo */}
          <source src={CONTADORA_MIDIA.webm} type="video/webm" />
          <source src={CONTADORA_MIDIA.mp4} type="video/mp4" />
        </video>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_COFRE }} />
    </>
  );
}

/* ------------------------------------------------ texto que se decifra (RF-15) */
export function Decifra({ texto, className }: { texto: string; className?: string }) {
  const [mostra, setMostra] = useState(texto);
  useEffect(() => {
    if (calmo()) return;
    const glifos = "0123456789ABCDEF#/·";
    const inicio = performance.now();
    let id = 0;
    const passo = (agora: number) => {
      const p = Math.min(1, (agora - inicio) / 1100);
      const fixos = Math.floor(texto.length * p);
      setMostra(texto.slice(0, fixos) + [...texto.slice(fixos)].map((c) => (c === " " ? " " : glifos[(Math.random() * glifos.length) | 0])).join(""));
      if (p < 1) id = requestAnimationFrame(passo);
    };
    id = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(id);
  }, [texto]);
  // EST-25: o leitor de tela lê o texto real; a animação fica escondida dele (aria-label em <p> é proibido)
  return <p className={className}><span className="sr-only">{texto}</span><span aria-hidden="true">{mostra}</span></p>;
}

/* ------------------------------------------------ registro de entrada do cofre (RF-09, spec 002) */
// EST-34: nada é consultado ao carregar; só ao clicar. IP mascarado; a ficha aparece de uma vez (revelação em CSS).
export function Registro({ t, idioma }: { t: typeof pt.registro; idioma: Idioma }) {
  const [fase, setFase] = useState<"porta" | "consultando" | "pronto">("porta");
  const [valores, setValores] = useState<string[] | null>(null);
  const ctrl = useRef<AbortController | null>(null);
  useEffect(() => () => ctrl.current?.abort(), []);
  const registrar = () => {
    if (fase !== "porta") return;
    setFase("consultando");
    const c = new AbortController();
    ctrl.current = c;
    const prazo = setTimeout(() => c.abort(), 7000);
    const data = () => new Date().toLocaleString(idioma === "pt" ? "pt-BR" : "en-GB", { dateStyle: "short", timeStyle: "short" });
    Promise.resolve()
      .then(() => fetch(SERVICO_IP, { signal: c.signal }))
      .then((r) => r.json())
      .then((x) => {
        if (!x || x.success === false || !x.ip) throw new Error();
        return [data(), mascararIp(x.ip), localDe(x), x.connection?.isp || x.connection?.org || "—"];
      })
      .catch(() => [data(), t.naoIdentificada, "—", "—"])
      .then((v) => {
        setValores(v);
        setFase("pronto");
        // EST-57: a partir daqui o cofre fica aberto (nesta e nas próximas visitas)
        try { localStorage.setItem(REGISTRO_CHAVE, "1"); } catch {}
        dispatchEvent(new Event(REGISTRO_EVENTO));
      })
      .finally(() => clearTimeout(prazo));
  };
  const rotulos = [t.data, t.origem, t.local, t.provedor];
  return (
    <aside className={`registro${fase === "pronto" ? " carimbado" : ""}`}>
      <p className="registro-tit">{t.titulo}</p>
      {valores ? (
        <dl className="registro-ficha">
          {rotulos.map((r, i) => <div key={r}><dt>{r}</dt><dd title={i === 1 ? t.ipMascarado : undefined}>{valores[i]}</dd></div>)}
        </dl>
      ) : (
        <button type="button" className="botao registro-botao" onClick={registrar} disabled={fase === "consultando"} aria-busy={fase === "consultando"}>
          {fase === "consultando" ? t.consultando : t.registrar}
        </button>
      )}
      <p className="registro-nota">{t.nota}</p>
      <p className="sr-only" aria-live="polite">{valores ? rotulos.map((r, i) => `${r}: ${valores[i]}`).join("; ") : ""}</p>
      <span className="carimbo" aria-hidden="true">{t.carimbo}</span>
    </aside>
  );
}

/* ------------------------------------------------ projetos: filtro, linhas e estudo de caso (EST-04, EST-05) */
export function Projetos({ lista, t, idioma }: { lista: Projeto[]; t: typeof pt.projetos; idioma: Idioma }) {
  const [cat, setCat] = useState<Categoria | "todos">("todos");
  const [aberto, setAberto] = useState<number | null>(null);
  const [mais, setMais] = useState(false);
  // EST-31: "Ver mais" só em Todos; num tipo escolhido aparecem todos
  const { itens: visiveis, temMais, nDemais } = useMemo(() => visiveisDe(lista, cat, mais), [lista, cat, mais]);
  const n = contagens(lista);
  const botaoMais = useRef<HTMLButtonElement>(null);
  // EST-61: ao encolher a lista, a página perde a altura dos projetos extras; a rolagem é corrigida para o botão
  // ficar no mesmo lugar da tela, em vez de o visitante cair numa seção lá embaixo
  const alternarMais = () => {
    const b = botaoMais.current;
    if (!mais || !b) { setMais(!mais); return; }
    const antes = b.getBoundingClientRect().top;
    dispatchEvent(new Event("rolagem:pausa"));
    flushSync(() => setMais(false));
    scrollTo({ top: manterNaTela(scrollY, antes, b.getBoundingClientRect().top), behavior: "instant" });
    requestAnimationFrame(() => dispatchEvent(new Event("rolagem:volta")));
  };

  useEffect(() => {
    const abrir = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement).closest<HTMLElement>("[data-abrir-projeto]");
      if (!alvo) return;
      e.preventDefault();
      const i = lista.findIndex((p) => p.slug === alvo.dataset.abrirProjeto);
      if (i >= 0) setAberto(i);
    };
    document.addEventListener("click", abrir);
    return () => document.removeEventListener("click", abrir);
  }, [lista]);

  const nFundos = quantosFundos(visiveis.length);
  return (
    <>
      {/* EST-67: a prensa de fundo se repete pela seção inteira e acompanha "Ver mais"; opacidade, vinheta e degradê já
          vêm na imagem (sem máscara CSS, que pesava na rolagem); uma sim, outra não, espelhada */}
      <div className="fundos-projetos" aria-hidden="true">
        {Array.from({ length: nFundos }, (_, k) => (
          <picture key={k}>
            <source type="image/avif" srcSet="/midia/gravuras/06_prensa_fundo-e9e6d8-960.avif 960w, /midia/gravuras/06_prensa_fundo-e9e6d8-1600.avif 1600w" sizes="100vw" />
            <img src="/midia/gravuras/06_prensa_fundo-e9e6d8-1600.webp" srcSet="/midia/gravuras/06_prensa_fundo-e9e6d8-960.webp 960w, /midia/gravuras/06_prensa_fundo-e9e6d8-1600.webp 1600w" sizes="100vw"
              alt="" width={1600} height={1000} loading="lazy" decoding="async" className={k % 2 ? "espelho" : undefined} style={{ top: `${((k / nFundos) * 100).toFixed(2)}%` }} />
          </picture>
        ))}
      </div>
      <div className="filtro" role="toolbar" aria-label={t.titulo}>
        {(["todos", ...CATEGORIAS] as const).filter((c) => c === "todos" || n[c] > 0).map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => { setCat(c); setMais(false); }}>
            {c === "todos" ? t.todos : t.categorias[c]} <span>{n[c]}</span>
          </button>
        ))}
      </div>
      <ol className="lista-projetos">
        {visiveis.length === 0 && <li className="vazio">{t.nenhum}</li>}
        {visiveis.map((p) => {
          const i = lista.indexOf(p);
          const principal = p.capturas.find((c) => c.tipo !== "celular");
          const celular = p.capturas.find((c) => c.tipo === "celular");
          return (
            <li key={p.slug} className="projeto">
              <button type="button" className="projeto-abrir" onClick={() => setAberto(i)} aria-label={`${t.abrir}: ${p.titulo[idioma]}`} />
              <div className="projeto-visual">
                {principal ? (
                  <Image className="cap-principal" src={principal.arquivo} alt={principal.alt[idioma]} width={principal.largura} height={principal.altura} sizes="(max-width: 860px) 92vw, 46vw" />
                ) : <div className="cap-vazia"><Gravura g="08_olhos_lupas_medalhoes" /></div>}
                {/* EST-53: captura de celular dentro de um iPhone 17 desenhado em CSS (Dynamic Island e botões são decorativos) */}
                {celular && (
                  <span className="cap-celular iphone">
                    <Image src={celular.arquivo} alt={celular.alt[idioma]} width={celular.largura} height={celular.altura} sizes="140px" />
                    <span className="iphone-ilha" aria-hidden="true" />
                    <span className="iphone-botoes" aria-hidden="true" />
                  </span>
                )}
              </div>
              <div className="projeto-texto">
                <p className="projeto-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</p>
                <p className="sobretitulo">{t.categorias[p.categoria]} · {p.ano}{p.restrito ? ` · ${t.restrito}` : ""}</p>
                <h3>{p.titulo[idioma]}</h3>
                {/* EST-29: profissional × próprio, sem mudar a colagem */}
                <p className="credito">{p.profissional ? t.profissional : t.proprio}{p.credito ? ` · ${p.credito[idioma]}` : ""}</p>
                <p>{p.resumo[idioma]}</p>
                <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <span className="ler">{t.abrir} →</span>
              </div>
            </li>
          );
        })}
      </ol>
      {temMais && (
        <div className="ver-mais">
          <button ref={botaoMais} type="button" className="botao vazado" aria-expanded={mais} onClick={alternarMais}>
            {mais ? t.verMenos : `${t.verMais} (${nDemais})`}
          </button>
        </div>
      )}
      {aberto !== null && <ModalProjeto lista={lista} i={aberto} t={t} idioma={idioma} vai={setAberto} />}
    </>
  );
}

function ModalProjeto({ lista, i, t, idioma, vai }: { lista: Projeto[]; i: number; t: typeof pt.projetos; idioma: Idioma; vai: (i: number | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const p = lista[i];
  const [escolha, setEscolha] = useState({ slug: p.slug, k: 0 });
  const foto = escolha.slug === p.slug ? escolha.k : 0;
  const setFoto = (k: number) => setEscolha({ slug: p.slug, k });
  const nFotos = p.capturas.length;
  const mudaFoto = (d: number) => nFotos > 1 && setFoto((foto + d + nFotos) % nFotos);
  // setas do teclado trocam a foto (EST-17)
  useEffect(() => {
    // EST-25: com o foco nas abas, as setas trocam a aba, não a foto
    const tecla = (e: KeyboardEvent) => {
      const d = setaDaFoto(e.key, !!(e.target as HTMLElement | null)?.closest?.('[role="tablist"]'));
      if (d) mudaFoto(d);
    };
    addEventListener("keydown", tecla);
    return () => removeEventListener("keydown", tecla);
  });
  const toque = useRef<number | null>(null);
  // abas no lugar da rolagem: um texto por vez (EST-17)
  const [abaEscolhida, setAbaEscolhida] = useState({ slug: p.slug, k: 0 });
  const aba = abaEscolhida.slug === p.slug ? abaEscolhida.k : 0;
  // EST-51: "O que eu fiz" vem primeiro e abre selecionada (pedido de 2026-10-23)
  const abas = [
    { titulo: t.solucao, texto: p.solucao[idioma] },
    { titulo: t.desafio, texto: p.desafio[idioma] },
    { titulo: t.resultado, texto: p.resultado[idioma] },
    ...(p.extra ? [{ titulo: p.extra.titulo[idioma], texto: p.extra.texto[idioma] }] : []),
  ];
  const posicao = useRef(0);
  useEffect(() => {
    const d = ref.current;
    if (!d || d.open) return;
    posicao.current = scrollY;
    dispatchEvent(new Event("rolagem:pausa"));
    document.documentElement.classList.add("modal-aberto");
    d.showModal();
    requestAnimationFrame(() => scrollTo({ top: posicao.current, behavior: "instant" }));
  }, []);
  const atual = p.capturas[foto];
  const passo = (k: number) => vai((i + k + lista.length) % lista.length);
  return (
    <dialog ref={ref} className="modal" aria-labelledby="mp-titulo" data-lenis-prevent
      onClose={() => { const y = posicao.current; vai(null); document.documentElement.classList.remove("modal-aberto"); requestAnimationFrame(() => { scrollTo({ top: y, behavior: "instant" }); dispatchEvent(new Event("rolagem:volta")); }); }}
      onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}>
      <article className="modal-nota">
        <header className="modal-topo">
          <span className="modal-conta">{String(i + 1).padStart(2, "0")} / {String(lista.length).padStart(2, "0")}</span>
          <nav className="modal-nav">
            <button type="button" onClick={() => passo(-1)} aria-label={t.anterior} title={t.anterior}>←</button>
            <button type="button" onClick={() => passo(1)} aria-label={t.proximo} title={t.proximo}>→</button>
            <button type="button" className="modal-fechar" onClick={() => ref.current?.close()} aria-label={t.fechar} title={t.fechar}>✕</button>
          </nav>
        </header>
        <div className="modal-grade">
          <div className="modal-galeria">
            {atual ? (
              <figure>
                <div className="modal-foto"
                  onPointerDown={(e) => { toque.current = e.clientX; }}
                  onPointerUp={(e) => { if (toque.current !== null && Math.abs(e.clientX - toque.current) > 40) mudaFoto(e.clientX < toque.current ? 1 : -1); toque.current = null; }}>
                  {/* --r: proporção da captura, para a montagem em papel ter o tamanho exato da imagem (EST-36) */}
                  <Image key={atual.arquivo} src={atual.arquivo} alt={atual.alt[idioma]} width={atual.largura} height={atual.altura} sizes="(max-width: 860px) 92vw, 58vw"
                    style={{ "--r": atual.largura / atual.altura } as React.CSSProperties} />
                </div>
                {/* setas como medalhões numa faixa abaixo da foto, fora da área útil da imagem (EST-36) */}
                {nFotos > 1 && (
                  <div className="foto-barra">
                    <button type="button" className="foto-seta ant" onClick={() => mudaFoto(-1)} aria-label={t.fotoAnterior}>‹</button>
                    <span className="foto-conta" aria-live="polite">{foto + 1} / {nFotos}</span>
                    <button type="button" className="foto-seta prox" onClick={() => mudaFoto(1)} aria-label={t.fotoProxima}>›</button>
                  </div>
                )}
              </figure>
            ) : <div className="cap-vazia grande"><Gravura g="08_olhos_lupas_medalhoes" /><p>{t.semCaptura}</p></div>}
          </div>
          <div className="modal-texto">
            <h2 id="mp-titulo">{p.titulo[idioma]}</h2>
            <p className="modal-meta">{t.categorias[p.categoria]} · {p.ano}{p.credito ? ` · ${p.credito[idioma]}` : ""}</p>
            {p.papel && <p className="modal-papel">{p.papel[idioma]}</p>}
            <p className="modal-resumo">{p.resumo[idioma]}</p>
            {/* abas no padrão da APG (EST-25): tabindex móvel, ←/→ e Home/End trocam a aba */}
            <div className="modal-abas" role="tablist" aria-labelledby="mp-titulo"
              onKeyDown={(e) => {
                const k = abaVizinha(aba, e.key, abas.length);
                if (k === null) return;
                e.preventDefault();
                setAbaEscolhida({ slug: p.slug, k });
                document.getElementById(`mp-aba-${k}`)?.focus();
              }}>
              {abas.map((a, k) => (
                <button key={a.titulo} id={`mp-aba-${k}`} type="button" role="tab" aria-selected={k === aba} aria-controls="mp-painel" tabIndex={k === aba ? 0 : -1}
                  onClick={() => setAbaEscolhida({ slug: p.slug, k })}>{a.titulo}</button>
              ))}
            </div>
            <p className="modal-aba" id="mp-painel" role="tabpanel" aria-labelledby={`mp-aba-${aba}`} tabIndex={0}>{abas[aba].texto}</p>
            <ul className="stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            <div className="acoes esquerda">
              {p.links.map((l) => <a key={l.url} className="botao" href={l.url} target="_blank" rel="noopener noreferrer">{l.rotulo[idioma]} ↗</a>)}
              {p.restrito && <span className="botao desligado">{t.restrito}</span>}
            </div>
          </div>
        </div>
      </article>
    </dialog>
  );
}

/* ------------------------------------------------ olho: íris recortada pela abertura exata (EST-09) */
export function Olho() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (calmo()) return;
    const mover = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width * 0.505, cy = r.top + r.height * 0.522;
      setPos(olharPara(e.clientX - cx, e.clientY - cy)); // EST-68: também para cima e para baixo
    };
    addEventListener("pointermove", mover, { passive: true });
    return () => removeEventListener("pointermove", mover);
  }, []);
  return (
    <div className="olho" ref={ref} aria-hidden="true">
      <div className="olho-abertura">
        <ImgGravura g="11_iris_redonda" tinta="papel" className="olho-iris" sizes="auto, (max-width: 860px) 25vw, 160px" style={{ transform: `translate(${(pos.x / 0.223).toFixed(1)}%, ${(pos.y / 0.39).toFixed(1)}%)` }} />
      </div>
      <Gravura g="10_olho_sem_iris" className="olho-palpebra" />
    </div>
  );
}

/* ------------------------------------------------ contato */
export function Contato({ t }: { t: typeof pt.contato }) {
  const [estado, setEstado] = useState<"" | "enviando" | "sucesso" | "erro" | "indisponivel">("");
  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    const dados = Object.fromEntries(new FormData(e.currentTarget));
    if (dados.empresa) { setEstado("sucesso"); return; } // honeypot: robô recebe sucesso falso
    const envio = montarEnvio(dados, process.env.NEXT_PUBLIC_WEB3FORMS_KEY);
    if (envio === "sem-chave") { setEstado("indisponivel"); return; }
    if (!envio) { setEstado("erro"); return; }
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(envio) });
      setEstado(r.ok ? "sucesso" : "erro");
      if (r.ok) (e.target as HTMLFormElement).reset();
    } catch { setEstado("erro"); }
  }
  return (
    <form className="ficha" onSubmit={enviar}>
      <label>{t.nome}<input name="nome" required autoComplete="name" placeholder={t.placeholderNome} /></label>
      <label>{t.email}<input name="email" type="email" required autoComplete="email" placeholder={t.placeholderEmail} /></label>
      <label>{t.mensagem}<textarea name="mensagem" required rows={5} placeholder={t.placeholderMensagem} /></label>
      <input name="empresa" tabIndex={-1} autoComplete="off" className="mel" aria-hidden="true" />
      <button type="submit" className="botao" disabled={estado === "enviando"}>{estado === "enviando" ? t.enviando : t.enviar}</button>
      <p className="ficha-aviso" aria-live="polite">{estado && estado !== "enviando" ? t[estado] : ""}</p>
    </form>
  );
}

/* ------------------------------------------------ movimento leve de rolagem (pedido de 2026-10-20) */
const REVELAR = ".cab, .cert-item, .filtro, .projeto, .certificado, .sobre-col, .faco li, .linha-tempo li, .tec-bloco-nome, .tec-cartao, .olho, .writeup, .quadro-github, .ativ-numeros, .caixa, .ficha, .perfis li, .cofre-cena";
const PARALAXE = ".solto, .cofre-img";

/* rolagem com inércia, entradas em sequência e paralaxe (EST-14) */
export function Movimento() {
  useEffect(() => {
    if (calmo()) return;
    // Lenis por import() dinâmico: fica fora do pacote inicial e chega depois da primeira pintura (EST-28)
    let lenis: { stop(): void; start(): void; destroy(): void } | undefined;
    let vivo = true;
    import("lenis").then(({ default: Lenis }) => {
      if (!vivo) return;
      lenis = new Lenis({ lerp: 0.085, anchors: { offset: -8 }, autoRaf: true });
      const h = document.documentElement;
      if (h.classList.contains("cofre-ativo") || h.classList.contains("modal-aberto") || h.classList.contains("hero-gravando")) lenis.stop();
    });
    // modal aberto: a página por trás não rola
    const pausa = () => lenis?.stop();
    const volta = () => lenis?.start();
    addEventListener("rolagem:pausa", pausa);
    addEventListener("rolagem:volta", volta);
    const alvos = [...document.querySelectorAll<HTMLElement>(REVELAR)];
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      el.classList.add("visto");
      obs.unobserve(el);
      // depois da entrada, devolve o elemento às transições dele (hover rápido)
      setTimeout(() => { el.classList.remove("revelar", "visto"); el.style.removeProperty("--atraso"); }, 1900 + parseInt(el.style.getPropertyValue("--atraso") || "0"));
    }), { rootMargin: "0px 0px -10% 0px" });
    alvos.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight) return; // o que já está na tela não pisca
      const irmaos = el.parentElement ? [...el.parentElement.children].filter((x) => x.matches(REVELAR)) : [];
      el.style.setProperty("--atraso", `${atrasoEscalonado(Math.max(0, irmaos.indexOf(el)))}ms`);
      el.classList.add("revelar");
      obs.observe(el);
    });
    // paralaxe só nos elementos perto da tela (EST-28): lê o layout de todos primeiro e só depois escreve
    const visiveis = new Set<HTMLElement>();
    let quadro = 0;
    const rolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const alt = innerHeight;
        const medidas = [...visiveis].map((el) => [el, el.getBoundingClientRect()] as const);
        for (const [el, r] of medidas) {
          const desvio = (r.top - (parseFloat(el.style.translate.split(" ")[1]) || 0) + r.height / 2 - alt / 2) * -0.14;
          el.style.translate = `0 ${desvio.toFixed(1)}px`;
          el.style.rotate = `${(desvio * 0.02).toFixed(2)}deg`;
        }
      });
    };
    const perto = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? visiveis.add(e.target as HTMLElement) : visiveis.delete(e.target as HTMLElement)));
      rolar();
    }, { rootMargin: "200px 0px" });
    document.querySelectorAll<HTMLElement>(PARALAXE).forEach((el) => perto.observe(el));
    addEventListener("scroll", rolar, { passive: true });
    return () => { vivo = false; removeEventListener("rolagem:pausa", pausa); removeEventListener("rolagem:volta", volta); lenis?.destroy(); obs.disconnect(); perto.disconnect(); removeEventListener("scroll", rolar); cancelAnimationFrame(quadro); };
  }, []);
  return null;
}
