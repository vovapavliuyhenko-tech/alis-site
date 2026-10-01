import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { ShopProvider } from "@/lib/shop";
import ShopUI from "@/components/shop/ShopUI";
import ServiceWorker from "@/components/ServiceWorker";
import SmoothAnchor from "@/components/SmoothAnchor";
import CookieConsent from "@/components/CookieConsent";
import BookingFab from "@/components/BookingFab";
import Typograph from "@/components/Typograph";

// Montserrat на всём сайте (с полной кириллицей). Заголовки временно тоже
// Montserrat — до подключения файла AGOptCyrillic (тогда --font-heading заменим
// на localFont AGOptCyrillic).
const heading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const body = Montserrat({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_TITLE = "ÁLIS BEAUTY — салон красоты в Новороссийске и выездной премиум-сервис";
const SITE_DESC =
  "ÁLIS BEAUTY: маникюр, педикюр, брови, макияж, окрашивание и укладки волос, а также выездной премиум-сервис для мероприятий. Новороссийск, ул. Пархоменко, 53. Отражаем внутреннюю красоту во внешнем облике.";
// Превью ссылки в мессенджерах и соцсетях (og:image) — фото с обложки главной
const OG_IMAGE = { url: "/assets/alis/img_2745.jpg", width: 1600, height: 1067, alt: "ÁLIS BEAUTY — салон красоты в Новороссийске" };

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://alis-site-one.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESC,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ÁLIS BEAUTY",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESC, images: [OG_IMAGE.url] },
  icons: { icon: "/assets/tild3364-356_favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${heading.variable} ${body.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#17191a" />
        {/* Фолбэк: если JS выключен, элементы появления видны сразу */}
        <noscript>
          <style>{`.r-reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>
        <LanguageProvider>
          <ShopProvider>
            {children}
            <Typograph />
            <ShopUI />
            <BookingFab />
            <CookieConsent />
          </ShopProvider>
        </LanguageProvider>
        <SmoothAnchor />
        <ServiceWorker />
      </body>
    </html>
  );
}
