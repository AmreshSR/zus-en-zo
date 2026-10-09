import { IMAGES } from "@/lib/images";
import { Gallery } from "./gallery";
import { PrimaryCta } from "./ui";
import { Reveal } from "./reveal";
import { Wave } from "./wave";
import { Parallax } from "./parallax";

const DISHES = [
  { name: "Ontbijt", note: "Vers brood, fruit en sterke koffie, vanaf 09:00 in de tuin." },
  { name: "Lunch", note: "Broodjes, roti, salades en Surinaamse klassiekers." },
  { name: "Diner", note: "Surinaams, Europees en Caribisch door elkaar. Vega en vegan ook." },
  { name: "Zoet & borrel", note: "Taart, een verse jus of een Parbo, tot 21:00." },
];

/*
 * THE colour block. One warm light theme page-wide; this orange band is the
 * single deliberate colour-block beat, bordered top and bottom by the brand
 * wave. Used once. Do not add a second inverted section.
 */
export function FoodSpread() {
  return (
    <section id="menu" className="scroll-mt-20 bg-orange text-orange-ink">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal
              as="figure"
              className="relative order-2 aspect-[16/11] w-full overflow-hidden rounded-lg lg:order-2 lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-[26rem]"
            >
              <Parallax className="absolute inset-0" amount={20}>
                <Gallery
                  images={IMAGES.foodSet}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  interval={6500}
                />
              </Parallax>
            </Reveal>

            <Reveal className="order-1 lg:order-1 lg:col-span-5">
              <span className="text-[0.74rem] font-medium uppercase tracking-[0.22em] text-orange-ink/80">
                02 — Grand café
              </span>
              <h2 className="mt-4 font-display text-[2.4rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.8rem]">
                Surinaams, Europees en Caribisch door elkaar.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-orange-ink">
                Elke dag open van 09:00 tot 21:00, met een hele grote tuin.
                Ontbijten, lunchen, dineren of gewoon chillen. Vega en vegan ook.
              </p>

              <ul className="mt-10 divide-y divide-orange-ink/20 border-y border-orange-ink/20">
                {DISHES.map((d) => (
                  <li
                    key={d.name}
                    className="grid grid-cols-[9rem_1fr] gap-4 py-4 sm:grid-cols-[11rem_1fr]"
                  >
                    <span className="font-display text-lg text-orange-ink">
                      {d.name}
                    </span>
                    <span className="text-[0.92rem] leading-relaxed text-orange-ink/90">
                      {d.note}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <PrimaryCta href="#reserveren" inverse>
                  Reserveren
                </PrimaryCta>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
  );
}
