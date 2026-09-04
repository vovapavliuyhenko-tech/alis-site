"use client";
// ЧАСТЫЕ ВОПРОСЫ — по мотивам traffic-masters: две колонки карточек. Заголовок
// слева в две строки (вторая — бордовым акцентом) + подзаголовок. Каждый вопрос —
// карточка с обводкой и круглым шевроном; активная заливается бордовым, текст
// становится кремовым. Несколько карточек могут быть открыты одновременно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { q: Loc; a: Loc };

const ITEMS: Item[] = [
  {
    q: { ru: "А если мне не понравится результат?", en: "What if I don't like the result?" },
    a: {
      ru: "Скажите об этом сразу, не выходя из кресла — мы поправим на месте. Если ошибка техническая (цвет лёг неровно, покрытие скололось в первые дни, ресницы отошли), исправляем в течение 7 дней за наш счёт. Вам не придётся платить дважды за одну работу.",
      en: "Tell us right away, before you leave the chair — we'll fix it on the spot. If it's a technical fault (uneven colour, coating chipped in the first days, lashes came off), we correct it within 7 days at our expense. You won't pay twice for one job.",
    },
  },
  {
    q: { ru: "Как вы стерилизуете инструмент?", en: "How do you sterilise your tools?" },
    a: {
      ru: "Инструмент проходит дезинфекцию и автоклав, упаковывается в крафт-пакет с индикатором стерильности и вскрывается при вас. Файлы и одноразовые расходники — новые на каждого клиента. Если хотите увидеть процесс — попросите администратора, покажем.",
      en: "Tools go through disinfection and an autoclave, are sealed in a kraft pouch with a sterility indicator and opened in front of you. Files and single-use supplies are new for every client. If you'd like to see the process — just ask the administrator.",
    },
  },
  {
    q: { ru: "Боюсь аллергии на ресницы и краску для бровей. Что вы делаете?", en: "I'm afraid of an allergy to lashes and brow tint. What do you do?" },
    a: {
      ru: "Перед первой процедурой предлагаем тест за 48 часов. Это важно: аллергия на клей и красители часто накопительная — может не проявиться годами, а потом остаться навсегда. Лучше потратить два дня, чем потом жить с отёкшими веками.",
      en: "Before the first procedure we offer a patch test 48 hours in advance. It matters: allergy to glue and dyes is often cumulative — it may not show for years and then stay forever. Better to spend two days than to live with swollen eyelids.",
    },
  },
  {
    q: { ru: "Цена окончательная или на месте будет больше?", en: "Is the price final or will it grow on the spot?" },
    a: {
      ru: "Стоимость называем до начала работы, после осмотра. Если в процессе выясняется, что нужен дополнительный шаг, мы останавливаемся и спрашиваем вас — и только потом продолжаем. Сюрпризов в чеке не будет.",
      en: "We name the price before we start, after examining you. If an extra step turns out to be needed, we stop and ask you first — and only then continue. No surprises on the bill.",
    },
  },
  {
    q: { ru: "Что если я опоздаю или мастер задержится?", en: "What if I'm late or the master runs over?" },
    a: {
      ru: "Между записями у нас есть буфер, поэтому небольшая задержка не рушит день. Если задержались мы больше чем на 15 минут — это наша ответственность, и мы это компенсируем. Ваше время стоит не меньше нашего.",
      en: "We keep a buffer between appointments, so a small delay doesn't ruin the day. If we run more than 15 minutes late — that's on us, and we make up for it. Your time is worth no less than ours.",
    },
  },
  {
    q: { ru: "У меня волосы после домашней краски или осветления. Возьмётесь?", en: "My hair is after home colour or bleaching. Will you take it on?" },
    a: {
      ru: "Сначала посмотрим и сделаем тест пряди. Иногда честный ответ — «сегодня осветлять нельзя, сначала два месяца восстановления». Мы скажем это прямо и дадим план по шагам с ценой каждого. Мы не беремся за работу, после которой вам придётся стричься.",
      en: "First we look and do a strand test. Sometimes the honest answer is: “you can't bleach today, two months of recovery first.” We'll say it straight and give a step-by-step plan with a price for each. We don't take on work that would leave you needing a haircut.",
    },
  },
  {
    q: { ru: "Как записаться?", en: "How do I book?" },
    a: {
      ru: "Онлайн на сайте: выбираете услугу, мастера и время — свободные окна видно сразу, переписываться и звонить не нужно. Если удобнее голосом — оставьте телефон в форме, перезвоним и подберём слот.",
      en: "Online on the site: choose a service, a master and a time — free slots are shown at once, no messaging or calls needed. If you prefer voice — leave your phone in the form and we'll call back and find a slot.",
    },
  },
  {
    q: { ru: "Можно ли вызвать мастера на выезд?", en: "Can the master come to me?" },
    a: {
      ru: "Да. Работаем на выезде по Новороссийску и региону, по договорённости — по России и за рубежом. Приезжаем домой, в отель или на площадку со своим светом и косметикой.",
      en: "Yes. We work on location across Novorossiysk and the region, and by arrangement across Russia and abroad. We come to your home, a hotel or the venue with our own lighting and cosmetics.",
    },
  },
  {
    q: { ru: "Сколько держится макияж и укладка?", en: "How long do the makeup and hair last?" },
    a: {
      ru: "Весь день и вечер — от сборов до последнего кадра. Мы работаем в городе с норд-остом, солнцем и морем, поэтому подбираем стойкие текстуры с запасом, а не по идеальной погоде.",
      en: "All day and evening — from the morning prep to the last frame. We work in a city with the Nord-Ost wind, sun and sea, so we pick long-wear textures with a margin, not for perfect weather.",
    },
  },
  {
    q: { ru: "Делаете ли пробный образ перед свадьбой?", en: "Do you do a trial look before the wedding?" },
    a: {
      ru: "Да, и это главная страховка вашего утра. На репетиции мы фиксируем результат фотографиями с нескольких ракурсов, вы утверждаете образ — и в день свадьбы повторяем его точно. Никакой импровизации в шесть утра.",
      en: "Yes, and it's the main insurance for your morning. At the trial we capture the result in photos from several angles, you approve the look — and on the wedding day we repeat it exactly. No improvising at six a.m.",
    },
  },
  {
    q: { ru: "Нужна ли предоплата и можно ли перенести?", en: "Is a deposit required and can I reschedule?" },
    a: {
      ru: "Небольшая предоплата закрепляет за вами время мастера. Перенести или отменить можно заранее — напишите, подберём другое время. Заболел ребёнок или сдвинулась дата прихода судна — это нормальная жизнь, мы идём навстречу.",
      en: "A small deposit secures the master's time for you. You can reschedule or cancel in advance — just message us and we'll find another time. A sick child or a shifted ship arrival date — that's normal life, and we'll meet you halfway.",
    },
  },
];

