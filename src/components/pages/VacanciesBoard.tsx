"use client";
// ВАКАНСИИ (страница «Вакансии») — по документу заказчицы: два направления с переключателем
// «Салон красоты» / «Консьерж-сервис». Для каждого: «Карьера в …», описание, «Мы предлагаем»,
// «Как откликнуться», открытые позиции (раскрываются: задачи и требования) и анкета кандидата
// с вопросами из документа. Пункты меню /team#salon и /team#international открывают нужную вкладку.
// Анкета уходит в CRM (тип «vacancy»).
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";
import { CAREER, type Dir, type Field } from "@/lib/vacancies";

const TABS: { id: Dir; label: string }[] = [
  { id: "salon", label: "Салон красоты" },
  { id: "concierge", label: "Консьерж-сервис" },
];

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((x) => (
        <li key={x} className="flex gap-3 text-[13px] leading-[1.55] text-[#17191a]/75 sm:text-[14px]">
          <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#17191a]/50" />
          {x}
        </li>
      ))}
    </ul>
  );
}

// only — показать одно направление без переключателя (страница консьержа: only="concierge")
export default function VacanciesBoard({ only }: { only?: Dir } = {}) {
  const { lang } = useLang();
  const [dir, setDir] = useState<Dir>(only ?? "salon");
  const [open, setOpen] = useState<number | null>(null);
  const data = CAREER[dir];

  // Меню «Вакансии → …» и ссылки с хэшем переключают направление
  useEffect(() => {
    if (only) return;
    const go = () => {
      const h = location.hash;
      if (h === "#international" || h === "#concierge") setDir("concierge");
      else if (h === "#salon") setDir("salon");
      else return;
      setOpen(null);
      document.getElementById("vacancies")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [only]);

  return (
    <section id={only ? "career" : "vacancies"} className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        {/* Переключатель направлений */}
        {!only && (
        <div className="flex justify-center">
          <div className="relative inline-grid grid-cols-2 rounded-full bg-[#f6f4f1] p-1">
            <span
              aria-hidden
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#17191a] transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{ transform: dir === "concierge" ? "translateX(100%)" : "none" }}
            />
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setDir(t.id); setOpen(null); }}
                aria-pressed={dir === t.id}
                className={`relative z-10 rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] transition-colors duration-500 sm:px-8 sm:text-[12px] ${dir === t.id ? "text-white" : "text-[#17191a]/60 hover:text-[#17191a]"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        )}

        <div key={dir} className="animate-[vac-in_.6s_cubic-bezier(.22,.61,.36,1)]">
          {/* Карьера в … — описание, «Мы предлагаем», «Как откликнуться» */}
          <div className={`${only ? "" : "mt-10 lg:mt-14"} grid gap-6 lg:grid-cols-2 lg:gap-10`}>
            <div>
              <h2 className="text-[#17191a]">{data.title}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {data.intro.map((p) => (
                  <p key={p} className="!text-[13px] leading-[1.65] text-[#17191a]/70 sm:!text-[15px]">{p}</p>
                ))}
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#17191a]/50">{data.howTitle}</p>
              <p className="mt-2 !text-[13px] leading-[1.65] text-[#17191a]/70 sm:!text-[14px]">{data.how}</p>
            </div>
            <div className="rounded-[20px] bg-[#f6f4f1] p-6 sm:p-8">
              <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#17191a]/50">{data.offerTitle}</p>
              <List items={data.offer} />
            </div>
          </div>

          {/* Открытые позиции */}
          <h3 className="mt-12 text-center !text-[18px] text-[#17191a] lg:mt-16 lg:!text-[22px]">Открытые позиции</h3>
          <div className="mt-6 flex flex-col gap-2 sm:gap-3">
            {data.positions.map((p, i) => {
              const isOpen = open === i;
              return (
                <div key={p.title} className={`overflow-hidden rounded-[20px] border bg-white transition-[border-color,box-shadow] duration-500 ${isOpen ? "border-[#17191a]/20 shadow-[0_24px_60px_-28px_rgba(23,25,26,0.22)]" : "border-[#17191a]/12 hover:border-[#17191a]/20 hover:shadow-[0_24px_60px_-28px_rgba(23,25,26,0.22)]"}`}>
                  <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                    <span className="min-w-0">
                      <span className="block font-display text-[13px] uppercase leading-[1.15] tracking-[0.01em] text-[#17191a] transition-all duration-300 group-hover:translate-x-2 sm:text-[19px] lg:text-[24px]">{p.title}</span>
                      {p.lead && <span className="mt-2 hidden max-w-[80ch] text-[12.5px] text-[#2a2320]/55 sm:block lg:text-[13.5px]">{p.lead}</span>}
                    </span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${isOpen ? "rotate-45 border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/25 text-[#17191a] group-hover:border-[#17191a]"}`}>
                      <span aria-hidden className="text-[18px] font-light leading-none">+</span>
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="grid gap-6 border-t border-[#17191a]/10 px-5 py-6 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-8">
                        {p.lead && <p className="!text-[13px] leading-[1.6] text-[#17191a]/70 sm:hidden md:col-span-2">{p.lead}</p>}
                        <div>
                          <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#17191a]/50">Задачи</p>
                          <List items={p.tasks} />
                        </div>
                        <div>
                          <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#17191a]/50">Требования</p>
                          <List items={p.reqs} />
                        </div>
                        <a href="#join" className="flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:w-fit sm:px-10 md:col-span-2">
                          Заполнить анкету
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {data.note && <p className="mx-auto mt-6 max-w-[70ch] text-center !text-[12.5px] leading-[1.6] text-[#17191a]/60 sm:!text-[14px]">{data.note}</p>}

          {/* Международная команда (консьерж) */}
          {data.extra && (
            <div className="mt-10 rounded-[28px] border border-[#17191a]/[0.06] bg-white p-6 shadow-[0_24px_50px_-28px_rgba(23,25,26,0.35)] sm:p-10 lg:mt-14 lg:p-12">
              <h3 className="!text-[18px] text-[#17191a] lg:!text-[22px]">{data.extra.title}</h3>
              {data.extra.text && <p className="mt-3 max-w-[90ch] !text-[13px] leading-[1.65] text-[#17191a]/70 sm:!text-[14px]">{data.extra.text}</p>}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {data.extra.blocks.map((bl) => (
                  <div key={bl.title}>
                    <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#17191a]/50">{bl.title}</p>
                    <List items={bl.items} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* key — при смене направления анкета начинается заново */}
        <ApplyForm key={dir} dir={dir} lang={lang} />
      </div>
      <style>{`@keyframes vac-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}

// АНКЕТА КАНДИДАТА — вопросы из документа заказчицы, по разделам
function ApplyForm({ dir, lang }: { dir: Dir; lang: "ru" | "en" }) {
  const data = CAREER[dir];
  const [v, setV] = useState<Record<string, string | string[]>>({});
  const [consent, setConsent] = useState(false);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const all: Field[] = data.form.flatMap((s) => s.fields);
  const filled = (f: Field) => {
    const x = v[f.key];
    if (f.type === "phone") return phoneComplete(String(x || ""));
    return Array.isArray(x) ? x.length > 0 : !!String(x || "").trim();
  };
  const missing = all.filter((f) => f.required && !filled(f));
  const ok = missing.length === 0 && consent;

  const field = "h-[46px] w-full rounded-[14px] bg-[#f6f4f1] px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 focus:ring-1 focus:ring-[#17191a]/25 sm:h-[48px] sm:rounded-[16px] sm:px-5";

  const submit = () => {
    setTried(true);
    if (!ok) {
      document.getElementById(`f-${missing[0]?.key}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const details: Record<string, unknown> = { Направление: dir === "salon" ? "Салон красоты" : "Консьерж-сервис" };
    for (const f of all) { const x = v[f.key]; if (x && (Array.isArray(x) ? x.length : String(x).trim())) details[f.label] = Array.isArray(x) ? x.join(", ") : x; }
    void sendLead({ kind: "vacancy", name: String(v.name || ""), phone: String(v.phone || ""), details });
    setSent(true);
  };

  return (
    <div id="join" className="mt-12 scroll-mt-28 rounded-[22px] border border-[#17191a]/[0.06] bg-white px-4 py-7 shadow-[0_24px_50px_-28px_rgba(23,25,26,0.35)] sm:rounded-[28px] sm:px-10 sm:py-12 lg:mt-16 lg:px-20 lg:py-14">
      <h2 className="text-[#17191a]">Анкета кандидата</h2>
      <p className="mt-3 max-w-[80ch] !text-[12.5px] leading-[1.6] text-[#17191a]/65 sm:!text-[14px]">{data.formIntro}</p>

      {sent ? (
        <div className="py-10 text-center">
          <span aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#17191a] text-[20px] text-white">✓</span>
          <p className="mt-5 font-display text-[18px] sm:text-[22px]">Спасибо!</p>
          <p className="mx-auto mt-2 max-w-[40ch] !text-[13px] text-[#17191a]/65">Мы получили вашу анкету. Каждая заявка рассматривается лично — мы свяжемся с вами.</p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-10">
            {data.form.map((sec) => (
              <fieldset key={sec.title}>
                <legend className="mb-4 font-display text-[13px] uppercase tracking-[0.06em] text-[#17191a] sm:text-[15px]">{sec.title}</legend>
                <div className="grid gap-4 md:grid-cols-2">
                  {sec.fields.map((f) => {
                    const bad = tried && f.required && !filled(f);
                    const wide = f.type === "textarea" || f.type === "multi" || !!f.note || f.label.length > 60;
                    return (
                      <label key={f.key} id={`f-${f.key}`} className={`flex flex-col gap-1.5 ${wide ? "md:col-span-2" : ""}`}>
                        <span className={`text-[11.5px] leading-[1.4] sm:text-[12.5px] ${bad ? "text-[#b42318]" : "text-[#17191a]/70"}`}>
                          {f.label}{f.required ? " *" : ""}
                        </span>
                        {f.type === "phone" ? (
                          <PhoneField lang={lang} value={String(v[f.key] || "")} onChange={(x) => setV({ ...v, [f.key]: x })} className="!bg-[#f6f4f1]" />
                        ) : f.type === "textarea" ? (
                          <textarea rows={3} value={String(v[f.key] || "")} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} className={`${field} h-auto py-3`} />
                        ) : f.type === "select" ? (
                          <div className="flex flex-wrap gap-2">
                            {f.options!.map((o) => (
                              <button key={o} type="button" onClick={() => setV({ ...v, [f.key]: o })} className={`rounded-[12px] border px-3.5 py-2.5 text-[12px] transition-colors sm:text-[13px] ${v[f.key] === o ? "border-[#17191a] bg-[#17191a] text-white" : "border-transparent bg-[#f6f4f1] text-[#17191a] hover:border-[#17191a]/30"}`}>
                                {o}
                              </button>
                            ))}
                          </div>
                        ) : f.type === "multi" ? (
                          <div className="flex flex-wrap gap-2">
                            {f.options!.map((o) => {
                              const cur = (v[f.key] as string[]) || [];
                              const on = cur.includes(o);
                              return (
                                <button key={o} type="button" onClick={() => setV({ ...v, [f.key]: on ? cur.filter((x) => x !== o) : [...cur, o] })} className={`rounded-[12px] border px-3.5 py-2.5 text-[12px] transition-colors sm:text-[13px] ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-transparent bg-[#f6f4f1] text-[#17191a] hover:border-[#17191a]/30"}`}>
                                  {o}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <input type={f.type === "email" ? "email" : f.type === "date" ? "date" : "text"} value={String(v[f.key] || "")} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} className={field} />
                        )}
                        {f.note && <span className="text-[11px] leading-[1.5] text-[#17191a]/50 sm:text-[12px]">{f.note}</span>}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <label className="mt-8 flex cursor-pointer items-start gap-2.5">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
            <span className={`text-[12px] sm:text-[13px] ${tried && !consent ? "text-[#b42318]" : "text-[#17191a]/60"}`}>
              Даю согласие на обработку <a href="/policy" className="underline underline-offset-2">персональных данных</a> *
            </span>
          </label>
          {tried && !ok && <p className="mt-3 text-[12px] text-[#b42318]">Заполните, пожалуйста, обязательные поля, отмеченные звёздочкой.</p>}
          <button type="button" onClick={submit} className="mt-5 flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-4 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:w-fit sm:px-14 sm:text-[12px]">
            Отправить заявку
          </button>
        </>
      )}
    </div>
  );
}
