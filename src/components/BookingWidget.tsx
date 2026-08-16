"use client";
// ОНЛАЙН-ЗАПИСЬ ALIS (собственный движок, прототип). Шаги: услуга → мастер →
// дата → свободное время → контакты → подтверждение. Свободные слоты считаются
// из графика мастера минус уже занятые брони. Данные — localStorage (общий с
// админкой /admin). Стиль — под сайт (белый фон, бордовые акценты).
import { useEffect, useMemo, useState } from "react";
import {
  Booking,
  Store,
  freeSlots,
  loadStore,
  localISO,
  saveStore,
  uid,
  fmtPrice,
  fmtDuration,
} from "@/lib/booking-store";

const MONTHS = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];
const WD = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

type Step = 0 | 1 | 2 | 3 | 4; // услуга, мастер, дата+время, контакты, успех

export default function BookingWidget() {
  const [store, setStore] = useState<Store | null>(null);
  const [step, setStep] = useState<Step>(0);

  const [serviceId, setServiceId] = useState<string | null>(null);
  const [masterId, setMasterId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  // календарь
  const today = new Date();
  const [vy, setVy] = useState(today.getFullYear());
  const [vm, setVm] = useState(today.getMonth());

  useEffect(() => {
    const sync = () => setStore(loadStore());
    sync();
    window.addEventListener("alis-booking-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("alis-booking-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const service = store?.services.find((s) => s.id === serviceId) || null;
  const master = store?.masters.find((m) => m.id === masterId) || null;

  const mastersForService = useMemo(
    () => (store && serviceId ? store.masters.filter((m) => m.serviceIds.includes(serviceId)) : []),
    [store, serviceId]
  );

  const slots = useMemo(
    () => (store && masterId && serviceId && date ? freeSlots(store, masterId, serviceId, date) : []),
    [store, masterId, serviceId, date]
  );

  const slotGroups = useMemo(() => {
    const g: { label: string; items: string[] }[] = [
      { label: "Утро", items: [] },
      { label: "День", items: [] },
      { label: "Вечер", items: [] },
    ];
    for (const t of slots) {
      const h = Number(t.slice(0, 2));
      if (h < 12) g[0].items.push(t);
      else if (h < 17) g[1].items.push(t);
      else g[2].items.push(t);
    }
    return g.filter((x) => x.items.length);
  }, [slots]);

  if (!store) {
    return (
      <section id="online" className="scroll-mt-24 bg-white py-24 lg:py-32">
        <div className="mx-auto w-[94%] max-w-[1120px] text-center text-[#17191a]/50">Загрузка…</div>
      </section>
    );
  }

  const reset = () => {
    setStep(0);
    setServiceId(null);
    setMasterId(null);
    setDate(null);
    setTime(null);
    setName("");
    setPhone("");
  };

  const confirm = () => {
    if (!masterId || !serviceId || !date || !time) return;
    const b: Booking = {
      id: uid(),
      masterId,
      serviceId,
      date,
      time,
      name: name.trim(),
      phone: phone.trim(),
      createdAt: Date.now(),
    };
    const next = { ...store, bookings: [...store.bookings, b] };
    saveStore(next);
    setStore(next);
    setLastBooking(b);
    setStep(4);
  };

  // --- построение календаря месяца ---
  const firstWd = (new Date(vy, vm, 1).getDay() + 6) % 7; // Пн=0
  const daysInMonth = new Date(vy, vm + 1, 0).getDate();
  const todayISO = localISO(today);
  const cells: (string | null)[] = [];
  for (let i = 0; i < firstWd; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(localISO(new Date(vy, vm, d)));

  const prevMonth = () => {
    if (vm === 0) { setVy(vy - 1); setVm(11); } else setVm(vm - 1);
  };
  const nextMonth = () => {
    if (vm === 11) { setVy(vy + 1); setVm(0); } else setVm(vm + 1);
  };

  const dayHasSchedule = (iso: string) => {
    if (!master) return true;
    const wd = (new Date(iso + "T00:00:00").getDay() + 6) % 7;
    return master.week[wd]?.on;
  };

  const canConfirm = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 6;

  return (
    <section
      id="online"
      className="relative scroll-mt-24 bg-white bg-fixed bg-cover bg-center py-24 lg:py-32"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.62), rgba(255,255,255,0.62)), url(/assets/tild3236-393__.jpg)",
      }}
    >
      {/* Растушёвка верха и низа — бесшовный стык с соседними блоками */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      <div className="relative mx-auto w-[94%] max-w-[1120px]">
        {/* Заголовок */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#4A4B33] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            онлайн-запись
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-[#17191a] lg:text-[48px]">
            Запишитесь <span className="text-[#3B0D1A]">онлайн</span>
          </h2>
        </div>

        <div className="rounded-[26px] border border-[#17191a]/10 bg-white p-6 shadow-[0_10px_40px_rgba(23,25,26,0.06)] lg:p-10">
          {/* Шаги-хлебные крошки */}
          {step < 4 && (
            <div className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#17191a]/45">
              <Crumb n={1} label="Услуга" active={step === 0} done={step > 0} onClick={() => setStep(0)} />
              <span>›</span>
              <Crumb n={2} label="Мастер" active={step === 1} done={step > 1} onClick={() => serviceId && setStep(1)} />
              <span>›</span>
              <Crumb n={3} label="Дата и время" active={step === 2} done={step > 2} onClick={() => masterId && setStep(2)} />
              <span>›</span>
              <Crumb n={4} label="Контакты" active={step === 3} done={false} onClick={() => date && time && setStep(3)} />
            </div>
          )}

          {/* Шаг 1 — услуга */}
          {step === 0 && (
            <div>
              <h3 className="mb-6 font-serif text-[24px] text-[#17191a]">Выберите услугу</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {store.services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setServiceId(s.id); setMasterId(null); setDate(null); setTime(null); setStep(1); }}
                    className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                      serviceId === s.id
                        ? "border-[#3B0D1A] bg-[#3B0D1A]/5"
                        : "border-[#17191a]/12 hover:border-[#3B0D1A]/50"
                    }`}
                  >
                    <span>
                      <span className="block text-[15px] text-[#17191a]">{s.title}</span>
                      <span className="mt-0.5 block text-[12px] text-[#17191a]/45">{fmtDuration(s.durationMin)}</span>
                    </span>
                    <span className="shrink-0 font-serif text-[16px] text-[#3B0D1A]">{fmtPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Шаг 2 — мастер */}
          {step === 1 && (
            <div>
              <StepHead onBack={() => setStep(0)} title="Выберите мастера" sub={service?.title} />
              <div className="grid gap-3 sm:grid-cols-2">
                {mastersForService.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setMasterId(m.id); setDate(null); setTime(null); setStep(2); }}
                    className={`flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors ${
                      masterId === m.id ? "border-[#3B0D1A] bg-[#3B0D1A]/5" : "border-[#17191a]/12 hover:border-[#3B0D1A]/50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.photo} alt={m.name} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                    <span>
                      <span className="block text-[15px] text-[#17191a]">{m.name}</span>
                      <span className="mt-0.5 block text-[12px] uppercase tracking-wide text-[#3B0D1A]">{m.role}</span>
                    </span>
                  </button>
                ))}
                {mastersForService.length === 0 && (
                  <p className="text-[14px] text-[#17191a]/50">Пока нет мастеров для этой услуги.</p>
                )}
              </div>
            </div>
          )}

          {/* Шаг 3 — дата + время */}
          {step === 2 && (
            <div>
              <StepHead onBack={() => setStep(1)} title="Дата и время" sub={`${service?.title} · ${master?.name}`} />
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                {/* Календарь */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-serif text-[18px] text-[#17191a]">{MONTHS[vm]} {vy}</span>
                    <div className="flex gap-1">
                      <IconBtn onClick={prevMonth} d="M15 6l-6 6 6 6" />
                      <IconBtn onClick={nextMonth} d="M9 6l6 6-6 6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {WD.map((w) => (
                      <span key={w} className="py-1 text-[11px] uppercase text-[#17191a]/35">{w}</span>
                    ))}
                    {cells.map((iso, i) => {
                      if (!iso) return <span key={i} />;
                      const past = iso < todayISO;
                      const noSched = !dayHasSchedule(iso);
                      const disabled = past || noSched;
                      const selected = date === iso;
                      return (
                        <button
                          key={i}
                          disabled={disabled}
                          onClick={() => { setDate(iso); setTime(null); }}
                          className={`aspect-square rounded-lg text-[14px] transition-colors ${
                            selected
                              ? "bg-[#3B0D1A] text-[#f4efe6]"
                              : disabled
                              ? "text-[#17191a]/20"
                              : "text-[#17191a] hover:bg-[#3B0D1A]/10"
                          }`}
                        >
                          {Number(iso.slice(8, 10))}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Слоты */}
                <div>
                  {!date ? (
                    <p className="mt-2 text-[14px] text-[#17191a]/45">Выберите дату слева.</p>
                  ) : slotGroups.length === 0 ? (
                    <p className="mt-2 text-[14px] text-[#17191a]/45">На эту дату нет свободного времени. Выберите другой день.</p>
                  ) : (
                    <div className="space-y-5">
                      {slotGroups.map((g) => (
                        <div key={g.label}>
                          <p className="mb-2 text-[12px] uppercase tracking-wide text-[#17191a]/40">{g.label}</p>
                          <div className="flex flex-wrap gap-2">
                            {g.items.map((t) => (
                              <button
                                key={t}
                                onClick={() => setTime(t)}
                                className={`rounded-lg border px-3.5 py-2 text-[14px] tabular-nums transition-colors ${
                                  time === t
                                    ? "border-[#3B0D1A] bg-[#3B0D1A] text-[#f4efe6]"
                                    : "border-[#17191a]/15 text-[#17191a] hover:border-[#3B0D1A]/60"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {date && time && (
                    <button
                      onClick={() => setStep(3)}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#3B0D1A] bg-[#3B0D1A] px-6 py-3 text-[13px] font-medium text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A]"
                    >
                      Далее <span aria-hidden>→</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Шаг 4 — контакты */}
          {step === 3 && (
            <div>
              <StepHead onBack={() => setStep(2)} title="Ваши контакты" sub="Свяжемся для подтверждения" />
              <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div>
                  <label className="mb-2 block text-[13px] text-[#17191a]/50">Ваше имя</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    className="mb-6 w-full border-b border-[#17191a]/25 bg-transparent pb-3 text-[16px] text-[#17191a] outline-none focus:border-[#3B0D1A] placeholder:text-[#17191a]/30"
                  />
                  <label className="mb-2 block text-[13px] text-[#17191a]/50">Телефон</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 ___ ___-__-__"
                    className="w-full border-b border-[#17191a]/25 bg-transparent pb-3 text-[16px] text-[#17191a] outline-none focus:border-[#3B0D1A] placeholder:text-[#17191a]/30"
                  />
                  <button
                    onClick={confirm}
                    disabled={!canConfirm}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#3B0D1A] bg-[#3B0D1A] px-6 py-3 text-[13px] font-medium text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[#3B0D1A] disabled:hover:text-[#f4efe6]"
                  >
                    Записаться <span aria-hidden>→</span>
                  </button>
                </div>
                {/* Сводка */}
                <div className="rounded-2xl border border-[#17191a]/10 bg-[#17191a]/[0.02] p-5 text-[14px]">
                  <p className="mb-3 text-[12px] uppercase tracking-wide text-[#17191a]/40">Ваша запись</p>
                  <Row k="Услуга" v={service?.title} />
                  <Row k="Мастер" v={master?.name} />
                  <Row k="Дата" v={date ? fmtDateHuman(date) : ""} />
                  <Row k="Время" v={time || ""} />
                  <div className="mt-3 flex items-baseline justify-between border-t border-[#17191a]/10 pt-3">
                    <span className="text-[#17191a]/60">Стоимость</span>
                    <span className="font-serif text-[18px] text-[#3B0D1A]">{service ? fmtPrice(service.price) : ""}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Шаг 5 — успех */}
          {step === 4 && lastBooking && (
            <div className="flex min-h-[280px] flex-col items-center justify-center py-6 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#3B0D1A]/40">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="#3B0D1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-serif text-[28px] text-[#17191a]">Вы записаны!</h3>
              <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-[#17191a]/60">
                {service?.title} · {master?.name}
                <br />
                {fmtDateHuman(lastBooking.date)}, {lastBooking.time}
              </p>
              <p className="mt-4 text-[13px] text-[#17191a]/45">Свяжемся для подтверждения по телефону {lastBooking.phone}.</p>
              <button onClick={reset} className="mt-8 text-[14px] text-[#17191a]/50 underline underline-offset-4 hover:text-[#17191a]">
                Записаться ещё раз
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-[12px] text-[#17191a]/35">
          График мастеров и цены настраиваются в{" "}
          <a href="/admin" className="text-[#3B0D1A] underline underline-offset-4">админке</a>.
        </p>
      </div>
    </section>
  );
}

function Crumb({ n, label, active, done, onClick }: { n: number; label: string; active: boolean; done: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 ${active ? "text-[#3B0D1A]" : done ? "text-[#17191a]/70" : "text-[#17191a]/40"}`}>
      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${active || done ? "bg-[#3B0D1A] text-[#f4efe6]" : "bg-[#17191a]/10"}`}>{n}</span>
      {label}
    </button>
  );
}

function StepHead({ onBack, title, sub }: { onBack: () => void; title: string; sub?: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17191a]/15 text-[#17191a]/70 transition-colors hover:border-[#3B0D1A] hover:text-[#3B0D1A]" aria-label="Назад">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div>
        <h3 className="font-serif text-[24px] leading-tight text-[#17191a]">{title}</h3>
        {sub && <p className="text-[13px] text-[#17191a]/45">{sub}</p>}
      </div>
    </div>
  );
}

function IconBtn({ onClick, d }: { onClick: () => void; d: string }) {
  return (
    <button onClick={onClick} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#17191a]/15 text-[#17191a]/70 transition-colors hover:border-[#3B0D1A] hover:text-[#3B0D1A]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d={d} strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <span className="text-[#17191a]/50">{k}</span>
      <span className="text-right text-[#17191a]">{v || "—"}</span>
    </div>
  );
}

function fmtDateHuman(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()].toLowerCase()} ${d.getFullYear()}`;
}
