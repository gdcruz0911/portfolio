import { ContactSection } from "@/components/ContactSection";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { personalInfo } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: personalInfo.about,
};

const ACCENT = "#1763a0";

export default function AboutPage() {
  return (
    <div
      className="pb-16"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <PageHeader eyebrow="About" title="A little about me." accent={ACCENT} />

      <section className="max-w-2xl text-lg leading-relaxed text-[var(--foreground)] border-t border-[var(--border)] pt-12">
        <p>
          i&rsquo;m currently studying at the university of virginia and
          spending most of my free time learning the parts of the stack i
          don&rsquo;t know yet. if you&rsquo;re working on something
          interesting or just want to chat, my inbox is open.
        </p>
      </section>

      <section className="mt-20 grid gap-12 md:grid-cols-3 border-t border-[var(--border)] pt-12">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--muted)] mb-3">
            currently
          </p>
          <p>studying at the university of virginia</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--muted)] mb-3">
            building with
          </p>
          <p>TypeScript, React, Next.js, Python</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--muted)] mb-3">
            off the keyboard
          </p>
          <p>cafés, film photography, volleyball</p>
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
