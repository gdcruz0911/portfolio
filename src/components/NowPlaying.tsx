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

  // A little media player at the end of the otter's earbud wire; its screen is the now-playing card.
  return <div className="player">
    {track && <svg className="player-notes" viewBox="0 0 60 40" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <g className="note"><path d="M40 30 v-14 l8 -3" /><ellipse cx="37" cy="31" rx="3.5" ry="2.5" fill="currentColor" /></g>
      <g className="note"><path d="M16 26 v-12 l7 -2" /><ellipse cx="13" cy="27" rx="3.5" ry="2.5" fill="currentColor" /></g>
    </svg>}
    <div aria-live="polite" aria-atomic="true">
      {track?.url
        ? <a className="player-screen" href={track.url} target="_blank" rel="noreferrer noopener" aria-label={`now playing: ${track.title} by ${track.artist}, open in Spotify`}>{details}</a>
        : <div className="player-screen">{details}</div>}
    </div>
    <span className="player-wheel" aria-hidden />
  </div>;
}
