"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/*
 * Scroll-triggered parallax: the wrapped media drifts vertically (and can
 * slightly scale) as the section scrolls through the viewport. Subtle by
 * design — max ±6% of the block height — and collapses to static under
 * reduced motion. Wrap it around the positioned media box, not inside it.
 */
export function Parallax({
  children,
  className = "",
  amount = 24,
}: {
  children: ReactNode;
  className?: string;
  /** Max drift in px at the extremes. */
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Ease the travel a touch: slower entering, settles as it centres.
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [amount, 0, -amount]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
