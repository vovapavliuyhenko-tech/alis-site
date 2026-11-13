// МИНИМАЛИСТИЧНАЯ КНОПКА-СТРОКА во всю ширину контейнера: тонкая рамка, текст капсом слева,
// стрелка справа. При наведении рамка темнеет, стрелка сдвигается. Используется под галереей
// («Посмотреть услуги») и под отзывами («Поделиться своими впечатлениями…»).
export default function LineCta({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  return (
    <div className="mx-auto mt-8 w-[96%] max-w-[1760px] lg:mt-10">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center justify-between gap-4 rounded-[14px] border border-[#17191a] bg-[#17191a] px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:bg-white hover:text-[#17191a] sm:px-7 sm:py-5 sm:text-[12px]"
      >
        <span>{label}</span>
        <span aria-hidden className="text-[15px] transition-transform duration-500 group-hover:translate-x-1.5">→</span>
      </a>
    </div>
  );
}
