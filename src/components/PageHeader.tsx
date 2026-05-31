export function PageHeader({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** Optional hex color for the eyebrow text. Falls back to muted. */
  accent?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-16 md:pt-24 pb-10 md:pb-16">
      {eyebrow && (
        <p
          className="text-sm font-medium uppercase tracking-[0.18em] mb-4"
          style={{ color: accent ?? "var(--muted)" }}
        >
          {eyebrow}
        </p>
      )}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
        {title}
      </h1>
      {children && (
        <div className="mt-6 max-w-2xl text-lg text-[var(--muted)] leading-relaxed">
          {children}
        </div>
      )}
    </header>
  );
}
