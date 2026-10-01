"use client";
// Содержимое страницы 404 на языке сайта (RU/EN)
import Link from "next/link";
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export default function NotFoundContent() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="bg-white px-6 pb-24 pt-40 text-center lg:pb-32 lg:pt-48">
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#46131E]">{en ? "Error 404" : "Ошибка 404"}</p>
      <h1 className="mt-4 font-serif-display text-[26px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-[#17191a] lg:text-[34px]">
        {en ? "This page doesn’t exist" : "Такой страницы нет"}
      </h1>
      <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.65] text-[#17191a]/75">
        {en ? "The link may be outdated or the address mistyped. Here’s where you can go:" : "Возможно, ссылка устарела или в адресе опечатка. Вот куда можно перейти:"}
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="rounded-xl border border-[#17191a]/20 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#17191a] transition-colors hover:border-[#46131E] hover:text-[#46131E]">
          {en ? "Home" : "На главную"}
        </Link>
        <Link href="/salon#uslugi" className="rounded-xl border border-[#17191a]/20 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#17191a] transition-colors hover:border-[#46131E] hover:text-[#46131E]">
          {en ? "Services & prices" : "Услуги и цены"}
        </Link>
        <a
          href={YCLIENTS}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-[#17191a] bg-[#17191a] px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent hover:text-[#17191a]"
        >
          {en ? "Book online" : "Записаться онлайн"}
        </a>
      </div>
    </section>
  );
}
