import { ContactSection } from "@/components/ContactSection";
import { CoverFlourish, CoverReveal } from "@/components/CoverFlourish";
import Image from "next/image";
import Link from "next/link";
import { projects, socialLinks, gallery } from "@/data/content";
import { NowPlaying } from "@/components/NowPlaying";

export default function Home() {
  return <div className="home-page">
    <header className="magazine-cover">
      <div className="edition-line"><span>a personal collection</span><span>code / photographs / everyday things</span></div>
      <CoverReveal>
        <div className="cover-copy">
          <p className="signature cover-greeting">hello, i’m</p>
          <h1 className="display-type">gabriel<span className="coral">.</span></h1>
          <p className="cover-description">a student at uva, building websites<br className="desktop-break" /> and finding things worth keeping.</p>
          <Link href="/projects" className="text-link">explore my projects <span aria-hidden>↗</span></Link>
        </div>
        <CoverFlourish />
      </CoverReveal>
      <nav className="cover-socials" aria-label="connect with gabriel">
        <span>let’s connect</span>
        <a href={socialLinks.github} target="_blank" rel="noreferrer noopener">github ↗</a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer noopener">linkedin ↗</a>
        <a href={socialLinks.email}>email ↗</a>
      </nav>
    </header>
    <section className="home-projects" aria-labelledby="projects-title">
      <div className="section-heading"><p className="print-label">01 / made on a keyboard</p><h2 id="projects-title" className="display-type">things i’m building.</h2></div>
      {projects.map((project, index) => <Link href="/projects" className="project-index-entry" key={project.title}>
        <span className="project-number">0{index + 1}</span><div><h3 className="display-type">{project.title}</h3><p>{project.tech.slice(0, 3).join(' / ')}</p></div><span className="project-index-arrow" aria-hidden>↗</span>
      </Link>)}
    </section>
    <section className="everyday-spread" aria-labelledby="everyday-title">
      <div className="everyday-copy"><p className="print-label">02 / away from the keyboard</p><h2 id="everyday-title" className="display-type">a softer<br />side of things.</h2><p>photographs, café stops, and whatever’s on repeat.</p><Link className="text-link" href="/gallery">open the anthology ↗</Link><div className="home-listening"><NowPlaying /></div></div>
      <Link href="/gallery" className="anthology-preview" aria-label="explore the photo anthology"><Image src={gallery[3].src} alt={gallery[3].alt} width={724} height={1086} sizes="(max-width: 760px) 85vw, 40vw" /><span className="signature">little things, kept close.</span></Link>
    </section>
    <ContactSection />
  </div>;
}
