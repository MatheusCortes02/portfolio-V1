// Proxy do Next 16 (antigo middleware): filtro de clientes automatizados (EST-43). Decisão em src/lib/bloqueio.ts.
import { NextResponse, type NextRequest } from "next/server";
import { deveBloquear } from "@/lib/bloqueio";

const MENSAGEM =
  "403 - Acesso negado a clientes automatizados. / Access denied to automated clients.\n" +
  "Robôs e IA / Bots and AI: /robots.txt, /llms.txt, /llms-full.txt, /sitemap.xml\n";

export function proxy(request: NextRequest) {
  if (deveBloquear(request.headers.get("user-agent"), request.nextUrl.pathname)) {
    return new NextResponse(MENSAGEM, {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  }
  return NextResponse.next();
}

export const config = {
  // Estáticos, mídia, currículos e arquivos para robôs nem passam pelo proxy (a função pura repete a regra).
  matcher: ["/((?!_next/|midia/|curriculo/|\\.well-known/|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt|favicon\\.ico|icon\\.png|apple-icon\\.png|manifest\\.webmanifest).*)"],
};
