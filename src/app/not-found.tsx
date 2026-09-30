import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Своя 404: отдаёт код 404 (Next.js ставит его сам) и ведёт на главные разделы
export const metadata: Metadata = {
  title: "Страница не найдена — ÁLIS BEAUTY",
  robots: { index: false, follow: true },
};

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="bg-white px-6 pb-24 pt-40 text-center lg:pb-32 lg:pt-48">
        <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#46131E]">Ошибка 404</p>
        <h1 className="mt-4 font-serif-display text-[26px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-[#17191a] lg:text-[34px]">
          Такой страницы нет
        </h1>
        <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.65] text-[#17191a]/75">
          Возможно, ссылка устарела или в адресе опечатка. Вот куда можно перейти:
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="rounded-xl border border-[#17191a]/20 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#17191a] transition-colors hover:border-[#46131E] hover:text-[#46131E]">
            На главную
          </Link>
          <Link href="/salon#uslugi" className="rounded-xl border border-[#17191a]/20 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#17191a] transition-colors hover:border-[#46131E] hover:text-[#46131E]">
            Услуги и цены
          </Link>
          <a
            href={YCLIENTS}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#46131E] bg-[#46131E] px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent hover:text-[#46131E]"
          >
            Записаться онлайн
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
