import { readdirSync } from "node:fs";
import { join } from "node:path";

/** PDFs em public/curriculo (vazio enquanto a pasta não existe). Lido no servidor, no build. */
export function listarCurriculos(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public", "curriculo")).filter((f) => f.toLowerCase().endsWith(".pdf")).sort();
  } catch {
    return [];
  }
}
