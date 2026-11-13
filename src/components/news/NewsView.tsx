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

// МИНИМАЛИЗМ И ВОЗДУХ: без рамок, теней и тёмных плашек — фото, тонкая строка «рубрика · дата»,
// заголовок и тихая ссылка «Читать →». Много пустого пространства между новостями.
function Line({ n, lang }: { n: NewsItem; lang: Lang }) {
  return (
    <p className="text-[10.5px] uppercase tracking-[0.16em] text-[#17191a]/45">
      {catLabel(n.cat, lang)} <span aria-hidden className="mx-1.5">·</span> {fmtDate(n.date, lang)}
    </p>
  );
}

// Карточка новости
export function NewsCard({ n }: { n: NewsItem }) {
  const { lang } = useLang();
  const href = `/news/${n.slug}`;
  return (
    <article className="group flex flex-col">
      <Link href={href} className="block overflow-hidden rounded-[20px] bg-[#f2f1ee]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={n.image} alt={n.title[lang]} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col pt-5 lg:pt-6">
        <Line n={n} lang={lang} />
        <h3 className="mt-3 !text-[16px] font-normal leading-[1.3] text-[#17191a] lg:!text-[19px]">
          <Link href={href}>{n.title[lang]}</Link>
        </h3>
        <Link href={href} className="mt-4 inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#17191a]/60 transition-colors hover:text-[#17191a]">
          {lang === "en" ? "Read" : "Читать"}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

// Новость в ленте — без плашки: крупное фото и рядом много воздуха с коротким текстом.
// flip — фото справа, текст слева (в ленте стороны чередуются)
function NewsFeature({ n, flip = false }: { n: NewsItem; flip?: boolean }) {
  const { lang } = useLang();
  const href = `/news/${n.slug}`;
  return (
    <article className={`group grid items-center gap-8 lg:gap-20 ${flip ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}>
      <Link href={href} className={`block overflow-hidden rounded-[28px] bg-[#f2f1ee] ${flip ? "lg:order-2" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={n.image} alt={n.title[lang]} className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] lg:aspect-[5/4]" />
      </Link>
      <div className={`max-w-[520px] ${flip ? "lg:order-1 lg:justify-self-end" : ""}`}>
        <Line n={n} lang={lang} />
        <h2 className="mt-5 !text-[22px] font-normal leading-[1.25] text-[#17191a] sm:!text-[26px] lg:!text-[32px]">
          <Link href={href}>{n.title[lang]}</Link>
        </h2>
        <p className="mt-5 !text-[13px] leading-[1.7] text-[#17191a]/55 sm:!text-[14px]">{n.excerpt[lang]}</p>
        <Link href={href} className="mt-8 inline-flex items-center gap-3 border-b border-[#17191a]/25 pb-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[#17191a] transition-colors hover:border-[#17191a]">
          {lang === "en" ? "Read" : "Читать"}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

export function NewsGrid() {
  const { lang } = useLang();
  return (
    // Без обложки: отступ сверху под фиксированную шапку; много воздуха между блоками
    <section className="pb-10 pt-[120px] min-[1280px]:pt-[150px] min-[1680px]:pt-[180px]">
      <div className="mx-auto w-[92%] max-w-[1440px]">
        <h1 className="sr-only">{lang === "en" ? "ÁLIS BEAUTY news" : "Новости ÁLIS BEAUTY"}</h1>
        {/* Все новости — крупным форматом, фото и текст меняются сторонами */}
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-32">
          {NEWS.map((n, i) => (
            <NewsFeature key={n.slug} n={n} flip={i % 2 === 1} />
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
            <span className="text-[#17191a]">{catLabel(n.cat, lang)}</span>
          </nav>
          <Meta n={n} lang={lang} />
          <p className="mt-6 !text-[17px] leading-relaxed text-[#17191a] lg:!text-[19px]">{n.excerpt[lang]}</p>

          <div className="mt-8 space-y-5 border-t border-[#17191a]/10 pt-8">
            {n.content.map((b, i) =>
              b.type === "h2" ? (
                <h2 key={i} className="!mt-10 text-[#17191a]">{b.text[lang]}</h2>
              ) : b.type === "quote" ? (
                <blockquote key={i} className="rounded-[12px] bg-[#f6f4f1] px-6 py-5 text-[15px] leading-relaxed text-[#17191a] shadow-[inset_3px_0_0_#17191a]">
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
            className="mt-10 inline-flex items-center justify-center rounded-xl border border-[#17191a] bg-[#17191a] px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] hover:backdrop-blur-md"
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
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
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
