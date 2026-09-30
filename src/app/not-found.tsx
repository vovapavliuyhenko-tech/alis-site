import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/pages/NotFoundContent";

// Своя 404: отдаёт код 404 (Next.js ставит его сам) и ведёт на главные разделы
export const metadata: Metadata = {
  title: "Страница не найдена — ÁLIS BEAUTY",
  robots: { index: false, follow: true },
};


export default function NotFound() {
  return (
    <main>
      <Header />
      <NotFoundContent />
      <Footer />
    </main>
  );
}
