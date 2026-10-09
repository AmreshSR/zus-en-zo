import { IMAGES } from "@/lib/images";
import { Gallery } from "./gallery";
import { Reveal } from "./reveal";
import { SectionHead } from "./ui";
import { Parallax } from "./parallax";
import { Marquee } from "./wave";

export function Story() {
  return (
    <section id="over-ons" className="scroll-mt-20 bg-aqua text-ink">
      <div className="text-aqua-2" aria-hidden="true">
        <Marquee phrase="Sinds altijd in de Grote Combéweg" className="py-4" />
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-32">
        <div className="lg:col-span-12">
          <SectionHead
            kicker="01 — Over ons"
            title={
              <>
                Geen concept.{" "}
                <span className="em-italic text-orange">Gewoon zo gegroeid.</span>
              </>
            }
          />
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-1">
          <div className="max-w-[52ch] space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              Zus &amp; Zo zit in een historisch houten pand in hartje Paramaribo,
              tegenover de Palmentuin. Beneden een grand café met een grote tuin,
              boven vijf simpele kamers om te blijven slapen.
            </p>
            <p>
              Restaurant, reisbureau en guesthouse: op papier staat het los van
              elkaar. In het pand loopt het gewoon in elkaar over. Je komt voor
              een lunch en boekt bij het afrekenen een tour het binnenland in.
            </p>
          </div>
        </Reveal>

        <Reveal className="relative min-h-[20rem] lg:col-span-4 lg:col-start-9 lg:min-h-0">
          <Parallax className="absolute inset-0 overflow-hidden rounded-lg" amount={18}>
            <Gallery
              images={IMAGES.storySet}
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </Parallax>
        </Reveal>

        <Reveal className="lg:col-span-8 lg:col-start-1">
          <div className="border-t border-line-strong pt-8">
            <p className="max-w-[40ch] font-display text-2xl leading-snug tracking-tight text-ink sm:text-[1.9rem] lg:text-[2.3rem]">
              Eén minuut naar de Wakapasi, vijf naar de markt en de waterkant.
              Vanaf het vliegveld is het zo&apos;n 80 minuten rijden, en we halen
              je ook op.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

