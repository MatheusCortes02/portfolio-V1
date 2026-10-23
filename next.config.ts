import type { NextConfig } from "next";

// EST-42 — cabeçalhos de segurança. Teste: src/lib/seguranca.test.ts.
// script-src usa 'unsafe-inline' e não nonce: com cacheComponents (pré-renderização parcial) a casca estática não
// recebe nonce, e a documentação do Next 16 (guides/content-security-policy.md) diz que nonce é incompatível com PPR.
// 'unsafe-eval' e ws: só em desenvolvimento (o React usa eval para as pilhas de erro; o recarregamento usa websocket).
export function politicaCsp(dev: boolean): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    // formulário (Web3Forms) e registro de entrada do cofre (ipwho.is, reserva ipapi.co — spec 002)
    `connect-src 'self' https://api.web3forms.com https://ipwho.is https://ipapi.co${dev ? " ws: wss:" : ""}`,
    "media-src 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

export function cabecalhosSeguranca(dev: boolean): { key: string; value: string }[] {
  return [
    { key: "Content-Security-Policy", value: politicaCsp(dev) },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), hid=(), bluetooth=(), midi=(), " +
        "magnetometer=(), gyroscope=(), accelerometer=(), display-capture=(), browsing-topics=(), fullscreen=(self)",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ];
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: cabecalhosSeguranca(process.env.NODE_ENV === "development") }];
  },
};

export default nextConfig;
