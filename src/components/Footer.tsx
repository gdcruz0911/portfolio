import { SocialIcons } from "@/components/SocialIcons";
import { personalInfo, socialLinks } from "@/data/content";

export function Footer() {
  return <footer id="contact" className="site-footer">
    <div className="footer-inner">
      <div className="footer-note">
        <span className="signature">thanks for stopping by</span>
        <p>see you around.</p>
        <a href={socialLinks.email} className="contact-email">{personalInfo.email}</a>
      </div>
      <SocialIcons />
      <p className="footer-copyright">© {new Date().getFullYear()} {personalInfo.name.toLowerCase()}</p>
    </div>
  </footer>;
}
