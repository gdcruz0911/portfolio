// Server-only Spotify helper.
// Trades a long-lived refresh token for a short-lived access token, then hits
// /me/player/currently-playing. Returns null on any failure so callers can fall
// back gracefully. We never want this to throw and break the home page.

import "server-only";
import type { NowPlayingTrack } from "@/data/content";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

interface SpotifyTokenResponse {
  access_token?: string;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyImage {
  url: string;
}

interface SpotifyAlbum {
  name?: string;
  images?: SpotifyImage[];
}

interface SpotifyItem {
  name: string;
  artists?: SpotifyArtist[];
  album?: SpotifyAlbum;
  external_urls?: { spotify?: string };
}

interface SpotifyNowPlayingResponse {
  is_playing?: boolean;
  item?: SpotifyItem;
}

async function getAccessToken(): Promise<string | null> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return null;
  }
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as SpotifyTokenResponse;
  return data.access_token ?? null;
}

export async function getNowPlaying(): Promise<NowPlayingTrack | null> {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const res = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    // 204 = nothing currently playing; 202 = no active device.
    if (res.status === 204 || res.status === 202) return null;
    if (!res.ok) return null;

    const data = (await res.json()) as SpotifyNowPlayingResponse;
    const item = data.item;
    if (!item || data.is_playing !== true || typeof item.name !== "string") return null;

    return {
      title: item.name,
      artist: (item.artists ?? []).map((a) => a.name).join(", ") || "Unknown",
      album: item.album?.name,
      albumImage: item.album?.images?.find((image) => image.url.startsWith("https://i.scdn.co/"))?.url,
      url: item.external_urls?.spotify?.startsWith("https://open.spotify.com/") ? item.external_urls.spotify : undefined,
      isPlaying: data.is_playing ?? false,
    };
  } catch {
    return null;
  }
}
