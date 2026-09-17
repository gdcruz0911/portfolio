"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, personalInfo } from "@/data/content";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <Link href="/" className="signature" aria-label={`${personalInfo.name}, home`} onClick={() => setOpen(false)}>gabriel</Link>
      <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "close" : "menu"}<span className="menu-lines" aria-hidden /></button>
      <nav id="main-navigation" className={open ? "navigation is-open" : "navigation"} aria-label="main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label.toLowerCase()}</Link>
        ))}
      </nav>
      <Image src="/art/pothos.webp" alt="" width={320} height={800} className="sidebar-plant" sizes="180px" loading="eager" />
    </header>
  );
}
