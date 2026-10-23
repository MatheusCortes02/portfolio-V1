// EST-41: /llms.txt gerado de src/conteudo/ no build (formato llmstxt.org).
import { listarCurriculos } from "@/lib/curriculos";
import { gerarLlms } from "@/lib/llms";

export function GET() {
  return new Response(gerarLlms(listarCurriculos()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
