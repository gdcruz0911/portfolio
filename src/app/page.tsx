import Link from "next/link";
import {
  personalInfo,
  projects,
  nowPlayingFallback,
} from "@/data/content";
import { NowPlaying } from "@/components/NowPlaying";

export default function Home() {
  return (
    <div className="pt-20 md:pt-32 pb-16">
      <section className="max-w-4xl">
        <h1 className="text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight">
          {personalInfo.tagline}
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--muted)] leading-relaxed">
          {personalInfo.about}
        </p>
        <div className="mt-10">
          <NowPlaying track={nowPlayingFallback} />
        </div>
      </section>

      <section className="mt-24 md:mt-32 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted)] mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {projects.length > 0
              ? "Recent projects"
              : "Projects are on the way."}
          </h2>
        </div>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-medium"
        >
          <span className="relative">
            See all work
            <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-[var(--foreground)] origin-left scale-x-100 transition-transform group-hover:scale-x-0" />
          </span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}
