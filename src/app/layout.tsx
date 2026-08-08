import type { Metadata } from "next";
import { Inter, Oswald, Marck_Script } from "next/font/google";
import "./globals.css";

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
// Marck Script — каллиграфический скрипт для заголовков (поддерживает кириллицу)
const marck = Marck_Script({
  variable: "--font-marck",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ALIS — сеть студий эстетики и beauty-concierge",
  description:
    "ALIS beauty: образы, макияж, укладка, свадебные образы, выезд мастеров и сопровождение. Основатель — Дайана Тарзян.",
  icons: { icon: "/assets/tild3364-356_favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable} ${marck.variable} antialiased`}>
      <head>
        {/* Фолбэк: если JS выключен, элементы появления видны сразу */}
        <noscript>
          <style>{`.r-reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
