"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, navItems } from "@/data/content";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// Blue is the "home" default when no nav tab matches the current route.
const DEFAULT_ACCENT = "#93C5FD";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Brand-name period reflects whichever tab you're currently on.
  const currentAccent =
    navItems.find((item) => isActive(pathname, item.href))?.accent ??
    DEFAULT_ACCENT;

  return (
    <header className="w-full border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-14 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm sm:text-base md:text-lg font-semibold tracking-tight whitespace-nowrap"
        >
          {personalInfo.name}
          <span
            className="transition-colors"
            style={{ color: currentAccent }}
          >
            .
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems
              .filter((item) => item.href !== "/")
              .map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className="group relative inline-block py-1 text-sm font-medium text-[var(--foreground)] transition-opacity"
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-0 right-0 -bottom-0.5 h-[2px]"
                          style={{ backgroundColor: item.accent }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      ) : (
                        <span
                          className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                          style={{ backgroundColor: item.accent }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 -mr-2"
        >
          <span className="sr-only">Menu</span>
          <div className="relative w-5 h-3">
            <span
              className={`absolute left-0 top-0 w-5 h-px bg-[var(--foreground)] transition-transform ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 w-5 h-px bg-[var(--foreground)] transition-transform ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {navItems
                .filter((item) => item.href !== "/")
                .map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block py-2 text-base ${
                          active
                            ? "font-medium text-[var(--foreground)]"
                            : "text-[var(--muted)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
