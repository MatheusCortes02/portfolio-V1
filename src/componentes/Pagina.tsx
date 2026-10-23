import type { ReactNode } from "react";
import { en } from "@/conteudo/en";
import { certificacoes } from "@/conteudo/certificacoes";
import { projetos } from "@/conteudo/projetos";
import { iconeDe } from "@/conteudo/tecnologias";
import { pt } from "@/conteudo/pt";
import type { Idioma } from "@/conteudo/tipos";
import { estatisticas, type Dia } from "@/lib/github";
import { buscarContribuicoes } from "@/lib/github-dados";
import { soIdioma } from "@/lib/so-idioma";
import { Autenticacao, VideoAnimado } from "./animacoes";
import { CHUVA_MIDIA, COFRE_MIDIA, FITA_MIDIA } from "@/lib/animacoes";
import { Gravura } from "./Gravura";
import { Carregando, Contato, Decifra, Movimento, Navegacao, Olho, Projetos, Registro } from "./cliente";

import { EMAIL, PERFIS, urlDoPerfil } from "@/conteudo/perfis";
import { CURRICULO } from "@/lib/curriculo";
export { EMAIL };

function Icone({ nome }: { nome: string }) {
  const ic = iconeDe(nome);
  return ic ? <svg viewBox="0 0 24 24" className={`icone ${ic.tipo}`} aria-hidden="true"><path d={ic.path} /></svg> : null;
}

function Cabecalho({ num, sobre, titulo, lead, g, children }: { num: string; sobre: string; titulo: string; lead: string; g?: string; children?: ReactNode }) {
  return (
    <header className={`cab${children ? " com-extra" : ""}`}>
      <p className="cab-num" aria-hidden="true">{num}</p>
      {/* celular (2026-10-22): vinheta da seção ao lado do número, como o canto de uma cédula; escondida no desktop */}
      {g && <Gravura g={g} className="cab-gravura" />}
      <div>
        <p className="sobretitulo">{sobre}</p>
        <h2>{titulo}</h2>
        <p className="cab-lead">{lead}</p>
      </div>
      {children}
    </header>
  );
}

function Grafico({ dias, t, idioma }: { dias: Dia[]; t: typeof pt; idioma: Idioma }) {
  const desloc = new Date(dias[0].data + "T12:00:00Z").getUTCDay();
  const colunas = Math.ceil((dias.length + desloc) / 7);
  const meses: { col: number; nome: string }[] = [];
  let ultimo = -1;
  dias.forEach((d, i) => {
    const data = new Date(d.data + "T12:00:00Z");
    if (data.getUTCMonth() !== ultimo && data.getUTCDate() <= 7) {
      meses.push({ col: Math.floor((i + desloc) / 7), nome: t.atividade.meses[data.getUTCMonth()] });
      ultimo = data.getUTCMonth();
    }
  });
  const fmt = (s: string) => new Date(s + "T12:00:00Z").toLocaleDateString(idioma === "pt" ? "pt-BR" : "en-GB", { timeZone: "UTC" });
  return (
    <div className="grafico" style={{ ["--colunas" as string]: colunas }}>
      <div className="g-semana" aria-hidden="true">{t.atividade.semana.map((s, i) => <span key={i}>{s}</span>)}</div>
      <div className="g-rolagem">
        <div className="g-meses" aria-hidden="true">{meses.map((m) => <span key={m.col} style={{ gridColumn: `${m.col + 1} / span 3` }}>{m.nome}</span>)}</div>
        <div className="g-dias" role="img" aria-label={`${estatisticas(dias).total} ${t.numeros.contribuicoes}`}>
          {Array.from({ length: desloc }, (_, i) => <i key={`v${i}`} className="v" />)}
          {dias.map((d) => <i key={d.data} className={`n${d.nivel}`} title={`${d.qtd} ${d.qtd === 1 ? t.atividade.contribuicao : t.atividade.contribuicoesEm} ${fmt(d.data)}`} />)}
        </div>
      </div>
    </div>
  );
}

