"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { otterFacts } from "@/data/content";

const STORAGE_KEY = "otter-pond";
const DONE = "that's everything. go outside :)";

function shuffled(length: number) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// Progress lives in localStorage, with an in-memory fallback when storage is blocked.
let memory: string | null = null;
const listeners = new Set<() => void>();
function read() {
  try { return localStorage.getItem(STORAGE_KEY) ?? memory; } catch { return memory; }
}
function write(value: string) {
  memory = value;
  try { localStorage.setItem(STORAGE_KEY, value); } catch { /* memory keeps it for this visit */ }
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
function parse(raw: string | null): { order: number[]; found: number } {
  try {
    const saved = JSON.parse(raw ?? "");
    if (saved.order?.length === otterFacts.length) return { order: saved.order, found: Math.min(saved.found ?? 0, otterFacts.length) };
  } catch { /* start fresh */ }
  return { order: [], found: 0 };
}

export function OtterPond({ children }: { children: React.ReactNode }) {
  const { order, found } = parse(useSyncExternalStore(subscribe, read, () => null));
  const [fact, setFact] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  function poke() {
    const deck = order.length ? order : shuffled(otterFacts.length);
    setFact(found < otterFacts.length ? otterFacts[deck[found]] : DONE);
    write(JSON.stringify({ order: deck, found: Math.min(found + 1, otterFacts.length) }));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFact(null), 3500);
  }

  return <section className="home-section pond" aria-label="the otter pond">
    <div className={fact ? "otter-rig is-awake" : "otter-rig"}>
      <p className="pond-note signature" aria-hidden>poke the otter
        <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M38 6 C 24 8, 14 18, 12 36 M20 30 l-8 7 l-5 -9" /></svg>
      </p>
      {fact && <p className="otter-bubble" aria-hidden>{fact}</p>}
      <button type="button" className="otter" data-sparks="gold" onClick={poke} aria-label="poke the otter for a fact about gabriel">
        <Image src="/art/sleeping-otter.webp" alt="" width={700} height={307} sizes="(max-width: 760px) 70vw, 630px" />
        <span className="sleep-marks" aria-hidden><i>z</i><i>z</i><i>z</i></span>
      </button>
      {/* Pencil earbuds on the otter's ears (rig units: otter image drawn at 0,90 at 700x307). */}
      <svg className="earbuds" viewBox="0 0 1000 440" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <defs>
          <filter id="pencil">
            <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.2" />
          </filter>
        </defs>
        <g filter="url(#pencil)">
          <path d="M38 200 C 60 240, 120 252, 170 247 S 228 241, 240 240" />
          <path d="M193 124 C 206 170, 232 200, 240 240" />
          <path className="wire-wide" d="M240 240 C 320 280, 380 420, 540 412 S 690 330, 760 318" />
          <path className="wire-narrow" d="M240 240 C 330 300, 470 330, 500 440" />
          <rect className="bud" x="29" y="180" width="8" height="21" rx="4" transform="rotate(-22 33 180)" />
          <rect className="bud" x="186" y="106" width="8" height="21" rx="4" transform="rotate(-18 190 106)" />
          <circle className="bud" cx="30" cy="177" r="10.5" />
          <circle className="bud" cx="185" cy="102" r="10.5" />
        </g>
      </svg>
      {children}
      <p className="pond-count mono">{found}/{otterFacts.length}</p>
      <span className="sr-only" role="status">{fact ?? ""}</span>
    </div>
  </section>;
}
