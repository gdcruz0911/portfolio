import { ContactSection } from "@/components/ContactSection";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/content";
import { NowPlaying } from "@/components/NowPlaying";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-intro">
        <h1 className="display-type">hi, i&rsquo;m gabriel<span className="coral">.</span></h1>
        <p>uva student and aspiring full-stack developer.<br />i build websites and enjoy photography.</p>
        <Link href="/work" className="text-link intro-link">view my work <span aria-hidden>→</span></Link>
      </header>
      <div className="home-grid">
        <section className="paper-panel projects-panel" aria-labelledby="projects-title">
          <span className="section-dot coral-bg" aria-hidden />
          <h2 id="projects-title" className="display-type">projects</h2>
          {projects.length ? <ProjectCard project={projects[0]} /> : <>
            <Image src="/art/landscape.webp" alt="" width={900} height={300} sizes="(min-width: 900px) 40vw, 90vw" className="project-landscape" />
            <p className="display-type coming-soon">projects coming soon.</p>
          </>}
          <Link href="/work" className="text-link">view work <span aria-hidden>→</span></Link>
        </section>
        <section className="paper-panel listening-panel" aria-label="Spotify listening status"><NowPlaying /></section>
        <section className="paper-panel photography-panel" aria-labelledby="photography-title">
          <h2 id="photography-title" className="display-type"><span className="section-dot moss-bg" aria-hidden />photography</h2>
          <Link href="/gallery" className="photo-preview" aria-label="view photography gallery">
            <Image src="/gallery/85FB701C-4941-440A-A314-C6B566CABDD0_1_105_c.jpeg" alt="Cherry blossoms in bloom against a blue sky" fill priority sizes="(min-width: 900px) 35vw, 90vw" className="object-cover" />
          </Link>
          <Link href="/gallery" className="text-link">view gallery <span aria-hidden>→</span></Link>
        </section>
      </div>
      <ContactSection />
    </div>
  );
}
