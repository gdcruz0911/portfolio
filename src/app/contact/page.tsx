import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { personalInfo, socialLinks } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${personalInfo.name}.`,
};

const ACCENT = "#C4B5FD"; // pastel lavender (page accent)

const links = [
  {
    label: "Email",
    value: personalInfo.email,
    href: socialLinks.email,
    accent: "#C4B5FD", // lavender
  },
  {
    label: "GitHub",
    value: "@gdcruz0911",
    href: socialLinks.github,
    accent: "#C4B5FD", // lavender
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jgdcruz",
    href: socialLinks.linkedin,
    accent: "#C4B5FD", // lavender
  },
];

export default function ContactPage() {
  return (
    <div
      className="pb-16"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <PageHeader eyebrow="Contact" title="Let&rsquo;s talk." accent={ACCENT}>
        Got an idea, a project, or just want to say hi? The fastest way to
        reach me is email — but pick whatever works.
      </PageHeader>

      <ul className="border-t border-[var(--border)]">
        {links.map((link) => (
          <li
            key={link.label}
            className="border-b border-[var(--border)] group"
            style={{ "--link-accent": link.accent } as React.CSSProperties}
          >
            <a
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noreferrer noopener"
              className="flex items-baseline justify-between gap-6 py-6 md:py-8 transition-colors"
            >
              <span
                className="text-2xl md:text-4xl font-semibold tracking-tight transition-colors group-hover:[color:var(--link-accent)]"
              >
                {link.label}
              </span>
              <span className="text-sm text-[var(--muted)] flex items-center gap-2">
                <span className="hidden sm:inline">{link.value}</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
