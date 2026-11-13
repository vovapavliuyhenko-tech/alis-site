const fs=require("fs");const f="src/components/pages/PhotoMarquee.tsx";let s=fs.readFileSync(f,"utf8");
const R=(a,b)=>{if(!s.includes(a))throw new Error("miss "+a.slice(0,40));s=s.replace(a,b)};
R("<span aria-hidden className={`text-[14px] transition-transform duration-500 ${open ? \"rotate-45\" : \"\"}`}>+</span>",
"<span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[17px] font-light leading-none text-[#17191a] shadow-[0_2px_10px_rgba(0,0,0,.15)] transition-transform duration-500 group-hover:scale-110 sm:h-9 sm:w-9 ${open ? \"rotate-45\" : \"\"}`}>+</span>");
R("className={`${back.text ? \"mt-5\" : \"mt-auto\"} flex items-center gap-2 border-t border-[#17191a]/12 pt-4 text-[10.5px] uppercase tracking-[0.16em] text-[#17191a] transition-opacity duration-300 hover:opacity-60 sm:text-[11.5px]`}\n            >\n              <span aria-hidden>→</span>\n              {back.cta.label[lang]}",
"className={`${back.text ? \"mt-5\" : \"mt-auto\"} flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#17191a] bg-[#17191a] px-3 py-3 text-center text-[10px] font-medium uppercase leading-tight tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[11px]`}\n            >\n              {back.cta.label[lang]}");
fs.writeFileSync(f,s);
