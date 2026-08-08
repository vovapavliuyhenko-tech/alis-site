import type { Metadata } from "next";
import Header from "@/components/Header";
import TravelForm from "@/components/TravelForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Выезд по России и за рубежом — анкета ALIS",
  description:
    "Оформление выезда мастеров ALIS по России и за рубежом: направление, город, повод, состав услуг, даты и число персон.",
};

export default function VyezdPage() {
  return (
    <>
      <Header />
      <TravelForm />
      <Footer />
    </>
  );
}
