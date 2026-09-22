import { Pinwheel } from "@/components/Pinwheel";
import { SocialIcons } from "@/components/SocialIcons";
import { personalInfo } from "@/data/content";

export function Footer() {
  return <footer id="contact" className="site-footer">
    <div className="footer-inner">
      <div className="footer-note">
        <span className="signature">thanks for stopping by</span>
        <p>see you around.</p>
      </div>
      <Pinwheel />
      <SocialIcons />
      <p className="footer-copyright">© {new Date().getFullYear()} {personalInfo.name.toLowerCase()}</p>
    </div>
  </footer>;
}
