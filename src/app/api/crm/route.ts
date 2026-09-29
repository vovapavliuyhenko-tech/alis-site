// API панели CRM (/crm). Пароль — в теле POST (не в адресе: адрес попадает в логи).
import { NextResponse } from "next/server";
import { checkPassword, dbConfigured, listLeads, updateLead } from "@/lib/crm";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Неверный формат" }, { status: 400 });
  }
  if (!process.env.CRM_PASSWORD) return NextResponse.json({ error: "Пароль CRM не задан (нет CRM_PASSWORD)" }, { status: 503 });
  if (!checkPassword(body.token)) return NextResponse.json({ error: "Неверный пароль" }, { status: 403 });
  if (!dbConfigured()) return NextResponse.json({ error: "База данных не подключена (нет DATABASE_URL)" }, { status: 503 });

  try {
    if (body.action === "list") {
      const r = await listLeads({
        q: body.q as string,
        status: body.status as string,
        kind: body.kind as string,
        from: body.from as string,
        to: body.to as string,
        limit: body.limit as number,
        offset: body.offset as number,
      });
      return NextResponse.json(r);
    }
    if (body.action === "update") {
      await updateLead(String(body.id), {
        status: body.status as string | undefined,
        note: body.note as string | undefined,
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Неизвестное действие" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
