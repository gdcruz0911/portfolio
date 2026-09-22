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

  return <div className="speaker">
    <svg viewBox="0 0 150 150" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {track && <><g className="note"><path d="M92 30 v-14 l8 -3" /><ellipse cx="89" cy="31" rx="3.5" ry="2.5" fill="currentColor" /></g><g className="note"><path d="M58 26 v-12 l7 -2" /><ellipse cx="55" cy="27" rx="3.5" ry="2.5" fill="currentColor" /></g></>}
      <rect x="45" y="40" width="60" height="68" rx="6" />
      <circle cx="75" cy="82" r="16" />
      <circle cx="75" cy="82" r="6" />
      <circle cx="75" cy="53" r="4" />
      <path d="M50 108 v4 M100 108 v4" />
      <path d="M18 138 C 20 118, 44 110, 75 111 C 108 112, 132 118, 133 138 C 110 144, 42 144, 18 138 Z" />
      <path d="M40 126 c 10 -4 22 -5 32 -4" opacity=".5" />
    </svg>
    <div aria-live="polite" aria-atomic="true">
      {track?.url
        ? <a className="track-label" href={track.url} target="_blank" rel="noreferrer noopener" aria-label={`now playing: ${track.title} by ${track.artist}, open in Spotify`}>{details}</a>
        : <div className="track-label">{details}</div>}
    </div>
  </div>;
}
