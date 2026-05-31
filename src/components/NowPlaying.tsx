import Image from "next/image";
import type { NowPlayingTrack } from "@/data/content";

const SPOTIFY_GREEN = "#1DB954";

type Props =
  | { mode: "playing"; track: NowPlayingTrack }
  | { mode: "away"; message: string };

export function NowPlaying(props: Props) {
  if (props.mode === "away") return <AwayCard message={props.message} />;
  return <TrackCard track={props.track} />;
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-3 border border-[var(--border)] rounded-2xl bg-white/60 backdrop-blur-sm max-w-md">
      {children}
    </div>
  );
}

function TrackCard({ track }: { track: NowPlayingTrack }) {
  const showImage = !!track.albumImage;
  const tileBg = showImage ? undefined : track.albumColor ?? "#1a1a1a";

  const card = (
    <CardShell>
      <div className="flex items-center gap-4">
        <div
          className="relative shrink-0 w-12 h-12 rounded-md overflow-hidden flex items-center justify-center"
          style={tileBg ? { backgroundColor: tileBg } : undefined}
          aria-hidden
        >
          {showImage ? (
            <Image
              src={track.albumImage!}
              alt={track.album ?? track.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <span className="flex gap-[2px]">
              <span className="block w-[3px] h-3 bg-white/80 rounded-sm animate-[pulse_1.4s_ease-in-out_infinite]" />
              <span className="block w-[3px] h-4 bg-white/80 rounded-sm animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:160ms]" />
              <span className="block w-[3px] h-2 bg-white/80 rounded-sm animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:320ms]" />
            </span>
          )}
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
      <div className="mt-3 pt-2 border-t border-[var(--border)] flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
        <SpotifyIcon />
        <span>Powered by Spotify</span>
      </div>
    </CardShell>
  );

  return track.url ? (
    <a
      href={track.url}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-block transition-opacity hover:opacity-80"
      aria-label={`Open ${track.title} by ${track.artist} in Spotify`}
    >
      {card}
    </a>
  ) : (
    card
  );
}

function AwayCard({ message }: { message: string }) {
  return (
    <CardShell>
      <div className="flex items-center gap-4">
        <div
          className="shrink-0 w-12 h-12 rounded-md bg-[var(--border)]/60 flex items-center justify-center"
          aria-hidden
        >
          <span className="flex gap-1">
            <span className="block w-1 h-1 rounded-full bg-[var(--muted)]" />
            <span className="block w-1 h-1 rounded-full bg-[var(--muted)]" />
            <span className="block w-1 h-1 rounded-full bg-[var(--muted)]" />
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            Right now —
          </p>
          <p className="mt-0.5 text-sm font-medium">{message}</p>
        </div>
      </div>
    </CardShell>
  );
}

function SpotifyIcon() {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill={SPOTIFY_GREEN}
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
