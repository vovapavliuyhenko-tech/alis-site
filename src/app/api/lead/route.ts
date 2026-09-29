// Приём заявок со всех форм сайта → CRM (таблица crm_leads) + уведомление в Telegram.
import { NextResponse } from "next/server";
import { dbConfigured, saveLead } from "@/lib/crm";

export const runtime = "nodejs";

// Простая защита от спама: не больше 8 заявок в минуту с одного адреса
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 8;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ error: "Слишком много заявок, попробуйте через минуту" }, { status: 429 });
  if (!dbConfigured()) return NextResponse.json({ error: "CRM не подключена" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат" }, { status: 400 });
  }
  // Скрытое поле-ловушка для ботов: люди его не видят и не заполняют
  if (body.website) return NextResponse.json({ ok: true });

  const phone = String(body.phone ?? "").replace(/\D/g, "");
  // Заказ из корзины уходит без контактов (их клиент пишет в мессенджере) — его принимаем
  if (phone.length < 10 && !body.name && body.kind !== "shop") return NextResponse.json({ error: "Нужны имя или телефон" }, { status: 400 });

  try {
    const id = await saveLead({
      kind: String(body.kind ?? "other"),
      name: String(body.name ?? ""),
      phone,
      company: String(body.company ?? ""),
      details: (body.details as Record<string, unknown>) || {},
    });
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
