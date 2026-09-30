// sitemap.xml: только канонические индексируемые страницы (служебные /crm, /admin, /request не входят).
// lastmod — дата последнего коммита, менявшего файл страницы; если git недоступен при сборке — дата сборки.
import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { SITE_URL } from "@/lib/site";
import { NEWS } from "@/lib/news";
import { PRODUCTS } from "@/lib/products";

function lastmod(file: string): Date {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${file}"`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (out) return new Date(out);
  } catch {
    /* git нет — берём дату сборки */
  }
  return new Date();
}

const PAGES: { path: string; file: string }[] = [
  { path: "/", file: "src/app/page.tsx" },
  { path: "/salon", file: "src/app/salon/page.tsx" },
  { path: "/concierge", file: "src/app/concierge/page.tsx" },
  { path: "/contacts", file: "src/app/contacts/page.tsx" },
  { path: "/loyalty", file: "src/app/loyalty/page.tsx" },
  { path: "/shop", file: "src/app/shop/page.tsx" },
  { path: "/news", file: "src/lib/news.ts" },
  { path: "/cooperation", file: "src/app/cooperation/page.tsx" },
  { path: "/team", file: "src/app/team/page.tsx" },
  { path: "/docs", file: "src/app/docs/page.tsx" },
  { path: "/policy", file: "src/app/policy/page.tsx" },
  { path: "/offer", file: "src/app/offer/page.tsx" },
  { path: "/cookies", file: "src/app/cookies/page.tsx" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const news = lastmod("src/lib/news.ts");
  const products = lastmod("src/lib/products.ts");
  return [
    ...PAGES.map((p) => ({ url: `${SITE_URL}${p.path === "/" ? "" : p.path}`, lastModified: lastmod(p.file) })),
    ...NEWS.map((n) => ({ url: `${SITE_URL}/news/${n.slug}`, lastModified: new Date(n.date) > news ? new Date(n.date) : news })),
    ...PRODUCTS.map((p) => ({ url: `${SITE_URL}/product/${p.id}`, lastModified: products })),
  ];
}
