"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { personalInfo, socialLinks } from "@/data/content";

export function Footer() {
  const [stirring, setStirring] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const footer = useRef<HTMLElement>(null);
  const visible = useInView(footer);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function stir() {
    if (timer.current) clearTimeout(timer.current);
    setStirring(true);
    timer.current = setTimeout(() => setStirring(false), 2000);
  }

  return <footer ref={footer} className={`site-footer${visible ? " is-visible" : ""}`}>
    <div className="footer-inner">
      <div className="footer-note"><span className="signature">thanks for stopping by</span><p>see you around.</p></div>
      <button type="button" className={`sleeping-otter${stirring ? " is-stirring" : ""}`} onClick={stir} aria-label="gently wake the sleeping otter">
        <Image src="/art/sleeping-otter.webp" alt="" width={600} height={400} sizes="(max-width: 760px) 75vw, 220px" />
        <span className="sleep-marks" aria-hidden><i>z</i><i>z</i><i>z</i></span>
        {stirring && <span className="otter-response signature">five more minutes...</span>}
      </button>
      <span className="sr-only" role="status">{stirring ? "the otter stirs, then drifts back to sleep." : ""}</span>
      <nav className="social-icons" aria-label="social links">
        <a href={socialLinks.github} target="_blank" rel="noreferrer noopener" aria-label="github"><svg viewBox="0 0 24 24" aria-hidden fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.57 9.57 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg></a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer noopener" aria-label="linkedin"><svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m4 0v-7m0 3c0-4 6-4 6 0v4"/><circle cx="7" cy="7" r=".8" fill="currentColor"/></svg></a>
        <a href={socialLinks.email} aria-label="email"><svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg></a>
      </nav>
      <p className="footer-copyright">© {new Date().getFullYear()} {personalInfo.name.toLowerCase()}</p>
    </div>
  </footer>;
}
