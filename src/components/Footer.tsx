import { SocialIcons } from "@/components/SocialIcons";
import { personalInfo, socialLinks } from "@/data/content";

export function Footer() {
  return <footer id="contact" className="site-footer">
    <div className="footer-inner">
      <div>
        <h2>say hello</h2>
        <a href={socialLinks.email} className="contact-email">{personalInfo.email}</a>
      </div>
      <SocialIcons />
      <p className="footer-copyright">© {new Date().getFullYear()} {personalInfo.name.toLowerCase()}</p>
    </div>
  </footer>;
}
