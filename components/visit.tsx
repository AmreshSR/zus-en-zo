import { MapPin, Clock, Phone } from "@phosphor-icons/react/dist/ssr";
import { CONTACT, RESERVATION_MAILTO } from "@/lib/site";
import { PrimaryCta, SectionHead } from "./ui";
import { Reveal } from "./reveal";

const INFO = [
  {
    icon: MapPin,
    title: "Adres",
    lines: [CONTACT.street, `${CONTACT.locality}, ${CONTACT.country}`],
    note: "Tegenover de Palmentuin, één minuut lopen naar de Wakapasi en het uitgaanscentrum.",
  },
  {
    icon: Clock,
    title: "Open",
    lines: [`Grand café dagelijks ${CONTACT.openingHours}`, "Ontbijt, lunch, diner of chillen"],
    note: "Surinaamse, Europese en Caribische keuken. Vega en vegan ook.",
  },
  {
    icon: Phone,
    title: "Contact",
    lines: [CONTACT.phoneDisplay, CONTACT.email],
    note: "We halen je ook op van de luchthaven, zo'n 80 minuten rijden.",
  },
];

const OPTIONS = [
  ["Een tafel", "Voor ontbijt, lunch of diner in het grand café. Groepen op aanvraag."],
  ["Een tour", "Van een halve dag stadstour tot meerdaagse reizen het binnenland in."],
  ["Een kamer", "Vijf kamers op de tweede verdieping van het historische pand, vanaf €15."],
];

export function Visit() {
  return (
    <section id="contact" className="scroll-mt-20 bg-aqua py-16 lg:py-24">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-10">
        <SectionHead
          kicker="Contact"
          title="Kom langs, of plan vooruit."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
          {INFO.map((item) => (
            <Reveal key={item.title} className="border-t border-line-strong pt-5">
              <item.icon size={22} weight="light" className="text-orange" />
              <h3 className="mt-3 font-display text-lg text-ink">{item.title}</h3>
              <div className="mt-2 space-y-0.5 text-[0.95rem] text-ink">
                {item.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                {item.note}
              </p>
            </Reveal>
          ))}
        </div>

        <div
          id="reserveren"
          className="mt-20 scroll-mt-20 rounded-lg bg-paper-2 p-6 sm:p-10 lg:p-14"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h3 className="font-display text-2xl leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.4rem]">
                Reserveren gaat via één bericht.
              </h3>
              <p className="mt-5 max-w-[42ch] text-[0.98rem] leading-relaxed text-ink-soft">
                Schrijf wat je zoekt en voor welke datum. We antwoorden meestal
                dezelfde dag, in het Nederlands of Engels.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Prefilled subject + body template (see lib/site.ts). */}
                <PrimaryCta href={RESERVATION_MAILTO}>Reserveren</PrimaryCta>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-6 text-[0.95rem] font-medium tracking-tight text-ink transition-colors hover:bg-ink/[0.04]"
                >
                  Bel {CONTACT.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-6 lg:col-start-7">
              <dl className="divide-y divide-line-strong border-y border-line-strong">
                {OPTIONS.map(([term, desc]) => (
                  <div key={term} className="py-5">
                    <dt className="font-display text-lg text-ink">{term}</dt>
                    <dd className="mt-1 max-w-[46ch] text-[0.92rem] leading-relaxed text-ink-soft">
                      {desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
