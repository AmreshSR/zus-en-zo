import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { Index } from "@/components/index";
import { Story } from "@/components/story";
import { FoodSpread } from "@/components/food-spread";
import { Guesthouse } from "@/components/guesthouse";
import { Tours } from "@/components/tours";
import { Visit } from "@/components/visit";
import { SiteFooter } from "@/components/site-footer";
import { SectionDivider } from "@/components/wave";
import { IMAGES } from "@/lib/images";

const CHAPTERS = [
  {
    href: "#menu",
    num: "01",
    name: "Grand café",
    note: "Surinaams, Europees en Caribisch door elkaar. Elke dag van 09:00 tot 21:00, met een hele grote tuin.",
    img: IMAGES.worldRestaurant,
  },
  {
    href: "#kamers",
    num: "02",
    name: "Kamers",
    note: "Vijf simpele kamers op de tweede verdieping, vanaf €15 per nacht. 's Ochtends loop je zo naar beneden voor je ontbijt.",
    img: IMAGES.worldGuesthouse,
  },
  {
    href: "#tours",
    num: "03",
    name: "Tours",
    note: "Ruim 25 tours en workshops door heel Suriname — van stadswandeling tot meerdaagse reizen het binnenland in.",
    img: IMAGES.worldTours,
  },
  {
    href: "#over-ons",
    num: "04",
    name: "Over ons",
    note: "Restaurant, reisbureau en guesthouse in één historisch pand, tegenover de Palmentuin.",
    img: IMAGES.worldCulture,
  },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      {/* Target of the skip link in layout.tsx. */}
      <main id="main" className="flex-1">
        <Hero />
        <SectionDivider from="bg-paper" to="bg-paper-2" />
        <Index id="inhoud" chapters={CHAPTERS} />
        <SectionDivider from="bg-paper-2" to="bg-aqua" bottom />
        <Story />
        <SectionDivider from="bg-aqua" to="bg-orange" />
        <FoodSpread />
        <SectionDivider from="bg-orange" to="bg-paper" />
        <Guesthouse />
        <SectionDivider from="bg-paper" to="bg-paper-2" />
        <Tours />
        <SectionDivider from="bg-paper-2" to="bg-aqua" bottom />
        <Visit />
      </main>
      <SiteFooter />
    </>
  );
}
