import { Brushstroke } from "@/components/Brushstroke";

export function PageHeader({ title, issue }: { title: string; issue?: string }) {
  return <header className="page-header">
    <h1>{title}</h1>
    <Brushstroke />
    {issue && <p className="issue mono">{issue}</p>}
  </header>;
}
