// Gera src/conteudo/dimensoes.json com largura e altura de cada imagem de public/midia (usa ffprobe).
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const raiz = join(process.cwd(), "public");
const saida = {};
function varre(pasta) {
  for (const nome of readdirSync(pasta)) {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) { varre(caminho); continue; }
    if (!/\.(jpe?g|png|webp)$/i.test(nome)) continue;
    const r = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", caminho]).toString().trim();
    const [w, h] = r.split(",").map(Number);
    saida["/" + relative(raiz, caminho).split(sep).join("/")] = [w, h];
  }
}
varre(join(raiz, "midia"));
writeFileSync(join(process.cwd(), "src", "conteudo", "dimensoes.json"), JSON.stringify(saida, null, 1) + "\n");
console.log(Object.keys(saida).length, "imagens");
