"use client";
// ОБЛОЖКА внутренних страниц («Салон красоты», «Команда», «Консьерж-сервис»,
// «Сотрудничество»): полноэкранное фото без логотипа и без эффектов прокрутки
// (убраны по фидбеку). Внизу — опциональная широкая стеклянная кнопка.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

// Фото — заменить на съёмку. object-cover, тянется на весь экран.
const DEFAULT_PHOTO = "/assets/alis/img_6009.jpg";

export default function TeamIntro({
  cta,
  photo = DEFAULT_PHOTO,
}: {
  cta?: { label: Loc; href: string };
  photo?: string;
}) {
  const { lang } = useLang();

  return (
    <section className="relative isolate flex h-[100svh] flex-col overflow-hidden bg-[#3a3631] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      {/* Лёгкое затемнение сверху — под светлую шапку */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,0) 26%)" }}
      />

      {cta && (
        <div className="mt-auto px-4 pb-4 lg:px-5 lg:pb-5">
          <a
            href={cta.href}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/15 px-8 py-5 text-[13px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#17191a] lg:text-[14px]"
          >
            {cta.label[lang]}
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </section>
  );
}