function Card({
  it,
  index,
  started,
  open,
  onToggle,
}: {
  it: Item;
  index: number;
  started: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const { lang } = useLang();
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      className={`block w-full rounded-[20px] border p-6 text-left transition-[opacity,transform,background-color,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:p-7 ${
        open
          ? "border-[#3B0D1A] bg-[#3B0D1A] shadow-[0_18px_50px_rgba(59,13,26,0.35)]"
          : "border-[#17191a]/12 bg-white hover:border-[#3B0D1A]/40"
      }`}
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "none" : "translateY(20px)",
        transitionDelay: started ? `${index * 70}ms` : "0ms",
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <span
          className={`font-serif text-[18px] leading-snug transition-colors duration-300 lg:text-[21px] ${
            open ? "text-[#f4efe6]" : "text-[#2a2320]"
          }`}
        >
          {it.q[lang]}
        </span>
        {/* Круглый шеврон */}
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open ? "border-transparent bg-[#f4efe6] text-[#3B0D1A]" : "border-[#17191a]/20 bg-white text-[#3B0D1A]"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Ответ */}
      <div className="grid overflow-hidden transition-all duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="min-h-0">
          <p
            className="pt-4 text-[12.5px] font-light leading-relaxed text-[#f4efe6]/80 transition-[opacity] duration-500 lg:text-[13.5px]"
            style={{ opacity: open ? 1 : 0 }}
          >
            {it.a[lang]}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function Faq() {
  const { lang } = useLang();
  const en = lang === "en";
  const [started, setStarted] = useState(false);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (idx: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        // максимум 2 открытых — закрываем самую раннюю
        if (next.size >= 2) next.delete(next.values().next().value as number);
        next.add(idx);
      }
      return next;
    });

  const mid = Math.ceil(ITEMS.length / 2);
  const cols = [ITEMS.slice(0, mid), ITEMS.slice(mid)];

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        {/* Заголовок слева + подзаголовок */}
        <div className="mb-14 max-w-2xl lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "FAQ" : "Вопросы"}
          </span>
          <h2 className="mt-5 font-display text-[30px] font-normal uppercase tracking-[0.05em] leading-[1.12] text-[#3B0D1A] lg:text-[44px]">
            {en ? "Answers to your" : "То, о чём неудобно"}
            <br />
            <span className="text-[#4A4B33]">{en ? "questions about us" : "спрашивать вслух"}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#17191a]/55 lg:text-[16px]">
            {en
              ? "Didn't find your answer? Leave a request — we'll sort out your case."
              : "Отвечаем честно, включая случаи, когда мы говорим «нет». Не нашли свой вопрос — напишите, разберём вашу ситуацию до записи."}
          </p>
        </div>

        {/* Две колонки карточек */}
        <div ref={gridRef} className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {cols.map((col, c) => (
            <div key={c} className="flex flex-col gap-4 lg:gap-5">
              {col.map((it, i) => {
                const idx = c * mid + i;
                return (
                  <Card key={it.q.ru} it={it} index={idx} started={started} open={openSet.has(idx)} onToggle={() => toggle(idx)} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
