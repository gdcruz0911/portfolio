import { personalInfo, socialLinks } from "@/data/content";

export function ContactSection() {
  return <section id="contact" className="contact-section">
    <p className="contact-eyebrow">a conversation starts here</p>
    <h2 className="display-type">say hello<span className="coral">.</span></h2>
    <p>for a project, a coffee, or a good music recommendation.</p>
    <a href={socialLinks.email} className="contact-email">{personalInfo.email} <span aria-hidden>↗</span></a>
  </section>;
}
