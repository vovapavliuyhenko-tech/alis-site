// robots.txt. Сделан обработчиком маршрута, а не app/robots.ts: MetadataRoute.Robots
// не умеет Clean-param (директива Яндекса для склейки URL с UTM-метками).
import { SITE_URL, NOINDEX_PATHS } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const disallow = NOINDEX_PATHS.map((p) => `Disallow: ${p}`).join("\n");
  // Превью-деплои Vercel закрываем целиком
  const closed = process.env.VERCEL_ENV === "preview";
  const body = closed
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *
Allow: /
${disallow}
Disallow: /*?sort=
Disallow: /*?filter=

User-agent: Yandex
Allow: /
${disallow}
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&gclid&fbclid

Sitemap: ${SITE_URL}/sitemap.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
