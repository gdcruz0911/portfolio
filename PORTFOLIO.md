# Portfolio content and local setup

## Run and check

```sh
npm run dev
npm run lint
node scripts/check-portfolio.cjs
npm run test:e2e
npm run build
```

## Spotify

Create a local `.env.local` using the variable names in `.env.example`.
Supply your Spotify client ID, client secret, and refresh token there and in your hosting provider's environment settings.
Keep these values server-only and never paste them into source files or commit them.
Restart the development server after changing them.

The widget refreshes once a minute while the page is visible and when you return to it.
It shows a current track only when Spotify reports active playback.
Paused playback, missing configuration, and API failures show the away message.

## Projects and photos

Edit `src/data/content.ts` to add real projects.
A project has a title, description, and technology list, with optional `demo`, `github`, `preview`, `video`, and `poster` fields.
`video` is a short silent `.mp4` loop (about 10–20s, under ~5 MB) in `public/projects/`. It replaces the screenshot, plays muted while on screen, and shows the poster frame under reduced motion.
The otter's facts live in `otterFacts`; replace the placeholders with eight real ones.

Gallery entries keep their image dimensions and descriptive alternative text.
The mahjong club website and portfolio are listed as projects; add further real projects as they are ready.

## Artwork

The selected WebP files in `public/art` are original generated illustrations and texture made for this design.
The furin, speaker, wind, brushstrokes, and 404 vines are inline SVG placeholders meant to be replaced with hand-drawn versions: draw black on a transparent PNG, then trace to SVG (e.g. `potrace`) and use `currentColor` for strokes.
Reference artwork and brand packaging were used as visual inspiration, not copied into the site.
The cursive name is currently rendered in Caveat and can later be replaced with your signature.

See `design-qa.md` for the verification record and remaining manual checks.
