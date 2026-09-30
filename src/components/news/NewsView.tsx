"use client";
// Новости ÁLIS BEAUTY — по образцу блога PALOMA: сетка карточек (первая — крупная, на 2 колонки),
// страница новости с обложкой, текстом, галереей и «Читайте также».
// Без r-reveal: карточки перерисовываются при смене рубрики, а ScrollReveal сканирует только при монтировании.
import Link from "next/link";
import { useLang, type Lang } from "@/lib/i18n";
import { NEWS, NEWS_CATS, YCLIENTS, type NewsItem } from "@/lib/news";

const catLabel = (c: NewsItem["cat"], lang: Lang) => NEWS_CATS.find((x) => x.id === c)?.label[lang] ?? "";

function fmtDate(iso: string, lang: Lang) {
  return new Date(iso + "T12:00:00").toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function Meta({ n, lang }: { n: NewsItem; lang: Lang }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#17191a]/50">
      <time dateTime={n.date}>{fmtDate(n.date, lang)}</time>
      <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-[#17191a]/30" />
      <span>{lang === "en" ? `${n.read} min read` : `${n.read} мин чтения`}</span>
    </div>
  );
}

export function NewsCard({ n, large = false }: { n: NewsItem; large?: boolean }) {
  const { lang } = useLang();
  const href = `/news/${n.slug}`;
  return (
    <article className={`group flex flex-col overflow-hidden rounded-[16px] border border-[#46131E]/40 transition-colors duration-300 hover:border-[#46131E] ${large ? "lg:col-span-2" : ""}`}>
      <Link href={href} className="relative block overflow-hidden bg-[#f2f1ee]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={n.image}
          alt={n.title[lang]}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${large ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]"}`}
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/15 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {catLabel(n.cat, lang)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5 lg:px-6 lg:pb-6">
        <Meta n={n} lang={lang} />
        <h3 className={`mt-3 !text-[18px] text-[#17191a] ${large ? "lg:!text-[24px]" : "lg:!text-[20px]"}`}>
          <Link href={href} className="transition-colors hover:text-[#46131E]">{n.title[lang]}</Link>
        </h3>
        <p className="mt-2.5 max-w-[640px] !text-[14px] leading-relaxed text-[#17191a]/65">{n.excerpt[lang]}</p>
        <Link href={href} className="group/link mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[12px] uppercase tracking-[0.14em] text-[#46131E]">
          {lang === "en" ? "Read" : "Читать"}
          <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

export function NewsGrid() {
  const { lang } = useLang();
  return (
    // Без обложки: отступ сверху под фиксированную шапку
    <section className="pt-[112px] min-[1280px]:pt-[128px] min-[1680px]:pt-[150px]">
      <h1 className="sr-only">{lang === "en" ? "ÁLIS BEAUTY news" : "Новости ÁLIS BEAUTY"}</h1>
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {NEWS.map((n, i) => (
            <NewsCard key={n.slug} n={n} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsArticle({ n }: { n: NewsItem }) {
  const { lang } = useLang();
  const related = NEWS.filter((x) => x.slug !== n.slug).slice(0, 3);
  const cta = n.cta ?? { label: { ru: "Оформить визит", en: "Book a visit" }, href: YCLIENTS };
  const ext = cta.href.startsWith("http");

  return (
    <>
      <article className="section-y">
        <div className="mx-auto w-[92%] max-w-[760px]">
          <nav aria-label={lang === "en" ? "Breadcrumbs" : "Навигация"} className="mb-6 flex flex-wrap items-center gap-2 text-[12px] text-[#17191a]/50">
            <Link href="/" className="transition-colors hover:text-[#17191a]">{lang === "en" ? "Home" : "Главная"}</Link>
            <span aria-hidden>/</span>
            <Link href="/news" className="transition-colors hover:text-[#17191a]">{lang === "en" ? "News" : "Новости"}</Link>
            <span aria-hidden>/</span>
            <span className="text-[#46131E]">{catLabel(n.cat, lang)}</span>
          </nav>
          <Meta n={n} lang={lang} />
          <p className="mt-6 !text-[17px] leading-relaxed text-[#17191a] lg:!text-[19px]">{n.excerpt[lang]}</p>

          <div className="mt-8 space-y-5 border-t border-[#17191a]/10 pt-8">
            {n.content.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i} className="!mt-10 text-[#17191a]">{b.text[lang]}</h2>
              ) : b.type === "quote" ? (
                <blockquote key={i} className="rounded-[12px] bg-[#f6f4f1] px-6 py-5 text-[15px] leading-relaxed text-[#17191a] shadow-[inset_3px_0_0_#46131E]">
                  {b.text[lang]}
                </blockquote>
              ) : (
                <p key={i} className="!text-[15px] leading-[1.75] text-[#17191a]/75">{b.text[lang]}</p>
              ),
            )}
          </div>

          <a
            href={cta.href}
            {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="alis-pulse-wine mt-10 inline-flex items-center justify-center rounded-xl border border-[#46131E] bg-[#46131E] px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#46131E] hover:backdrop-blur-md"
          >
            {cta.label[lang]}
          </a>
        </div>
      </article>

      {n.gallery?.length ? (
        <section className="gap-top">
          <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {n.gallery.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={n.title[lang]} loading="lazy" className="aspect-[3/4] w-full rounded-[12px] object-cover last:max-lg:hidden" />
            ))}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="section-y">
          <div className="mx-auto w-[96%] max-w-[1760px]">
            <div className="mb-8 flex items-baseline justify-between gap-6 lg:mb-10">
              <h2 className="text-[#17191a]">{lang === "en" ? "Read also" : "Читайте также"}</h2>
              <Link href="/news" className="group shrink-0 text-[13px] text-[#17191a]/60 transition-colors hover:text-[#17191a]">
                {lang === "en" ? "All news" : "Все новости"} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
              {related.map((r) => (
                <NewsCard key={r.slug} n={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
