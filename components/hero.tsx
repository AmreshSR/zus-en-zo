"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMAGES } from "@/lib/images";
import { Gallery } from "./gallery";
import { PrimaryCta, GhostCta } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // The hero image sinks slightly slower than the page — a window you scroll
  // "out of" rather than a block that just slides away.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section ref={ref} id="top" className="relative">
      <div className="mx-auto max-w-[1400px] px-4 pt-28 sm:px-6 lg:px-10 lg:pt-36">
        <motion.p
          {...rise(0.05)}
          className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-orange"
        >
          Paramaribo, Suriname
        </motion.p>

        <motion.h1
          {...rise(0.13)}
          className="mt-5 max-w-[11ch] text-balance font-display text-[3rem] leading-[0.98] tracking-tight text-ink sm:text-[4.5rem] lg:text-[6.5rem]"
        >
          Eten, tours &amp; kamers onder{" "}
          <span className="em-italic text-orange">één oud dak</span>.
        </motion.h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10">
          <motion.div {...rise(0.24)} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryCta href="#reserveren">Reserveren</PrimaryCta>
            <GhostCta href="#inhoud">Ontdek het pand</GhostCta>
          </motion.div>

          <motion.p
            {...rise(0.3)}
            className="max-w-[38ch] text-[0.95rem] leading-relaxed text-ink-soft lg:ml-10"
          >
            Grand café, guesthouse en reisbureau in het historische houten pand
            tegenover de Palmentuin.
          </motion.p>
        </div>
      </div>

      {/* Full-bleed image window that sinks slower than the page while scrolling away. */}
      <motion.figure
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className="relative mt-12 aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]"
      >
        <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-0 scale-[1.15]">
          <Gallery images={IMAGES.heroSet} sizes="100vw" preloadFirst />
        </motion.div>
      </motion.figure>
    </section>
  );
}

