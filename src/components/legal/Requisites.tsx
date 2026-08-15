// Блок реквизитов оператора/продавца — общий для всех юридических страниц.
import { COMPANY } from "@/lib/legal";

const ROWS: [string, string][] = [
  ["Полное наименование", COMPANY.fullName],
  ["Сокращённое наименование", COMPANY.shortName],
  ["Адрес регистрации", COMPANY.regAddress],
  ["Адрес ведения деятельности", COMPANY.bizAddress],
  ["Электронная почта", COMPANY.email],
  ["Телефон", COMPANY.phone],
  ["ИНН", COMPANY.inn],
  ["ОГРНИП", COMPANY.ogrnip],
  ["Дата присвоения ОГРНИП", COMPANY.ogrnipDate],
  ["Банк", COMPANY.bank],
  ["БИК", COMPANY.bik],
  ["Корреспондентский счёт", COMPANY.corrAccount],
  ["Расчётный счёт", COMPANY.account],
  ["ОКВЭД", COMPANY.okved],
  ["Система налогообложения", COMPANY.taxSystem],
];

export default function Requisites() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#17191a]/10">
      <table className="w-full border-collapse text-[14px]">
        <tbody>
          {ROWS.map(([k, v], i) => (
            <tr key={k} className={i % 2 ? "bg-[#f7f4ee]" : "bg-white"}>
              <th className="w-[46%] border-b border-[#17191a]/8 px-4 py-3 text-left align-top font-medium text-[#17191a]/60">
                {k}
              </th>
              <td className="border-b border-[#17191a]/8 px-4 py-3 align-top text-[#17191a]">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
