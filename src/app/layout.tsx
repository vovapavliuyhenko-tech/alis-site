import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
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

export const metadata: Metadata = {
  title: "resayme — бренд-дизайнер, графический дизайнер Диана Семенова",
  description: "Портфолио и курс It's base. Бренд-дизайн, айдентика, визуал.",
  icons: { icon: "/assets/tild3364-356_favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
