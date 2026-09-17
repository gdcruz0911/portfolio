"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { NowPlayingTrack } from "@/data/content";

const SPOTIFY_GREEN = "#1DB954";

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
    {track?.albumImage ? <Image src={track.albumImage} alt={track.album ?? "album artwork"} width={80} height={80} className="album-art" /> : <span className="away-record" aria-hidden><span /></span>}
    <div className="track-details">
      <p className="track-title">{track?.title ?? "away for a bit"}</p>
      <p className="track-artist">{track?.artist ?? "a little quiet right now"}</p>
    </div>
  </>;

  return <>
    <div className="spotify-brand"><SpotifyIcon /><span>Spotify</span></div>
    <h2 className="display-type listening-title">right now</h2>
    <div aria-live="polite" aria-atomic="true">
      {track?.url ? <a className="track-card" href={track.url} target="_blank" rel="noreferrer noopener" aria-label={`open ${track.title} by ${track.artist} in Spotify`}>{details}</a> : <div className="track-card">{details}</div>}
    </div>
  </>;
}

function SpotifyIcon() {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill={SPOTIFY_GREEN}
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
