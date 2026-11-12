"use client";
// ГАЛЕРЕЯ ВЫЕЗДНЫХ СОБЫТИЙ — карточки: фото/видео, город, событие, задача, итог и цифры.
// Данные — src/lib/conciergeEvents.ts. На телефоне — горизонтальная лента, на компьютере — сетка.
import { useLang } from "@/lib/i18n";
import { CONCIERGE_EVENTS, type ConciergeEvent } from "@/lib/conciergeEvents";

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 border-t border-[#17191a]/10 py-3 sm:grid-cols-[76px_minmax(0,1fr)]">
      <span className="text-[10px] uppercase tracking-[0.16em] text-[#17191a]/45 sm:text-[11px]">{label}</span>
      <span className="text-[13px] leading-[1.5] text-[#17191a] sm:text-[14px]">{value}</span>
    </div>
  );
}

function Card({ e }: { e: ConciergeEvent }) {
  const { lang } = useLang();
  const en = lang === "en";
  const empty = !e.event && !e.task && !e.result && !e.facts?.length;
  return (
    <article className="group w-[78vw] max-w-[420px] shrink-0 snap-start sm:w-auto sm:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#e9e6e1]">
        {isVideo(e.media) ? (
          <video src={e.media} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={e.media} alt={e.city[lang]} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#17191a] backdrop-blur-md sm:text-[11px]">
          {e.city[lang]}
        </span>
      </div>
      <div className="mt-4">
        {e.facts?.length ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {e.facts.map((f) => (
              <span key={f.ru} className="rounded-full border border-[#17191a]/15 px-3 py-1 text-[11px] text-[#17191a] sm:text-[12px]">{f[lang]}</span>
            ))}
          </div>
        ) : null}
        {e.event && <Row label={en ? "Event" : "Событие"} value={e.event[lang]} />}
        {e.task && <Row label={en ? "Task" : "Задача"} value={e.task[lang]} />}
        {e.result && <Row label={en ? "Result" : "Итог"} value={e.result[lang]} />}
        {empty && (
          <p className="border-t border-[#17191a]/10 pt-3 text-[12px] uppercase tracking-[0.16em] text-[#17191a]/45">
            {en ? "Details coming soon" : "Подробности скоро"}
          </p>
        )}
      </div>
    </article>
  );
}

export default function ConciergeEvents() {
  const { lang } = useLang();
  return (
    <section id="events" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto w-[96%] max-w-[1760px] pb-10 text-center lg:pb-14">
        <h2 className="font-serif-display !text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:!text-[28px]">
          {lang === "en" ? "Gallery of our on-location events" : "Галерея выездных событий"}
        </h2>
      </div>
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <div className="-mx-[2vw] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[2vw] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {CONCIERGE_EVENTS.map((e) => (
            <Card key={e.city.ru + e.media} e={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
