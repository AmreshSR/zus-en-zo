"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import type { Img } from "@/lib/images";
import { EASE } from "./motion";

/*
 * Table of contents, magazine-style: each chapter is a full-width row with a
 * giant outlined numeral, name and one-liner. On hover (desktop) a floating
 * image card follows the cursor. Rows are the anchors to the sections below.
 */
export function Index({
  chapters,
  id,
}: {
  id: string;
  chapters: { href: string; num: string; name: string; note: string; img: Img }[];
}) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      id={id}
      className="relative scroll-mt-20"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      <ul className="border-t border-line-strong">
        {chapters.map((c, i) => (
          <li key={c.href} className="border-b border-line-strong">
            <Link
              href={c.href}
              className="group relative block py-6 sm:py-8"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="mx-auto flex max-w-container items-center gap-5 px-4 sm:gap-10 sm:px-6 lg:px-10">
                <span
                  aria-hidden="true"
                  className="chapter-numeral hidden shrink-0 text-[4.5rem] transition-colors duration-300 group-hover:text-orange sm:block sm:text-[6rem]"
                >
                  {c.num}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.5rem] leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    {c.name}
                  </span>
                  <span className="mt-1.5 block max-w-[52ch] text-[0.9rem] leading-relaxed text-ink-soft sm:text-[0.95rem]">
                    {c.note}
                  </span>
                </span>
                <ArrowUpRight
                  size={30}
                  weight="light"
                  className="shrink-0 text-orange transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating image preview — desktop only, follows the cursor. */}
      <AnimatePresence>
        {hover !== null && !reduce && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="pointer-events-none fixed z-40 hidden h-52 w-72 overflow-hidden rounded-lg lg:block"
            style={{
              left: pos.x + 28,
              top: pos.y - 104,
            }}
          >
            <Image
              src={chapters[hover].img.src}
              alt=""
              fill
              sizes="288px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
