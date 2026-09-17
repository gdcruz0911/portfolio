export function PageHeader({ eyebrow, title, children }: {
  eyebrow?: string;
  title: string;
  accent?: string;
  children?: React.ReactNode;
}) {
  return <header className="page-header">
    {eyebrow && <p>{eyebrow.toLowerCase()}</p>}
    <h1 className="display-type">{title.toLowerCase()}</h1>
    {children && <div className="page-description">{children}</div>}
  </header>;
}
