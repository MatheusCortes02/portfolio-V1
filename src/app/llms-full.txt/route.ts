// EST-41: /llms-full.txt com o conteúdo completo do site, gerado de src/conteudo/ no build.
import { listarCurriculos } from "@/lib/curriculos";
import { gerarLlmsFull } from "@/lib/llms";

export function GET() {
  return new Response(gerarLlmsFull(listarCurriculos()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
