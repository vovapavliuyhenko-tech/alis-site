import type { Metadata } from "next";
import { Aboreto, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import CustomCursor from "@/components/CustomCursor";
import CookieConsent from "@/components/CookieConsent";

// Фирменная пара из логобука ALIS beauty:
// Aboreto — логотип и заголовки (латиница-only, нет кириллицы → всегда с фолбэком).
// Source Code Pro (Light) — весь остальной текст, капсовые надписи, витрина /shop.
const aboreto = Aboreto({
  variable: "--font-aboreto",
  subsets: ["latin"],
  weight: ["400"],
});
const sourceCodePro = Source_Code_Pro({
  variable: "--font-scp",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "ALIS — сеть студий эстетики и beauty-concierge",
  description:
    "ALIS beauty: образы, макияж, укладка, свадебные образы, выезд мастеров и сопровождение. Основатель — Дайана Тарзян.",
  icons: { icon: "/assets/tild3364-356_favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${aboreto.variable} ${sourceCodePro.variable} antialiased`}>
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
