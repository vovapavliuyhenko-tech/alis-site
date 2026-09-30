// Адрес сайта для canonical, sitemap, robots и Open Graph.
// Боевой домен задаётся в Vercel переменной NEXT_PUBLIC_SITE_URL (например https://alisbeauty.ru).
// TODO(владелец): подключить боевой домен и прописать его в NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://alis-site-one.vercel.app").replace(/\/+$/, "");

// Боевой домен задан и это не технический *.vercel.app
export const HAS_PROD_DOMAIN = !/\.vercel\.app$/i.test(new URL(SITE_URL).hostname);

// Страницы, которые не должны попадать в индекс (служебные)
export const NOINDEX_PATHS = ["/crm", "/admin", "/request", "/api"];
