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
    <div className="pond-stage">
      <p className="pond-note signature" aria-hidden>poke the otter
        <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6 C 20 8, 30 18, 32 36 M24 30 l8 7 l5 -9" /></svg>
      </p>
      <button type="button" className={fact ? "otter is-awake" : "otter"} data-sparks="gold" onClick={poke} aria-label="poke the otter for a fact about gabriel">
        <Image src="/art/sleeping-otter.webp" alt="" width={600} height={400} sizes="(max-width: 760px) 90vw, 360px" />
        <span className="sleep-marks" aria-hidden><i>z</i><i>z</i><i>z</i></span>
      </button>
      {fact && <p className="otter-bubble" aria-hidden>{fact}</p>}
      <p className="pond-count mono">{found}/{otterFacts.length}</p>
      <span className="sr-only" role="status">{fact ?? ""}</span>
    </div>
    {children}
  </section>;
}
