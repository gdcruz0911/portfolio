# Portfolio content and local setup

## Run and check

```sh
npm run dev
npm run lint
node scripts/check-portfolio.cjs
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
A project has a title, description, and technology list, with optional `demo`, `github`, `walkthrough`, and `poster` URLs.
The walkthrough is a browser-playable video URL, separate from the live website link.
Videos use native controls without autoplay and load only when requested.
Use captioned recordings or provide an accompanying transcript when the recording includes speech.

Gallery entries keep their image dimensions and descriptive alternative text.
The initial project list is intentionally empty.

## Artwork

The selected WebP files in `public/art` are original generated illustrations and texture made for this design.
Reference artwork and brand packaging were used as visual inspiration, not copied into the site.
The cursive name is currently rendered in Caveat and can later be replaced with your signature.

See `design-qa.md` for the verification record and remaining manual checks.
