import Image from "next/image";
import Link from "next/link";
import { Furin } from "@/components/Furin";
import { NowPlaying } from "@/components/NowPlaying";
import { OtterPond } from "@/components/OtterPond";
import { ProjectMedia } from "@/components/ProjectMedia";
import { SocialIcons } from "@/components/SocialIcons";
import { gallery, projectSlug, projects } from "@/data/content";

export default function Home() {
  const photo = gallery[3];
  return <>
    <header className="hero">
      <div className="hero-copy">
        <h1 className="signature">gabriel</h1>
        <p>a student at uva, building websites and finding things worth keeping.</p>
        <SocialIcons />
      </div>
      <Furin />
    </header>

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

    <OtterPond><NowPlaying /></OtterPond>

    <section className="home-section home-photo" aria-labelledby="photo-title">
      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 90vw, 360px" />
      <div><h2 id="photo-title" className="sr-only">photographs</h2><Link className="text-link" href="/gallery">gallery →</Link></div>
    </section>
  </>;
}
