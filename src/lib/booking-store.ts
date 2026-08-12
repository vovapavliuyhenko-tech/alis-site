// ЯДРО ЗАПИСИ ALIS (прототип): модель данных + расчёт свободных слотов.
// Данные хранятся в localStorage браузера (общий стор для витрины записи и
// админки). Это прототип — данные локальные, не общие между устройствами.
// Замена на реальную БД (Supabase) — следующий шаг.

export type Service = { id: string; title: string; price: number; durationMin: number };
// График на день недели: работает ли, с какого по какое время ("10:00")
export type DaySchedule = { on: boolean; start: string; end: string };
export type Master = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  serviceIds: string[]; // какие услуги делает
  week: DaySchedule[]; // длина 7, индекс 0=Пн … 6=Вс
  stepMin: number; // шаг сетки слотов, мин
};
export type Booking = {
  id: string;
  masterId: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  phone: string;
  createdAt: number;
};
export type Store = { services: Service[]; masters: Master[]; bookings: Booking[] };

const KEY = "alis-booking-v1";
export const ADMIN_PASSWORD = "alis"; // прототип: смените в проде

export const uid = () => Math.random().toString(36).slice(2, 9);

const fullWeek = (start = "10:00", end = "19:00", sundayOff = true): DaySchedule[] =>
  Array.from({ length: 7 }, (_, i) => ({ on: !(sundayOff && i === 6), start, end }));

export function defaultStore(): Store {
  const services: Service[] = [
    { id: "s1", title: "Полный образ", price: 8000, durationMin: 90 },
    { id: "s2", title: "Свадебный образ", price: 10000, durationMin: 120 },
    { id: "s3", title: "Макияж", price: 5000, durationMin: 60 },
    { id: "s4", title: "Укладка", price: 3000, durationMin: 45 },
    { id: "s5", title: "Образ с подбором look", price: 15000, durationMin: 150 },
    { id: "s6", title: "Пробный свадебный образ", price: 8500, durationMin: 90 },
  ];
  const allIds = services.map((s) => s.id);
  const masters: Master[] = [
    {
      id: "m1",
      name: "Дайана Тарзян",
      role: "визажист-стилист",
      photo: "/assets/tild3236-393__.jpg",
      serviceIds: allIds,
      week: fullWeek("10:00", "19:00"),
      stepMin: 30,
    },
    {
      id: "m2",
      name: "Анна",
      role: "визажист",
      photo: "/assets/tild6230-643__.jpg",
      serviceIds: ["s1", "s3", "s4"],
      week: fullWeek("11:00", "20:00"),
      stepMin: 30,
    },
    {
      id: "m3",
      name: "Мария",
      role: "стилист по волосам",
      photo: "/assets/tild3535-313_bergamo.png",
      serviceIds: ["s3", "s4"],
      week: fullWeek("09:00", "18:00"),
      stepMin: 30,
    },
  ];
  return { services, masters, bookings: [] };
}

export function loadStore(): Store {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw) as Store;
    if (!parsed?.services || !parsed?.masters) return defaultStore();
    if (!parsed.bookings) parsed.bookings = [];
    return parsed;
  } catch {
    return defaultStore();
  }
}

export function saveStore(s: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  // уведомляем открытые вкладки/компоненты об изменении
  window.dispatchEvent(new Event("alis-booking-change"));
}

export function resetStore() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("alis-booking-change"));
}

// Локальная дата YYYY-MM-DD без сдвига часового пояса
export function localISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

// Индекс дня недели Пн=0 … Вс=6 из YYYY-MM-DD
export function weekdayIndex(dateISO: string): number {
  const d = new Date(dateISO + "T00:00:00");
  return (d.getDay() + 6) % 7;
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// Свободные слоты мастера под конкретную услугу и дату
export function freeSlots(
  store: Store,
  masterId: string,
  serviceId: string,
  dateISO: string
): string[] {
  const master = store.masters.find((m) => m.id === masterId);
  const service = store.services.find((s) => s.id === serviceId);
  if (!master || !service) return [];
  const day = master.week[weekdayIndex(dateISO)];
  if (!day || !day.on) return [];

  const start = toMin(day.start);
  const end = toMin(day.end);
  const dur = service.durationMin;
  const step = master.stepMin || 30;

  // занятые интервалы этого мастера в этот день
  const occupied = store.bookings
    .filter((b) => b.masterId === masterId && b.date === dateISO)
    .map((b) => {
      const s = store.services.find((x) => x.id === b.serviceId);
      const bs = toMin(b.time);
      return [bs, bs + (s?.durationMin || 60)] as [number, number];
    });

  const now = new Date();
  const todayISO = localISO(now);
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const slots: string[] = [];
  for (let t = start; t + dur <= end; t += step) {
    if (dateISO === todayISO && t <= nowMin) continue; // прошедшее время
    const overlaps = occupied.some(([os, oe]) => t < oe && t + dur > os);
    if (!overlaps) slots.push(toHHMM(t));
  }
  return slots;
}

export const fmtPrice = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;
export const fmtDuration = (min: number) =>
  min >= 60 ? `${Math.floor(min / 60)} ч${min % 60 ? ` ${min % 60} мин` : ""}` : `${min} мин`;
