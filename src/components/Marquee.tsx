// Static label + scrolling interest strip. Items render twice so translateX(-50%)
// lands exactly where the first sequence began, yielding a seamless loop.

const SEPARATOR = "·";
// Soft fade-in/fade-out at the left/right edges of the scrolling area so items
// don't pop in/out abruptly against the label.
const SCROLL_MASK =
  "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)";

export function Marquee({
  items,
  label,
  speedSeconds = 30,
}: {
  items: readonly string[];
  label?: string;
  speedSeconds?: number;
}) {
  if (items.length === 0) return null;
  const sequence = [...items, ...items];

  return (
    <section
      aria-label={label ?? "Currently obsessed with"}
      className="w-full border-y border-[var(--border)] bg-[var(--surface)] py-4 mt-24 md:mt-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-14 flex items-center gap-4">
        {label && (
          <span className="shrink-0 text-sm text-[var(--muted)] italic">
            {label}
          </span>
        )}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage: SCROLL_MASK,
            WebkitMaskImage: SCROLL_MASK,
          }}
        >
          <div
            className="marquee-track flex w-max whitespace-nowrap will-change-transform"
            style={{ animation: `marquee ${speedSeconds}s linear infinite` }}
          >
            {sequence.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center text-sm text-[var(--muted)]"
              >
                {item}
                <span className="mx-5 opacity-60" aria-hidden>
                  {SEPARATOR}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
