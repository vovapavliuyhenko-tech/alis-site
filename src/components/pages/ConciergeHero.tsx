"use client";
// ГЛАВНЫЙ БЛОК страницы «Бьюти-консьерж» — точно как Hero на главной: надстрочник,
// крупный заголовок с оливковыми акцентами, подзаголовок и растянутая кнопка внизу.
// Текст подогнан по смыслу под выездной сервис. Двуязычно.
import { useLang } from "@/lib/i18n";

export default function ConciergeHero() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  return (
    <section className="relative flex h-svh min-h-[640px] w-full flex-col overflow-hidden bg-gradient-to-b from-[#f7f3ed] to-[#efe7db] px-6 pb-4 pt-20 text-center sm:pb-5">
      <div className="relative z-10 mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center">
        {/* Надстрочник */}
        <p className="text-[11px] font-medium tracking-wide text-[#2a2320]/80 sm:text-[12px]">
          {t("выезд по России и за границу. под ключ.", "on location across Russia and abroad. turnkey.")}
        </p>

        {/* Заголовок с акцентами */}
        <h1 className="mt-4 font-display text-[22px] font-normal uppercase leading-[1.1] tracking-[0.02em] text-[#2a2320] sm:text-[30px] lg:text-[38px]">
          <span className="text-[#6E7248]">ÁLIS BEAUTY</span> —{" "}
          {t("выездной бьюти-консьерж", "an on-location beauty concierge")}{" "}
          <span className="text-[#6E7248]">{t("под ключ", "turnkey")}</span>
        </h1>

        {/* Подзаголовок */}
        <p className="mt-5 max-w-md text-[12.5px] leading-relaxed text-[#2a2320]/70 sm:text-[13.5px]">
          {t(
            "Команда мастеров, тайминг и образ для вас и вашей команды — макияж, причёски и уход прямо на площадке, в 4–6 рук.",
            "A team of masters, timing and the whole look for you and your team — makeup, hair and care right at the venue, in 4–6 hands.",
          )}
        </p>
      </div>

      {/* Кнопка-заявка — растянута на всю ширину снизу блока */}
      <a
        href="#booking"
        className="relative z-10 flex w-full items-center justify-center rounded-2xl border border-[#6E7248] bg-[#6E7248] py-4 font-display text-[13px] uppercase tracking-[0.14em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#6E7248] sm:py-5 sm:text-[14px]"
      >
        {t("оставить заявку", "leave a request")}
      </a>
    </section>
  );
}
