# Jean Gabriel Dela Cruz · Portfolio

A quiet, japandi-inspired portfolio for my projects, photographs, and a sleeping otter.

## 🌐 Live site

Visit [gdcruz.me](https://gdcruz.me)

## ✨ Features

- **Otter pond**: poke the otter for facts about me, eight in total, shuffled for each visitor
- **Live Spotify**: a mid-century speaker by the pond shows what I'm listening to
- **Drifting gallery**: photo prints that float sideways as you scroll, with catalog-style captions
- **Project showcase**: screenshots or silent looping previews, with live demos and source code
- **Small delights**: a furin to ring, a pinwheel that blows a gust of wind, click sparks, and a hand-drawn 404
- **Resume**: one click from the nav
- **Responsive and gentle**: designed for phones and desktops, and calm for anyone who prefers reduced motion

## 🛠 Tech stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS with hand-written CSS and inline SVG art
- **Fonts**: DM Sans, DM Mono, and Caveat for the signature
- **Testing**: Playwright end-to-end tests
- **Deployment**: Vercel, with GitHub Actions CI
- **APIs**: Spotify Web API

## 🎵 Spotify integration

The speaker shows my currently playing track using the Spotify Web API. It refreshes every minute while the page is open, and when nothing is playing it rests with a quiet "nothing playing".

A Next.js route handler exchanges a long-lived refresh token for short-lived access tokens on the server, so my credentials never reach the browser.

## 🦦 The otter pond

The otter keeps a shuffled deck of facts for each visitor, so nothing repeats until you've found all eight, and your progress is remembered between visits. Each poke wakes it with a hand-drawn speech bubble and a burst of gold sparks.

## 📁 Project structure

```
src/
├── app/               # pages, the Spotify route, 404, and icons
├── components/        # otter pond, speaker, furin, pinwheel, gallery, …
├── data/content.ts    # projects, photos, and otter facts
└── lib/spotify.ts     # Spotify token exchange and now playing
e2e/                   # Playwright tests
public/                # art, photos, and resume
```

## 🎨 Design

- Warm paper with a single indigo ink
- Hand-drawn lines, a brushed ensō for navigation, and a colored-pencil otter
- Gentle, slow motion: wind, drifting prints, and a swaying furin
- Mobile-first, responsive layouts

Crafted with ❤️ by Jean Gabriel Dela Cruz
