import dimensoes from "@/conteudo/dimensoes.json";
import { arquivoGravura, srcsetGravura, tamanhosGravura, type Tinta } from "@/lib/gravuras";

const DIM = dimensoes as unknown as Record<string, [number, number]>;
// 1 px transparente: no celular a moldura horizontal fica escondida e não deve ser baixada (EST-27)
const VAZIO = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

type Props = { g: string; tinta: Tinta; className?: string; alt?: string; sizes?: string; prioridade?: boolean; ocultaEm?: string; style?: React.CSSProperties };

/** Uma tinta de uma gravura: AVIF com WebP de reserva, em 480/800/1200 px e o original (EST-26, EST-27). */
export function ImgGravura({ g, tinta, className = "", alt = "", sizes, prioridade = false, ocultaEm, style }: Props) {
  const [w, h] = DIM[arquivoGravura(g, "papel", null, "webp")] ?? [1000, 1000];
  const tam = sizes ?? tamanhosGravura(className, !prioridade);
  return (
    <picture>
      {ocultaEm && <source media={ocultaEm} srcSet={VAZIO} />}
      <source type="image/avif" srcSet={srcsetGravura(g, tinta, w, "avif")} sizes={tam} />
      <img className={className} src={arquivoGravura(g, tinta, null, "webp")} srcSet={srcsetGravura(g, tinta, w, "webp")} sizes={tam}
        alt={alt} width={w} height={h} style={style} {...(prioridade ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const })} />
    </picture>
  );
}

/** Gravura em duas tintas: verde-escura no papel, verde-clara no preto (EST-07, EST-08). */
export function Gravura({ g, className = "", alt = "", prioridade = false, ocultaEm }: { g: string; className?: string; alt?: string; prioridade?: boolean; ocultaEm?: string }) {
  // a tinta escondida pelo CSS fica sempre preguiçosa: imagem preguiçosa com display:none não é baixada
  const sizes = tamanhosGravura(className, false);
  return (
    <span className={`gravura ${className}`} aria-hidden={alt ? undefined : true}>
      <ImgGravura g={g} tinta="papel" className="g-papel" alt={alt} sizes={prioridade ? sizes : `auto, ${sizes}`} prioridade={prioridade} ocultaEm={ocultaEm} />
      <ImgGravura g={g} tinta="preto" className="g-preto" sizes={`auto, ${sizes}`} ocultaEm={ocultaEm} />
    </span>
  );
}
