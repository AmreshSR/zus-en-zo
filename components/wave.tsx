/*
 * The brand wave. Systematised version of the hand-drawn orange divider from
 * the current site. `fill` follows `currentColor`, so the wrapper sets the colour.
 */
export function Wave({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      className={`block h-[clamp(28px,5vw,64px)] w-full ${className}`}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M0,46 C140,12 260,10 400,40 C540,70 620,78 760,52 C900,26 1030,20 1200,50 L1200,90 L0,90 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/*
 * Section divider: transitions between two background colours using the brand
 * wave — no straight lines anywhere. `from` is the section above, `to` the
 * section below. At a top edge the wave (unflipped) fills the bottom with `to`;
 * at a bottom edge the flipped wave fills the top with `from`.
 */
export function SectionDivider({
  from,
  to,
  bottom = false,
}: {
  from: string;
  to: string;
  bottom?: boolean;
}) {
  return (
    <div className={from} aria-hidden="true">
      <div className={to}>
        <Wave flip={bottom} className="-mb-px -mt-px" />
      </div>
    </div>
  );
}

/*
 * Endless ticker band. Pure CSS animation (see .marquee-track in globals.css);
 * the phrase is rendered twice and the track slides -50%, so the loop is
 * seamless. Static under reduced motion.
 */
export function Marquee({
  phrase,
  className = "",
}: {
  phrase: string;
  className?: string;
}) {
  const run = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="mx-6 inline-flex items-center gap-6">
      {phrase}
      <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-current opacity-60" />
    </span>
  ));
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <div className="marquee-track inline-flex items-center">
        <span className="inline-flex items-center font-display text-[1.05rem] font-semibold uppercase tracking-[0.18em]">
          {run}
        </span>
        <span className="inline-flex items-center font-display text-[1.05rem] font-semibold uppercase tracking-[0.18em]">
          {run}
        </span>
      </div>
    </div>
  );
}
