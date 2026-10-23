import type { MetadataRoute } from "next";
import { montarRobots } from "@/lib/seo";

// EST-41: busca e IA liberados; sitemap e llms.txt apontados.
export default function robots(): MetadataRoute.Robots {
  return montarRobots();
}
