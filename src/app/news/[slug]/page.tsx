import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import { NewsArticle } from "@/components/news/NewsView";
import { NEWS } from "@/lib/news";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = NEWS.find((x) => x.slug === slug);
  if (!n) return {};
  return { title: `${n.title.ru} — ÁLIS BEAUTY`, description: n.excerpt.ru, openGraph: { images: [n.image] } };
}

export default async function NewsItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = NEWS.find((x) => x.slug === slug);
  if (!n) notFound();

  return (
    <main>
      <ScrollReveal />
      <Header />
      <TeamIntro title={n.title} photo={n.image} />
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        <NewsArticle n={n} />
      </div>
      <Footer />
    </main>
  );
}
