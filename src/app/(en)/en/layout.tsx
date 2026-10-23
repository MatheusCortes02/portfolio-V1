import type { Metadata } from "next";
import { classesFontes } from "@/componentes/fontes";
import { dadosEstruturados, jsonLd, montarMetadata } from "@/lib/seo";
import "../../estilos.css";

// EST-39 (metadata) e EST-40 (JSON-LD)
export const metadata: Metadata = montarMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={classesFontes} suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(dadosEstruturados("en")) }} />
        {children}
      </body>
    </html>
  );
}
