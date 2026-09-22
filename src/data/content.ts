export const personalInfo = {
  name: "Jean Gabriel Dela Cruz",
  shortName: "Gabriel",
  tagline: "Creating thoughtful digital experiences.",
  about:
    "Hi, I'm Gabriel, a student at the University of Virginia and an aspiring full-stack developer. I want to create software that is not only functional but also delightful to use. I'm always looking for new things to learn and ways to improve. When I'm not coding, you can find me cafe-hopping, experimenting with photography, or playing volleyball.",
  email: "jgdcruz1179@gmail.com",
};

export interface Project {
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  preview?: { src: string; width: number; height: number };
  video?: string;
  poster?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "mahjong club at uva",
    preview: { src: "/projects/mahjong.jpg", width: 1400, height: 570 },
    description: "a website for the mahjong club at uva, with meeting information and club updates. officers can propose content changes through Google Sheets, with reviewed updates published through GitHub Pages.",
    tech: ["Next.js", "React", "TypeScript", "Python", "GitHub Pages"],
    demo: "https://mahjongclub-uva.github.io/mahjongclub-site/",
    github: "https://github.com/mahjongclub-uva/mahjongclub-site",
  },
  {
    title: "personal portfolio",
    preview: { src: "/projects/portfolio.jpg", width: 1400, height: 740 },
    description: "a home for my projects, photographs, and a little of what i enjoy. built with responsive layouts, a Spotify now-playing widget, and a sleeping otter.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    demo: "/",
    github: "https://github.com/gdcruz0911/portfolio",
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  tags?: string[];
}

// TODO: Drop images into /public/gallery/ and add entries here.
// Example:
// {
//   src: "/gallery/cafe-01.jpg",
//   alt: "Espresso cup on marble counter",
//   width: 1200,
//   height: 1500,
//   tags: ["cafe", "fujifilm"],
// }
export const gallery: GalleryImage[] = [
  {
    src: "/gallery/4FB0A59E-B4DE-4216-99B7-2AFE168D8942_1_105_c.jpeg",
    alt: "Restaurant patio lit by warm string lights at night",
    width: 724,
    height: 1086,
  },
  {
    src: "/gallery/6F809C5E-1824-4049-91DB-FF4794F74F6F_1_105_c.jpeg",
    alt: "Glass high-rise viewed from the street against a blue sky",
    width: 724,
    height: 1086,
  },
  {
    src: "/gallery/8240FC1B-6D87-4DA9-84F9-2C75FD849F8D_4_5005_c.jpeg",
    alt: "Reflecting pool between pale modern buildings on an overcast day",
    width: 360,
    height: 540,
  },
  {
    src: "/gallery/85FB701C-4941-440A-A314-C6B566CABDD0_1_105_c.jpeg",
    alt: "Cherry blossoms in bloom",
    width: 724,
    height: 1086,
  },
  {
    src: "/gallery/B39745DA-C0BD-43E7-AED0-3CB064E32E59_4_5005_c.jpeg",
    alt: "Waterfront with small boats and a distant ferris wheel",
    width: 360,
    height: 450,
  },
  {
    src: "/gallery/DE75A9CC-95B6-4044-88AC-440FC257D8AE_1_105_c.jpeg",
    alt: "Pink roses in warm afternoon sunlight",
    width: 724,
    height: 1086,
  },
];

// TODO: Replace placeholder URLs.
export const socialLinks = {
  github: "https://github.com/gdcruz0911",
  linkedin: "https://www.linkedin.com/in/jgdcruz/",
  email: "mailto:jgdcruz1179@gmail.com",
  resume: "/resume.pdf",
};

export const navItems = [
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/gallery", label: "gallery" },
] as const;

// Pulled from the about page's notes and interests. The otter hands these out in a shuffled order.
export const otterFacts: string[] = [
  "i'm studying at the university of virginia.",
  "lately i'm building with typescript, react, and next.js.",
  "python is in the toolbox too.",
  "oolong tea or matcha, always.",
  "away from the keyboard, i go café-hopping.",
  "i take photographs. the gallery has a few.",
  "you might find me playing volleyball.",
  "plants and a good playlist make any room better.",
]

export interface NowPlayingTrack {
  title: string;
  artist: string;
  album?: string;
  albumColor?: string;
  albumImage?: string;
  isPlaying?: boolean;
  url?: string;
}

// Messages shown when Spotify isn't returning a track (paused, away, or env vars missing).
// One is picked at random server-side; rotates every ~60s with the page cache.
export const awayMessages: string[] = [
  "probably sleeping",
  "probably playing volleyball",
  "off the grid right now",
  "currently vibing in silence",
  "choosing my next obsession",
];

// TODO: Update seasonally. Used in the footer marquee.
export const interests: string[] = [
  "volleyball",
  "SEVENTEEN",
  "dry malatang",
  "Persona 3 Reload",
  "mangoes",
  "oolong tea",
  "We Are All Trying Here",
  "Project Hail Mary",
  "'How to Pretend' by Lucy Bedroque",
  "cafe-hopping",
];

export const projectSlug = (project: Project) => project.title.replaceAll(" ", "-");
