import { Brushstroke } from "@/components/Brushstroke";

export function PageHeader({ title }: { title: string }) {
  return <header className="page-header">
    <h1>{title}</h1>
    <Brushstroke />
  </header>;
}
