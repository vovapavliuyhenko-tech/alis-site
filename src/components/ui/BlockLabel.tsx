"use client";
// ПОДПИСЬ БЛОКА — маленькая строка капсом в квадратных скобках над блоком без заголовка,
// например «[ НАМ ДОВЕРЯЮТ ]». Ставится в странице прямо перед блоком: берёт на себя его
// верхний отступ (см. .block-label в globals.css), поэтому подпись стоит вплотную к блоку.
import { useLang } from "@/lib/i18n";

export default function BlockLabel({ ru, en }: { ru: string; en: string }) {
  const { lang } = useLang();
  return (
    <p className="block-label r-reveal bg-white text-center text-[10.5px] uppercase tracking-[0.2em] text-[#17191a]/45 lg:text-[11px]">
      [ {lang === "en" ? en : ru} ]
    </p>
  );
}
