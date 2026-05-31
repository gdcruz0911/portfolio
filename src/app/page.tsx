import Link from "next/link";
import { personalInfo, projects, awayMessages } from "@/data/content";
import { NowPlaying } from "@/components/NowPlaying";
import { getNowPlaying } from "@/lib/spotify";

// Re-fetch the now-playing track at most once per minute.
export const revalidate = 60;

// Home's identity color — used everywhere on this page.
const ACCENT = "#93C5FD"; // pastel blue

// Split the tagline on its trailing punctuation so we can color it.
const taglineMatch = personalInfo.tagline.match(/^(.*?)([.!?…]+)$/);
const taglineMain = taglineMatch?.[1] ?? personalInfo.tagline;
const taglinePunct = taglineMatch?.[2] ?? "";

export default async function Home() {
  const live = await getNowPlaying();
  const widget = live
    ? ({ mode: "playing", track: live } as const)
    : ({
        mode: "away",
        message:
          awayMessages[Math.floor(Math.random() * awayMessages.length)] ??
          awayMessages[0],
      } as const);
  return (
    <div
      className="pt-20 md:pt-32 pb-16"
      style={{ "--accent": ACCENT } as React.CSSProperties}
    >
      <section className="max-w-4xl">
        <h1 className="text-[44px] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight">
          {taglineMain}
          <span style={{ color: ACCENT }}>{taglinePunct}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-[var(--muted)] leading-relaxed">
          {personalInfo.about}
        </p>
        <div className="mt-10">
          <NowPlaying {...widget} />
        </div>
      </section>

      <section className="mt-24 md:mt-32 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p
            className="text-sm font-medium uppercase tracking-[0.18em] mb-3"
            style={{ color: ACCENT }}
          >
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
            <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-[var(--foreground)] group-hover:bg-[#93C5FD] transition-colors duration-200" />
          </span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}
