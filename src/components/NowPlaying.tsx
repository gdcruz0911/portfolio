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
      <p className="track-line">{track?.title ?? "quiet for now"}</p>
      <p className="track-line mono">{track?.artist ?? "nothing playing"}</p>
      <p className="spotify-credit mono">
        <svg viewBox="0 0 24 24" aria-hidden><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" /></svg>
        via spotify
      </p>
    </div>
  </>;

  // A mid-century speaker on a stone by the pond, drawn with the same pencil grain as the otter.
  return <div className="pond-speaker">
    <svg viewBox="0 0 220 236" aria-hidden>
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
        <path d="M8 214 q 16 -5 32 0 M176 216 q 16 -5 34 1 M40 226 q 70 10 140 0" fill="none" stroke="#6f93b5" strokeWidth="2.2" />
        <path d="M26 190 C 22 160, 62 142, 108 142 C 156 142, 196 158, 194 188 C 192 208, 160 216, 110 216 C 60 216, 30 210, 26 190 Z" fill="#b8b1a5" stroke="#857d72" strokeWidth="1.4" />
        <path d="M46 168 C 62 154, 92 149, 118 150" fill="none" stroke="#d6d0c6" strokeWidth="3" />
        <path d="M150 186 c 8 4, 14 12, 12 20 M70 196 c 10 -2, 20 2, 26 8" fill="none" stroke="#9a9286" strokeWidth="1" />
        <path d="M50 124 L58 124 L48 156 L43 156 Z M162 124 L170 124 L177 156 L172 156 Z" fill="#5e3f2b" />
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
    <div className="speaker-label">
    <div aria-live="polite" aria-atomic="true">
      {track?.url
        ? <a className="track" title={`${track.title} · ${track.artist}`} href={track.url} target="_blank" rel="noreferrer noopener" aria-label={`now playing: ${track.title} by ${track.artist}, open in Spotify`}>{details}</a>
        : <div className="track">{details}</div>}
    </div>
    </div>
  </div>;
}
