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
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} {personalInfo.name.toLowerCase()}</p>
        <p className="crafted">crafted with love
          <svg viewBox="0 0 24 22" aria-hidden><path d="M12 20 C 6 15, 2 12, 2 7.5 C 2 4.5, 4.4 2.5, 7 2.6 C 9.2 2.7, 10.8 4, 12 6 C 13.3 3.9, 15 2.6, 17.2 2.6 C 19.9 2.7, 22.1 4.8, 22 7.8 C 21.8 12.2, 17.4 15.4, 12 20 Z" /></svg>
        </p>
      </div>
    </div>
  </footer>;
}
