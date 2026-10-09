"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { IMAGES } from "@/lib/images";
import { GhostCta, IconButton, RESERVE_HREF, SectionHead } from "./ui";
import { Reveal } from "./reveal";

const TOURS = [
  {
    name: "Bigi Pan",
    meta: "2 tot 3 dagen",
    from: "vanaf €160 p.p.",
    body: "Uitvaren over de lagune, hangmatten boven het water, en zonsondergangen tussen de vogels.",
    img: IMAGES.tours[0],
  },
  {
    name: "Paramaribo City Tour",
    meta: "1 dag",
    from: "vanaf €30 p.p.",
    body: "Het houten centrum, de centrale markt en de waterkant, met een gids die de verhalen kent.",
    img: IMAGES.tours[1],
  },
  {
    name: "Dolfijnen",
    meta: "1 dag",
    from: "vanaf €30 p.p.",
    body: "Uitvaren op de monding van de Commewijne en Guyanadolfijnen spotten terwijl de lucht kleurt.",
    img: IMAGES.tours[2],
  },
  {
    name: "Jaw Jaw",
    meta: "2 tot 3 dagen",
    from: "vanaf €225 p.p.",
    body: "Met de korjaal de Boven-Suriname op, slapen in een marrondorp, zwemmen bij de sula's.",
    img: IMAGES.tours[3],
  },
];

/*
 * Endless loop: the tour list is rendered three times in a row (previous,
 * real, next). Scrolling stays within the middle copy; when the user crosses
 * into a neighbouring copy, we silently jump back by exactly one list length
 * (no animation), which is invisible because the copies are identical.
 */
const LOOP = 3;
const SPAN = TOURS.length; // cards per copy

export function Tours() {
  const track = useRef<HTMLUListElement>(null);

  const loopJump = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    const copy = (card.clientWidth + gap) * SPAN;
    // If we've drifted into a neighbour copy, silently jump back one copy
    // length. Invisible, because all three copies are identical.
    if (el.scrollLeft < copy * 0.5) {
      el.scrollLeft += copy;
    } else if (el.scrollLeft > copy * 2.5 - el.clientWidth) {
      el.scrollLeft -= copy;
    }
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // Start centred on the middle copy.
    const card = el.querySelector("li");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    if (card) {
      el.scrollLeft = (card.clientWidth + gap) * SPAN;
    }
    el.addEventListener("scroll", loopJump, { passive: true });
    return () => el.removeEventListener("scroll", loopJump);
  }, [loopJump]);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // Exactly one card per nudge: card width + the flex gap.
    const card = el.querySelector("li");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 20;
    const step = card ? card.clientWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="tours" className="scroll-mt-20 bg-paper-2 overflow-hidden py-12 lg:py-16">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-10">
        <Reveal className="lg:col-span-12">
          <SectionHead
            kicker="04 — Tours"
            title="Tours met gidsen die er zelf wonen."
            intro="Van een stadswandeling tot meerdaagse reizen het binnenland in. Altijd met een gids uit de streek."
          />
        </Reveal>
      </div>

      {/* One unified carousel block: exactly one tour centred, with small
          peeks of the neighbours on both sides. Each nudge moves precisely
          one card (card width + gap). */}
      <div className="relative mt-8 lg:mt-10">
        {/* tabIndex/aria make the overflow region keyboard-scrollable with the
            arrow keys, and screen readers announce it as a list to operate. */}
        <ul
          ref={track}
          tabIndex={0}
          aria-label="Tours, scrollbare lijst"
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 focus-visible:outline-offset-[-4px] max-lg:px-[calc(50%-36vw)] sm:max-lg:px-[calc(50%-28vw)] lg:px-[calc(50%-18rem)]"
        >
          {Array.from({ length: LOOP }, (_, copyIndex) =>
            TOURS.map((t, i) => (
              <li
                key={`${copyIndex}-${i}`}
                aria-hidden={copyIndex !== 1 || undefined}
                className="w-[72vw] shrink-0 snap-center sm:w-[56vw] lg:w-[36rem]"
              >
              <Link href={RESERVE_HREF} className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={t.img.src}
                    alt={t.img.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 24rem"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-full bg-aqua px-3 py-1 text-[0.76rem] font-medium text-aqua-ink">
                    {t.meta}
                  </span>
                  <span className="font-display text-[0.95rem] text-orange">
                    {t.from}
                  </span>
                </div>

                <div className="mt-2.5 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl leading-snug tracking-tight text-ink">
                    {t.name}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-orange transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </div>
                <p className="mt-1.5 line-clamp-2 text-[0.9rem] leading-relaxed text-ink-soft">
                  {t.body}
                </p>
              </Link>
              </li>
            )),
          )}
        </ul>

        {/* Edge arrows — vertically centred on the image band, half overlapping
            the track edge. Hidden on touch-first small screens (swipe there).
            The loop is endless, so the arrows never disable. */}
        <div className="pointer-events-none absolute inset-y-16 left-0 right-0 hidden items-center justify-between px-3 sm:flex lg:px-4">
          <div className="pointer-events-auto">
            <IconButton
              label="Vorige tours"
              onClick={() => nudge(-1)}
              className="border-paper bg-paper/90 shadow-md backdrop-blur-sm hover:bg-paper"
            >
              <ArrowLeft size={18} />
            </IconButton>
          </div>
          <div className="pointer-events-auto">
            <IconButton
              label="Volgende tours"
              onClick={() => nudge(1)}
              className="border-paper bg-paper/90 shadow-md backdrop-blur-sm hover:bg-paper"
            >
              <ArrowRight size={18} />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-container px-4 sm:px-6 lg:px-10">
        <GhostCta href={RESERVE_HREF}>Reserveren</GhostCta>
      </div>
    </section>
  );
}
