import type { MetadataRoute } from "next";
import { listarCurriculos } from "@/lib/curriculos";
import { montarSitemap } from "@/lib/seo";

// EST-39: / e /en com hreflang, mais os PDFs de currículo quando existirem.
export default function sitemap(): MetadataRoute.Sitemap {
  return montarSitemap(listarCurriculos());
}
