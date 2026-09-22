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
      <div className="pinwheel-wrap">
        <p className="annotation signature" aria-hidden>give it a spin
          <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M38 8 C 26 10, 16 18, 12 34 M6 27 l6 8 l7 -6" /></svg>
        </p>
        <Pinwheel />
      </div>
      <SocialIcons />
      <p className="footer-copyright">© {new Date().getFullYear()} {personalInfo.name.toLowerCase()}</p>
    </div>
  </footer>;
}
