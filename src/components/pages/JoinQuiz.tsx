"use client";
// АНКЕТА КАНДИДАТА (страница «Команда», #join). Шаг 1 — «Где хотите работать?»: салон или
// международная команда; дальше — полная анкета заказчицы по шагам (CandidateQuiz): для салона —
// вопросы «Анкеты кандидата» салона, для международной команды — анкета консьерж-сервиса.
// Компьютер: слева заголовок и плитки ответов (заполняются по ходу). Анкета уходит в CRM («vacancy»).
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import CandidateQuiz from "@/components/pages/CandidateQuiz";
import type { Dir } from "@/lib/vacancies";

const DIRS: { id: Dir; ru: string; en: string }[] = [
  { id: "salon", ru: "Салон в Новороссийске", en: "Salon in Novorossiysk" },
  { id: "concierge", ru: "Международная команда", en: "International team" },
];

export default function JoinQuiz() {
  const { lang } = useLang();
  const en = lang === "en";
  const [dir, setDir] = useState<Dir | null>(null);
  const [vals, setVals] = useState<Record<string, string | string[]>>({});
  const [initial, setInitial] = useState<Record<string, string> | undefined>();
  // «Откликнуться» в списке вакансий салона — сразу салон и выбранная позиция
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ position: string }>).detail;
      const init = { position: d.position };
      setInitial(init);
      setVals(init);
      setDir("salon");
    };
    window.addEventListener("alis-join-pick", on);
    return () => window.removeEventListener("alis-join-pick", on);
  }, []);
  const link = "text-[11px] uppercase tracking-[0.14em] text-[#17191a]/55 transition-colors hover:text-[#17191a]";

  const tiles = [
    { key: "dir", label: en ? "Direction" : "Направление", v: dir ? DIRS.find((d) => d.id === dir)![lang] : "", wide: true },
    { key: "position", label: en ? "Position" : "Позиция", v: String(vals.position || "") },
    { key: "experience", label: en ? "Experience" : "Стаж", v: String(vals.experience || "") },
  ];

  return (
    <section id="join" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto grid w-[96%] max-w-[1760px] gap-5 rounded-[22px] border border-[#17191a]/[0.06] bg-white px-4 py-7 text-[#17191a] shadow-[0_24px_50px_-28px_rgba(23,25,26,0.35)] sm:gap-8 sm:rounded-[28px] sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-14">
        {/* Слева: заголовок и плитки ответов */}
        <div className="flex flex-col text-left">
          <h2 className="text-[#17191a]">{en ? "Work at events in different cities and countries under the ÁLIS BEAUTY brand" : "Работайте на мероприятиях в разных городах и странах под брендом ÁLIS BEAUTY"}</h2>
          <p className="mt-2 !text-[12.5px] text-[#17191a]/60 sm:mt-3 sm:!text-[15px]">{en ? "We find the big bookings, you create the looks. No client hunting and no spending on materials." : "Мы находим крупные заказы, вы создаёте образы. Без поиска клиентов и вложений в материалы."}</p>
          <div className="mt-7 hidden flex-col lg:flex">
            <div className="grid grid-cols-2 gap-2">
              {tiles.map((x) => (
                <div key={x.key} className={`rounded-[14px] px-4 py-2.5 transition-colors duration-500 ${x.wide ? "col-span-2" : ""} ${x.v ? "bg-[#f6f4f1]" : "bg-[#f6f4f1]/55"}`}>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{x.label}</span>
                  <p className="mt-1 overflow-hidden font-display text-[16px] tracking-[0.02em]">
                    <span key={x.v || "—"} className={`block ${x.v ? "animate-[join-val_.55s_cubic-bezier(.2,.8,.2,1)] text-[#17191a]" : "text-[#17191a]/20"}`}>{x.v || "—"}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Справа: шаги */}
        {dir ? (
          <CandidateQuiz key={dir + (initial?.position ?? "")} dir={dir} initial={initial} onValues={setVals} onBack={() => { setDir(null); setVals({}); setInitial(undefined); }} />
        ) : (
          <div className="w-full text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45">{en ? "Step 1" : "Шаг 1"}</span>
            <div className="mt-3 h-[2px] w-full rounded-full bg-[#17191a]/12" />
            <div className="animate-[join-in_.4s_ease]">
              <p className="mt-4 font-display text-[13px] uppercase tracking-[0.04em] sm:mt-5 sm:text-[17px]">{en ? "Where would you like to work?" : "Где хотите работать?"}</p>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {DIRS.map((d, k) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDir(d.id)}
                    style={{ animationDelay: `${k * 0.06}s` }}
                    className="animate-[join-in_.45s_ease_both] flex min-h-[42px] items-center justify-center rounded-[12px] border border-transparent bg-[#f6f4f1] px-2.5 py-2 text-center text-[11.5px] leading-tight text-[#17191a] transition-all hover:border-[#17191a]/30 active:scale-[0.97] sm:min-h-0 sm:rounded-[16px] sm:py-3 sm:text-[14px]"
                  >
                    {d[lang]}
                  </button>
                ))}
              </div>
              <p className={`mt-5 !text-[12px] leading-[1.55] text-[#17191a]/55 sm:!text-[13px]`}>{en ? "The form takes about 7 minutes. Every application is reviewed personally." : "Заполнение анкеты займёт около 7 минут. Каждая заявка рассматривается лично."}</p>
              <a href="#vacancies" className={`mt-4 inline-block ${link}`}>{en ? "← Open positions" : "← Открытые вакансии"}</a>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes join-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes join-val { from { opacity: 0; transform: translateY(100%) } to { opacity: 1; transform: none } }
        @keyframes join-dot { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,.5) } 100% { box-shadow: 0 0 0 10px rgba(255,255,255,0) } }
        @media (prefers-reduced-motion: reduce) { #join * { animation: none !important } }
      `}</style>
    </section>
  );
}
