import { personalInfo, socialLinks } from "@/data/content";

const footerLinks = [
  {
    label: "email",
    text: personalInfo.email,
    href: socialLinks.email,
    accent: "#F4A6A0", // coral
    external: false,
  },
  {
    label: "github",
    text: "GitHub",
    href: socialLinks.github,
    accent: "#93C5FD", // pastel blue
    external: true,
  },
  {
    label: "linkedin",
    text: "LinkedIn",
    href: socialLinks.linkedin,
    accent: "#86EFAC", // pastel green
    external: true,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p className="text-sm text-[var(--muted)]">
          © {year} {personalInfo.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                style={
                  { "--link-accent": link.accent } as React.CSSProperties
                }
                className="text-[var(--muted)] hover:text-[var(--foreground)] underline decoration-transparent hover:[text-decoration-color:var(--link-accent)] underline-offset-[6px] decoration-2 transition-all"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
