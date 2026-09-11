"use client";
// БЛОК 5 — призыв к записи на полноширинном фото с затемнением.
import { useLang } from "@/lib/i18n";
import { BookButton } from "./massage/shared";

const BG = "/assets/tild6230-643__.jpg"; // плейсхолдер

export default function MassageCTA() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="relative isolate overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BG} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#211a1c]/62" />
      <div className="mx-auto flex w-[92%] max-w-[900px] flex-col items-center py-24 text-center lg:py-32">
        <h2 className="font-serif-display text-[22px] font-normal uppercase leading-[1.25] tracking-[0.02em] text-white sm:text-[28px] lg:text-[34px]">
          {en
            ? "Book your first session and give your body a long-awaited rest"
            : "Запишитесь на первый сеанс и подарите телу долгожданный отдых"}
        </h2>
        <BookButton className="mt-9 !bg-[#F4F1EA] !text-[#2c2822] hover:!bg-white" />
        <p className="mt-4 text-[12px] tracking-[0.02em] text-white/85">
          {en ? "10% off your first visit" : "Скидка 10% на первое посещение"}
        </p>
      </div>
    </section>
  );
}
