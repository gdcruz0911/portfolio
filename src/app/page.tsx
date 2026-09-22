import Image from "next/image";
import Link from "next/link";
import { Furin } from "@/components/Furin";
import { NowPlaying } from "@/components/NowPlaying";
import { OtterPond } from "@/components/OtterPond";
import { ProjectMedia } from "@/components/ProjectMedia";
import { SocialIcons } from "@/components/SocialIcons";
import { gallery, projectSlug, projects } from "@/data/content";

export default function Home() {
  const pile = [3, 5, 1].filter((i) => gallery[i]);
  return <>
    <header className="hero">
      <div className="hero-copy">
        <h1 className="signature">gabriel</h1>
        <p>a student at uva, building websites and finding things worth keeping.</p>
        <SocialIcons />
      </div>
      <div className="furin-wrap">
        <p className="annotation signature" aria-hidden>ring me
          <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 30 C 14 30, 26 24, 34 10 M26 12 l8 -3 l1 9" /></svg>
        </p>
        <Furin />
      </div>
    </header>

    <OtterPond><NowPlaying /></OtterPond>

    <section className="home-section" aria-labelledby="work-title">
      <div className="section-head"><h2 id="work-title">work</h2><Link className="text-link" href="/projects">all projects →</Link></div>
      <div className="work-grid">
        {projects.map((project) => <Link key={project.title} href={`/projects#${projectSlug(project)}`} className="project-tile">
          <div className="tile-media"><ProjectMedia project={project} sizes="(max-width: 760px) 90vw, 540px" /></div>
          <h3>{project.title}</h3>
          <p className="mono">{project.tech.slice(0, 3).join(" · ")}</p>
        </Link>)}
      </div>
    </section>

    <section className="home-section" aria-labelledby="photos-title">
      <div className="section-head"><h2 id="photos-title">photos</h2><Link className="text-link" href="/gallery">gallery →</Link></div>
      <div className="home-photos">
        <Link href="/gallery" className="print-pile" aria-label="open the gallery">
          {pile.map((i) => <Image key={gallery[i].src} src={gallery[i].src} alt="" width={gallery[i].width} height={gallery[i].height} sizes="240px" />)}
        </Link>
        <ol className="pile-notes mono" aria-label="in this pile">
          {pile.map((i) => <li key={i}><b>No.{String(i + 1).padStart(2, "0")}</b> {gallery[i].caption}</li>)}
          <li>from issue no.01 · {gallery.length} prints</li>
        </ol>
      </div>
    </section>
  </>;
}
