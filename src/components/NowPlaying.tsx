import type { NowPlayingTrack } from "@/data/content";

export function NowPlaying({ track }: { track: NowPlayingTrack }) {
  return (
    <div className="inline-flex items-center gap-4 px-4 py-3 border border-[var(--border)] rounded-2xl bg-white/60 backdrop-blur-sm max-w-md">
      <div
        className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: track.albumColor }}
        aria-hidden
      >
        <span className="flex gap-[2px]">
          <span className="block w-[3px] h-3 bg-white/80 rounded-sm animate-[pulse_1.4s_ease-in-out_infinite]" />
          <span className="block w-[3px] h-4 bg-white/80 rounded-sm animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:160ms]" />
          <span className="block w-[3px] h-2 bg-white/80 rounded-sm animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:320ms]" />
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
          What I&rsquo;m listening to right now
        </p>
        <p className="mt-0.5 text-sm font-semibold truncate">{track.title}</p>
        <p className="text-xs text-[var(--muted)] truncate">
          {track.artist}
          {track.album ? ` · ${track.album}` : ""}
        </p>
      </div>
    </div>
  );
}
