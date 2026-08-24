import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display, Geologica, Cormorant_Garamond, Cormorant_SC, Great_Vibes } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import CustomCursor from "@/components/CustomCursor";
import CookieConsent from "@/components/CookieConsent";

// Inter — основной текст (как на resayme). Oswald — стенд-ин под Thunder (крупный текст).
// Настоящие крупные заголовки resayme — это SVG (лежат в /public/assets), а не шрифт.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});
const oswald = Oswald({
  variable: "--font-thunder",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});
// Playfair Display — контрастный «журнальный» serif для заголовков
// (ближайший бесплатный аналог IvyPresto Headline, с поддержкой кириллицы).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});
// Шрифты магазина /shop — точная копия витрины O'CARE:
// Geologica (гротеск, основной) + Cormorant Garamond (serif-заголовки).
const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});
// Фирменная пара (с кириллицей): Cormorant SC — капитель на заголовки/лого,
// Great Vibes — тонкий ажурный скрипт на акценты и «beauty».
const cormorantSC = Cormorant_SC({
  variable: "--font-cinzel",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
});
const greatVibes = Great_Vibes({
  variable: "--font-pinyon",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ÁLIS BEAUTY — салон красоты в Новороссийске и выездной премиум-сервис",
  description:
    "ÁLIS BEAUTY: маникюр, педикюр, брови, макияж, окрашивание и укладки волос, а также выездной премиум-сервис для мероприятий. Новороссийск, ул. Пархоменко, 53. Отражаем внутреннюю красоту во внешнем облике.",
  icons: { icon: "/assets/tild3364-356_favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable} ${playfair.variable} ${geologica.variable} ${cormorant.variable} ${cormorantSC.variable} ${greatVibes.variable} antialiased`}>
      <head>
        {/* Фолбэк: если JS выключен, элементы появления видны сразу */}
        <noscript>
          <style>{`.r-reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>
        <LanguageProvider>
          {children}
          <CookieConsent />
        </LanguageProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
