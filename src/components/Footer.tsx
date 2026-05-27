import { personalInfo, socialLinks } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-sm text-[var(--muted)]">
          © {year} {personalInfo.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <a
              href={socialLinks.email}
              className="hover:text-[var(--foreground)] text-[var(--muted)] transition-colors"
            >
              {personalInfo.email}
            </a>
          </li>
          <li>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[var(--foreground)] text-[var(--muted)] transition-colors"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-[var(--foreground)] text-[var(--muted)] transition-colors"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