export async function Pagina({ idioma }: { idioma: Idioma }) {
  const t = idioma === "pt" ? pt : en;
  const { dias, lidoEm } = await buscarContribuicoes();
  const est = estatisticas(dias);
  const writeup = projetos.find((p) => p.slug === "controle-de-acesso-video")!;

  return (
    <>
      {/* EST-59: tela de carregamento com a contadora de cédulas, em toda carga e recarga (nunca com movimento reduzido) */}
      <Carregando />
      <Navegacao t={t.nav} idioma={idioma} />
      <main id="conteudo">
        {/* 01 · Início */}
        <section className="secao lado-papel abertura" id="inicio">
          {/* EST-56: chuva de notas MC, fundo decorativo só no desktop, carregada depois do load */}
          <VideoAnimado midia={CHUVA_MIDIA} modo="loop" className="chuva-fundo" largura={1280} altura={720} soDesktop aposCarga semPosterReduzido />
          <div className="moldura">
            <Gravura g="01_moldura_horizontal_ornamental" className="moldura-h" prioridade ocultaEm="(max-width: 860px)" />
            <Gravura g="02_moldura_vertical_certificado" className="moldura-v" />
            <div className="moldura-texto">
              {/* EST-32: etiqueta de disponibilidade como carimbo de cédula */}
              <h1>Matheus Cortes</h1>
              <p className="funcao">{t.hero.funcao}</p>
              <p className="metadados">{t.hero.metadados.map((m) => <span key={m}>{m}</span>)}</p>
              <Decifra className="frase" texto={t.hero.frase} />
              <p className="apresentacao">{t.hero.apresentacao}</p>
              <div className="acoes">
                <a className="botao" href={CURRICULO[idioma]} download hrefLang={idioma === "pt" ? "pt-BR" : "en"}>{t.hero.baixarCurriculo}</a>
                <a className="botao vazado" href="#projetos">{t.hero.verProjetos}</a>
              </div>
              <ul className="acoes-perfis" aria-label={t.hero.perfisRotulo}>
                {["LinkedIn", "GitHub"].map((n) => <li key={n}><a href={urlDoPerfil(n)} target="_blank" rel="noopener noreferrer"><Icone nome={n} />{n}</a></li>)}
              </ul>
            </div>
          </div>
          <Gravura g="12_camera_seguranca" className="solto s-camera" />
          <Gravura g="13_cadeado_e_chave" className="solto s-cadeado" />
        </section>

        {/* Registro de entrada do cofre (como na prévia, a pedido do Matheus) */}
        <section className="secao lado-papel cofre" id="registro" aria-labelledby="cofre-tit">
          <p className="sobretitulo centro" id="cofre-tit">{t.registro.tituloCofre}</p>
          <div className="cofre-cena">
            {/* EST-57: o cofre com segredo abre a cada passagem (no lugar da gravura 04_cofre_bancario) */}
            <VideoAnimado midia={COFRE_MIDIA} modo="uma-vez" className="cofre-img cofre-video" largura={1280} altura={720} abertoAoRegistrar />
            <Registro t={t.registro} idioma={idioma} />
          </div>
        </section>

        {/* 02 · Projetos */}
        <section className="secao lado-papel projetos-secao com-fundo" id="projetos">
          <div className="fundo" aria-hidden="true"><Gravura g="06_prensa_antiga_gravura" /></div>
          {/* EST-60: a mesma prensa repete no meio (espelhada) e embaixo, para o fundo cobrir todos os projetos */}
          <div className="fundo fundo-meio" aria-hidden="true"><Gravura g="06_prensa_antiga_gravura" /></div>
          <div className="fundo fundo-baixo" aria-hidden="true"><Gravura g="06_prensa_antiga_gravura" /></div>
          <Cabecalho num="02" sobre={t.projetos.sobretitulo} titulo={t.projetos.titulo} lead={t.projetos.lead} g="15_mao_jogando_moeda" />
          <Projetos lista={soIdioma(projetos, idioma)} t={t.projetos} idioma={idioma} />
        </section>

        {/* 03 · Sobre */}
        <section className="secao lado-papel sobre" id="sobre">
          <Cabecalho num="03" sobre={t.sobre.sobretitulo} titulo={t.sobre.titulo} lead={t.sobre.paragrafos[0]} g="20_leao_dominio_publico" />
          <div className="sobre-grade">
            <div className="certificado">
              {/* EST-48/EST-49: Ato III — o selo MC é gravado no oval toda vez que a ficha entra na tela */}
              <Autenticacao />
              <div className="certificado-texto">
                <p className="sobretitulo">{t.sobre.sobretitulo}</p>
                <p className="certificado-nome">Matheus Cortes</p>
                <dl className="fatos">
                  <div><dt>{t.sobre.fatos.formacao}</dt><dd>{t.sobre.fatos.formacaoValor}</dd></div>
                  <div><dt>{t.sobre.fatos.foco}</dt><dd>{t.sobre.fatos.focoValor}</dd></div>
                </dl>
                <p className="cv"><a className="botao" href={CURRICULO.pt} download hrefLang="pt-BR">{t.sobre.cv} PT</a><a className="botao vazado" href={CURRICULO.en} download hrefLang="en">{t.sobre.cv} EN</a></p>
              </div>
            </div>
            <div className="sobre-col">
              <div className="sobre-paragrafos">{t.sobre.paragrafos.slice(1).map((p) => <p key={p}>{p}</p>)}</div>
              <h3 className="subtitulo">{t.sobre.oQueFaco.titulo}</h3>
              <ol className="faco">
                {t.sobre.oQueFaco.itens.map((it, i) => <li key={it.titulo}><span className="faco-num">0{i + 1}</span><strong>{it.titulo}</strong><p>{it.texto}</p></li>)}
              </ol>
              <h3 className="subtitulo">{t.sobre.trajetoria.titulo}</h3>
              <ol className="linha-tempo">
                {t.sobre.trajetoria.itens.map((it) => (
                  <li key={it.titulo}><span className="lt-periodo">{it.periodo}</span><strong>{it.titulo}</strong><span className="lt-local">{it.local}</span><p>{it.texto}</p></li>
                ))}
              </ol>
            </div>
          </div>
          <h3 className="subtitulo centro">{t.sobre.tecnologias.titulo}</h3>
          <div className="tecnologias">
            {t.sobre.tecnologias.grupos.map((g, n) => (
              <div key={g.nome} className="tec-bloco">
                <p className="tec-bloco-nome"><span>0{n + 1}</span>{g.nome}</p>
                <div className="tec-grade">
                  {g.itens.map((i) => {
                    const ic = iconeDe(i);
                    return (
                      <div key={i} className="tec-cartao">
                        {ic && <svg viewBox="0 0 24 24" className={ic.tipo} aria-hidden="true"><path d={ic.path} /></svg>}
                        <span className="tec-item">{i}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 · Certificações (EST-21) */}
        <section className="secao lado-papel certificacoes" id="certificacoes">
          <Cabecalho num="04" sobre={t.certificacoes.sobretitulo} titulo={t.certificacoes.titulo} lead={t.certificacoes.lead} g="13_cadeado_e_chave" />
          <ol className="cert-lista">
            {certificacoes.map((c) => (
              <li key={c.titulo.pt} className="cert-item">
                <p className="cert-emissor">{c.emissor}</p>
                <h3 className="cert-nome">{c.titulo[idioma]} <span className="cert-categoria">{c.categoria[idioma]}</span></h3>
                <p className="cert-descricao">{c.descricao[idioma]}</p>
                <ul className="cert-competencias">{c.competencias[idioma].map((x) => <li key={x}>{x}</li>)}</ul>
              </li>
            ))}
          </ol>
        </section>

        {/* 05 · Write-ups */}
        <section className="secao lado-papel writeups" id="writeups">
          <Cabecalho num="05" sobre={t.writeups.sobretitulo} titulo={t.writeups.titulo} lead={t.writeups.lead} g="14_computador_antigo" />
          <div className="writeups-grade">
            <Olho />
            <article className="writeup">
              <p className="sobretitulo">W-01 · {writeup.ano} · {writeup.credito?.[idioma]}</p>
              <h3>{writeup.titulo[idioma]}</h3>
              <p>{writeup.resumo[idioma]} {writeup.solucao[idioma]}</p>
              <ul className="stack">{writeup.stack.map((s) => <li key={s}>{s}</li>)}</ul>
              <div className="acoes esquerda">
                <a className="botao" href="#projetos" data-abrir-projeto={writeup.slug}>{t.writeups.abrir}</a>
                <a className="botao vazado" href={writeup.links[0].url} target="_blank" rel="noopener noreferrer">{t.writeups.github}</a>
              </div>
            </article>
          </div>
        </section>

        {/* 06 · Atividade */}
        <section className="secao lado-papel atividade" id="atividade">
          <Cabecalho num="06" sobre={t.atividade.sobretitulo} titulo={t.atividade.titulo} lead={t.atividade.lead} g="18_ampulheta_versao_1">
            {/* EST-58: fita de cotação alinhada ao título "Atividade", decorativa, em loop enquanto visível */}
            <VideoAnimado midia={FITA_MIDIA} modo="loop" className="fita-video" largura={960} altura={540} />
          </Cabecalho>
          <div className="ativ-grade">
            <figure className="quadro-github">
              <Grafico dias={dias} t={t} idioma={idioma} />
              <figcaption><span>github.com/MatheusCortes02 · {t.atividade.lidoEm} {lidoEm}</span>
                <span className="g-legenda" aria-hidden="true">{t.atividade.menos} <i className="n0" /><i className="n1" /><i className="n2" /><i className="n3" /><i className="n4" /> {t.atividade.mais}</span></figcaption>
            </figure>
            <dl className="ativ-numeros">
              <div><dt>{t.atividade.contribuicoes}</dt><dd>{est.total}</dd></div>
              <div><dt>{t.atividade.maiorSequencia}</dt><dd>{est.maiorSequencia} {est.maiorSequencia === 1 ? t.atividade.dia : t.atividade.dias}</dd></div>
              <div><dt>{t.atividade.diasAtivos}</dt><dd>{est.ativos}</dd></div>
            </dl>
          </div>
        </section>

        {/* 07 · Contato */}
        <section className="secao lado-papel contato com-fundo" id="contato">
          <div className="fundo" aria-hidden="true"><Gravura g="09_carta_lacrada_pombo" /></div>
          <Cabecalho num="07" sobre={t.contato.sobretitulo} titulo={t.contato.titulo} lead={t.contato.lead} g="17_telefone_antigo" />
          <div className="contato-grade">
            <Contato t={t.contato} />
            <div className="perfis">
              <p className="sobretitulo">{t.contato.perfis}</p>
              <ul>
                <li><a href={`mailto:${EMAIL}`}><Icone nome="E-mail" />{EMAIL}</a></li>
                {PERFIS.map((p) => <li key={p.nome}><a href={p.url} target="_blank" rel="noopener noreferrer"><Icone nome={p.nome} />{p.nome}</a></li>)}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Movimento />

      <footer className="rodape lado-papel">
        <p className="rodape-nome">Matheus Cortes</p>
        <p className="rodape-frase">{t.rodape.frase}</p>
        <nav className="rodape-nav" aria-label={t.nav.rodape}>
          {(["projetos", "sobre", "certificacoes", "writeups", "atividade", "contato"] as const).map((k) => <a key={k} href={`#${k}`}>{t.nav[k]}</a>)}
          <a href="#inicio">{t.nav.topo} ↑</a>
        </nav>
        <p className="rodape-credito">© 2026 Matheus Cortes · {t.rodape.direitos}</p>
      </footer>
    </>
  );
}
