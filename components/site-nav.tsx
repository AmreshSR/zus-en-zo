"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/site";
import { IconButton, PrimaryCta, RESERVE_HREF } from "./ui";
import { EASE } from "./motion";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Only flip state when the boolean actually changes — a raw `v > 24` on
  // every motion frame would re-render the header up to 120×/s while scrolling.
  useMotionValueEvent(scrollY, "change", (v) =>
    setScrolled((prev) => (prev === v > 24 ? prev : v > 24)),
  );

  // Escape closes the mobile menu; body scroll is locked while it's open so
  // the page behind can't drift under the fixed header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
        (scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent")
      }
    >
      <div className="mx-auto flex h-16 max-w-container items-center px-4 sm:px-6 lg:px-10">
        <Link
          href="#top"
          aria-label="Zus & Zo, naar boven"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Image
            src="/logo.png"
            alt="Zus & Zo"
            width={456}
            height={194}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav
          aria-label="Hoofdnavigatie"
          className="hidden items-center gap-7 lg:flex lg:justify-center lg:flex-1"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.9rem] tracking-tight text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden lg:block">
          <PrimaryCta href={RESERVE_HREF} className="h-10 px-5 text-[0.9rem]">
            Reserveren
          </PrimaryCta>
        </div>

        <IconButton
          label={open ? "Menu sluiten" : "Menu openen"}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto h-10 w-10 lg:hidden"
        >
          {/* Both icons stay mounted; toggling visibility avoids the icon
              remounting on every open/close. */}
          <span aria-hidden="true" className={open ? "hidden" : "contents"}>
            <List size={18} weight="bold" />
          </span>
          <span aria-hidden="true" className={open ? "contents" : "hidden"}>
            <X size={18} weight="bold" />
          </span>
        </IconButton>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <nav aria-label="Mobiele navigatie" className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 font-display text-lg text-ink hover:bg-ink/[0.04]"
                >
                  {l.label}
                </Link>
              ))}
              <PrimaryCta href={RESERVE_HREF} className="mt-3 w-full">
                Reserveren
              </PrimaryCta>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
