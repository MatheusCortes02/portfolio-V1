/** Registro do cofre sob demanda (spec 003, EST-34). */
export const SERVICO_IP = "https://ipwho.is/";

/** Mostra só o começo do IP: dois grupos no IPv6, dois octetos no IPv4. */
export function mascararIp(ip: string): string {
  const v = (ip || "").trim();
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(v)) return `${v.split(".").slice(0, 2).join(".")}.···.···`;
  if (v.includes(":") && /^[0-9a-f:]+$/i.test(v)) {
    const grupos = v.split(":").filter(Boolean).slice(0, 2);
    if (grupos.length) return `${grupos.join(":")}:····`;
  }
  return "—";
}

export function localDe(x: { city?: string; region_code?: string; region?: string; country_code?: string }): string {
  return [x.city, x.region_code || x.region, x.country_code].filter(Boolean).join(", ") || "—";
}
