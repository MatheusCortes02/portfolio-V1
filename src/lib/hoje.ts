import { cacheLife } from "next/cache";

/** Data de hoje para a duração da experiência: com Cache Components, `new Date()` só pode ficar dentro de função em cache. */
export async function hoje(): Promise<string> {
  "use cache";
  cacheLife("days");
  return new Date().toISOString();
}
