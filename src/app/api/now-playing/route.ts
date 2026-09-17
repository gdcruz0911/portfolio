import { getNowPlaying } from "@/lib/spotify";

export async function GET() {
  return Response.json({ track: await getNowPlaying() }, {
    headers: { "Cache-Control": "no-store" },
  });
}
