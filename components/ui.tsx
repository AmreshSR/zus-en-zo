import Link from "next/link";
import type { ReactNode } from "react";
import { RESERVATION_MAILTO } from "@/lib/site";

/* One corner-radius system: pill for interactive, --radius-md for surfaces. */

export function PrimaryCta({
  href,
  children,
  className = "",
  inverse = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[0.95rem] font-medium tracking-tight transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
        (inverse ? "bg-orange-ink text-orange " : "bg-orange text-orange-ink ") +
        className
      }
    >
      {children}
    </Link>
  );
}

export function GhostCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={
        // border-line-strong is a registered Tailwind v4 utility (see the
        // @theme block in globals.css) — no inline-style fallback needed.
        "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-transparent px-6 text-[0.95rem] font-medium tracking-tight text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/[0.04] motion-reduce:transition-none " +
        className
      }
    >
      {children}
    </Link>
  );
}

/** Circular icon-only control (carousel arrows, menu toggle, social buttons). */
export function IconButton({
  label,
  onClick,
  disabled = false,
  children,
  className = "",
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={
        "grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:bg-ink/[0.04] disabled:pointer-events-none disabled:opacity-35 " +
        className
      }
    >
      {children}
    </button>
  );
}

/** The reservation CTA used everywhere: prefilled mailto until the real form ships. */
export const RESERVE_HREF = RESERVATION_MAILTO;

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-orange">
      {children}
    </span>
  );
}

import { Reveal } from "./reveal";

/*
 * Consistent section header: orange kicker + big display title on the left,
 * short intro paragraph on the right (desktop). Gives every section the same
 * recognisable opening beat so the page reads as distinct chapters.
 */
export function SectionHead({
  kicker,
  title,
  intro,
  className = "",
  onDark = false,
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Reveal
      className={`grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12 ${className}`}
    >
      <div className="lg:col-span-7">
        <span
          className={`text-[0.74rem] font-medium uppercase tracking-[0.22em] ${
            onDark ? "text-orange-ink/80" : "text-orange"
          }`}
        >
          {kicker}
        </span>
        <h2
          className={`mt-4 max-w-[16ch] text-balance font-display text-[2.2rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.7rem] ${
            onDark ? "text-orange-ink" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {intro && (
        <p
          className={`max-w-[44ch] self-end text-[1rem] leading-relaxed lg:col-span-4 lg:col-start-9 lg:text-[1.05rem] ${
            onDark ? "text-orange-ink/90" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
