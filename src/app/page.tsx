import { ContactSection } from "@/components/ContactSection";
import Image from "next/image";
import Link from "next/link";
import { projects, socialLinks } from "@/data/content";
import { NowPlaying } from "@/components/NowPlaying";

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-intro">
        <h1 className="display-type">hi, i&rsquo;m gabriel<span className="coral">.</span></h1>
        <p>uva student and aspiring full-stack developer.<br />i build websites and enjoy photography.</p>
        <div className="intro-actions">
          <Link href="/projects" className="text-link intro-link">view my projects <span aria-hidden>→</span></Link>
          <nav className="intro-socials" aria-label="connect with gabriel">
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer noopener">linkedin <span aria-hidden>↗</span></a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer noopener">github <span aria-hidden>↗</span></a>
            <a href={socialLinks.email}>email <span aria-hidden>↗</span></a>
          </nav>
        </div>
      </header>
      <div className="home-grid">
        <section className="paper-panel projects-panel" aria-labelledby="projects-title">
          <span className="section-dot coral-bg" aria-hidden />
          <h2 id="projects-title" className="display-type">projects</h2>
          {projects.length ? <div className="selected-project">
            <h3 className="display-type">{projects[0].title}</h3>
            <p>{projects[0].description}</p>
          </div> : <p className="display-type coming-soon">projects coming soon.</p>}
          <Link href="/projects" className="text-link">all projects <span aria-hidden>→</span></Link>
        </section>
        <section className="paper-panel listening-panel" aria-label="Spotify listening status"><NowPlaying /></section>
        <section className="photography-panel" aria-labelledby="photography-title">
          <Link href="/gallery" className="photo-postcard" aria-label="view photography gallery">
            <span className="photo-preview">
              <Image src="/gallery/85FB701C-4941-440A-A314-C6B566CABDD0_1_105_c.jpeg" alt="Cherry blossoms in bloom against a blue sky" fill sizes="120px" className="object-cover" />
            </span>
            <span>
              <span id="photography-title" className="signature photo-note">a few little moments</span>
              <span className="photo-gallery-link">view gallery <span aria-hidden>↗</span></span>
            </span>
          </Link>
        </section>
      </div>
      <ContactSection />
    </div>
  );
}
