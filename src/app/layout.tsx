import type { Metadata } from "next";
import { Marmelad, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import CustomCursor from "@/components/CustomCursor";
import CookieConsent from "@/components/CookieConsent";
import ConciergeChat from "@/components/ConciergeChat";

// Пара шрифтов на всём сайте (оба с кириллицей):
// Marmelad — логотип, заголовки и главное (геометрический дисплей).
// Source Code Pro — весь остальной текст, включая мелкий.
const heading = Marmelad({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
});
const body = Source_Code_Pro({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ÁLIS BEAUTY — салон красоты в Новороссийске и выездной премиум-сервис",
  description:
    "ÁLIS BEAUTY: маникюр, педикюр, брови, макияж, окрашивание и укладки волос, а также выездной премиум-сервис для мероприятий. Новороссийск, ул. Пархоменко, 53. Отражаем внутреннюю красоту во внешнем облике.",
  icons: { icon: "/assets/tild3364-356_favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable} antialiased`}>
      <head>
        {/* Фолбэк: если JS выключен, элементы появления видны сразу */}
        <noscript>
          <style>{`.r-reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>
        <LanguageProvider>
          {children}
          <ConciergeChat />
          <CookieConsent />
        </LanguageProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
