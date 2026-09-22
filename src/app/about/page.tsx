import { ContactSection } from "@/components/ContactSection";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { personalInfo } from "@/data/content";

export const metadata: Metadata = { title: "About", description: personalInfo.about };

export default function AboutPage() {
  return <div>
    <PageHeader eyebrow="the person behind the pages" title="a little about me." />
    <section className="about-spread" aria-label="about gabriel">
      <div className="about-story"><p>i’m gabriel, a student at the university of virginia and an aspiring full-stack developer.</p><p>i spend a lot of my time learning the parts of the stack i don’t know yet, building websites, and finding small ways to make them feel more personal.</p><p>away from the keyboard, you’ll find me café-hopping, taking photographs, or playing volleyball.</p></div>
      <div className="about-notes">
        <div><h2 className="signature">currently</h2><p>studying at the university of virginia</p></div>
        <div><h2 className="signature">building with</h2><p>TypeScript, React, Next.js, Python</p></div>
        <div><h2 className="signature">a few favorites</h2><p>oolong tea, matcha, cafés, plants, and a good playlist.</p></div>
      </div>
    </section>
    <ContactSection />
  </div>;
}
