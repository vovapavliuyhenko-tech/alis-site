"use client";
// МИССИЯ БРЕНДА — копия блока O'CARE: по центру мягкое зелёное свечение, серифовый
// подзаголовок «Миссия бренда» (Cormorant) и крупный текст (Geologica) с выделением.
// Бежевый фон. Двуязычно.
import { useLang } from "@/lib/i18n";

export default function ShopMission() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="mission" className="scroll-mt-24 bg-[#F3F2EE] py-24 lg:py-36">
      <div className="mx-auto w-[92%] max-w-[900px] text-center">
        {/* Зелёное свечение + подзаголовок */}
        <div className="relative mx-auto mb-10 w-fit">
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-0 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9ede6a]/45 blur-3xl"
          />
          <span className="ff-cormorant relative z-10 text-[22px] font-semibold text-[#1c1c1c] lg:text-[26px]">
            {en ? "Brand mission" : "Миссия бренда"}
          </span>
        </div>

        <p className="ff-geo text-[24px] leading-[1.35] text-[#1c1c1c] lg:text-[34px]">
          {en ? (
            <>
              We&apos;re building a new approach to skincare, making it{" "}
              <strong className="font-semibold">simple, accessible and effective</strong>, so
              everyone can easily find solutions for their needs
            </>
          ) : (
            <>
              Мы строим новый подход к уходу за кожей, делая его{" "}
              <strong className="font-semibold">простым, доступным и эффективным</strong>, чтобы
              каждый мог легко найти решения для своих нужд
            </>
          )}
        </p>
      </div>
    </section>
  );
}
