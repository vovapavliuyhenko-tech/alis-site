import type { NextConfig } from "next";

// Боевой домен задан (не *.vercel.app) — тогда технический адрес закрываем от индекса,
// чтобы он не стал дублем. Пока домена нет, vercel.app остаётся единственным адресом и индексируется.
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "";
const HAS_PROD_DOMAIN = !!SITE && !/\.vercel\.app\/?$/i.test(SITE);
const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  // Страница сертификатов удалена — сертификаты продаются через YClients
  async redirects() {
    return [{ source: "/certificate", destination: "https://o8981.yclients.ru/certificates", permanent: false }];
  },
  async headers() {
    const rules: { source: string; has?: { type: "host"; value: string }[]; headers: { key: string; value: string }[] }[] = [
      // Фото и иконки из /public — долгий кэш (имена файлов при замене меняем)
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
      { source: "/shop/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
      // Служебные страницы — не индексировать
      { source: "/crm/:path*", headers: NOINDEX },
      { source: "/admin/:path*", headers: NOINDEX },
      { source: "/request", headers: NOINDEX },
      { source: "/api/:path*", headers: NOINDEX },
    ];
    // Превью-деплои закрыты всегда; технический *.vercel.app — когда есть боевой домен
    if (IS_PREVIEW) rules.push({ source: "/:path*", headers: NOINDEX });
    else if (HAS_PROD_DOMAIN) rules.push({ source: "/:path*", has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }], headers: NOINDEX });
    return rules;
  },
};

export default nextConfig;
