import type { Metadata } from "next";
import { Marcellus, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Preloader from "@/components/Preloader";
import ServiceWorker from "@/components/ServiceWorker";
import SmoothAnchor from "@/components/SmoothAnchor";
import CustomCursor from "@/components/CustomCursor";
import CookieConsent from "@/components/CookieConsent";
import BookingFab from "@/components/BookingFab";

// Пара шрифтов на всём сайте:
// Marcellus — логотип и все заголовки (тонкий римский; латиница, для кириллицы — serif-фолбэк).
// Source Code Pro — весь остальной текст, включая мелкий (с кириллицей).
const heading = Marcellus({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
// Playfair Display — крупный серифный заголовок первого блока (с кириллицей).
const serif = Playfair_Display({
  variable: "--font-serif-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ÁLIS BEAUTY — салон красоты в Новороссийске и выездной премиум-сервис",
  description:
    "ÁLIS BEAUTY: маникюр, педикюр, брови, макияж, окрашивание и укладки волос, а также выездной премиум-сервис для мероприятий. Новороссийск, ул. Пархоменко, 53. Отражаем внутреннюю красоту во внешнем облике.",
  icons: { icon: "/assets/tild3364-356_favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable} ${serif.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#6E7248" />
        {/* Фолбэк: если JS выключен, элементы появления видны сразу */}
        <noscript>
          <style>{`.r-reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <LanguageProvider>
          {children}
          <BookingFab />
          <CookieConsent />
        </LanguageProvider>
        <CustomCursor />
        <SmoothAnchor />
        <ServiceWorker />
      </body>
    </html>
  );
}
