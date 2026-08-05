import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* Следующие секции (about, projects, services, footer) — в разработке */}
      <section className="flex h-[40vh] items-center justify-center text-white/40">
        секции ниже — в процессе клонирования
      </section>
    </main>
  );
}
