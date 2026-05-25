export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-16 md:pt-24 pb-10 md:pb-16">
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)] mb-4">
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
