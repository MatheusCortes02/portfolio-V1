// Formulário de contato (EST-19): o navegador envia direto ao Web3Forms. A chave de acesso é pública por desenho
// do serviço (só identifica para qual e-mail entregar) e vem de NEXT_PUBLIC_WEB3FORMS_KEY, no .env.local e na Vercel.
export type Envio = { access_key: string; subject: string; from_name: string; email: string; message: string; botcheck: string };

export function montarEnvio(dados: Record<string, unknown>, chave: string | undefined): Envio | null | "sem-chave" {
  const nome = String(dados.nome ?? "").trim(), email = String(dados.email ?? "").trim(), mensagem = String(dados.mensagem ?? "").trim();
  if (nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || mensagem.length < 5 || mensagem.length > 5000) return null;
  if (!chave) return "sem-chave";
  return { access_key: chave, subject: `Portfólio: mensagem de ${nome}`, from_name: nome, email, message: mensagem, botcheck: "" };
}
