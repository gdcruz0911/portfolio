"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { NowPlayingTrack } from "@/data/content";

export function NowPlaying() {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null);

  useEffect(() => {
    let controller: AbortController | undefined;
    let disposed = false;
    async function refresh() {
      if (document.hidden) return;
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch("/api/now-playing", { signal: controller.signal, cache: "no-store" });
        const data = response.ok ? await response.json() : null;
        if (!disposed) setTrack(data?.track?.isPlaying === true ? data.track : null);
      } catch (error) {
        if (!disposed && !(error instanceof DOMException && error.name === "AbortError")) setTrack(null);
      }
    }
    void refresh();
    const interval = setInterval(refresh, 60000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      disposed = true;
      controller?.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const details = <>
    {track?.albumImage && <Image src={track.albumImage} alt="" width={80} height={80} />}
    <div>
      <p>{track?.title ?? "quiet for now"}</p>
      <p className="mono">{track?.artist ?? "nothing playing"}</p>
    </div>
  </>;

  // A mid-century speaker on a stone by the pond, drawn with the same pencil grain as the otter.
  return <div className="pond-speaker">
    <svg viewBox="0 0 220 190" aria-hidden>
      <defs>
        <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" result="wobble" />
          <feDisplacementMap in="SourceGraphic" in2="wobble" scale="2.2" result="drawn" />
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="1" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -.8 0 0 0 1.15" result="tooth" />
          <feComposite in="drawn" in2="tooth" operator="in" />
        </filter>
        <pattern id="grille-weave" width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M0 1.5 H3 M1.5 0 V3" stroke="#b9a98d" strokeWidth=".5" />
        </pattern>
      </defs>
      <g filter="url(#pencil)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 172 C 18 152, 64 144, 110 145 C 156 146, 200 153, 206 172 C 170 185, 52 185, 14 172 Z" fill="#c2bbaf" stroke="#8d857a" strokeWidth="1.4" />
        <path d="M40 166 C 64 158, 100 155, 132 157" fill="none" stroke="#a39b8f" strokeWidth="1" />
        <path d="M50 124 L58 124 L46 162 L41 162 Z M162 124 L170 124 L179 162 L174 162 Z" fill="#5e3f2b" />
        <rect x="24" y="42" width="172" height="86" rx="9" fill="#9b6541" stroke="#5e3f2b" strokeWidth="1.6" />
        <path d="M30 52 C 60 49, 120 54, 190 50 M30 120 C 70 117, 140 122, 190 118" fill="none" stroke="#7a4d31" strokeWidth=".8" />
        <rect x="36" y="54" width="112" height="62" rx="4" fill="#e7dbc4" stroke="#8a6a4e" strokeWidth="1.1" />
        <rect x="36" y="54" width="112" height="62" rx="4" fill="url(#grille-weave)" opacity=".6" />
        <circle cx="172" cy="72" r="7" fill="#c9a25b" stroke="#8a6a3a" strokeWidth=".9" />
        <circle cx="172" cy="98" r="5" fill="#c9a25b" stroke="#8a6a3a" strokeWidth=".9" />
      </g>
      {track && <g className="speaker-notes" fill="none" stroke="#7d7368" strokeWidth="1.5" strokeLinecap="round">
        <g className="note"><path d="M138 32 v-14 l8 -3" /><ellipse cx="135" cy="33" rx="3.5" ry="2.5" fill="#7d7368" /></g>
        <g className="note"><path d="M84 28 v-12 l7 -2" /><ellipse cx="81" cy="29" rx="3.5" ry="2.5" fill="#7d7368" /></g>
      </g>}
    </svg>
    <div aria-live="polite" aria-atomic="true">
      {track?.url
        ? <a className="track" href={track.url} target="_blank" rel="noreferrer noopener" aria-label={`now playing: ${track.title} by ${track.artist}, open in Spotify`}>{details}</a>
        : <div className="track">{details}</div>}
    </div>
  </div>;
}
