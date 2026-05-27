// Static "currently obsessed with" strip. (Kept the filename for now to avoid a
// rename — the component used to be an auto-scrolling marquee.)

export function Marquee({
  items,
  label,
}: {
  items: readonly string[];
  label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section
      aria-label={label ?? "Currently obsessed with"}
      className="w-full border-y border-[var(--border)] bg-white/40 py-4 mt-24 md:mt-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        {label && (
          <span className="text-[var(--muted)] italic">{label} —</span>
        )}
        <ul className="flex flex-wrap items-center gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--border)] bg-white/70 text-[var(--foreground)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
