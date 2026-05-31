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
  github?: string;
}

// TODO: Replace with real projects.
export const projects: Project[] = [];

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
    src: "/gallery/85FB701C-4941-440A-A314-C6B566CABDD0_1_105_c.jpeg",
    alt: "Cherry blossoms in bloom",
    width: 1200,
    height: 2000,
    tags: ["spring", "summerchrome", "fujifilm"],
  }

];

// TODO: Replace placeholder URLs.
export const socialLinks = {
  github: "https://github.com/gdcruz0911",
  linkedin: "https://www.linkedin.com/in/jgdcruz/",
  email: "mailto:jgdcruz1179@gmail.com",
};

export const navItems = [
  { href: "/", label: "Home", accent: "#93C5FD" }, // pastel blue
  { href: "/work", label: "Work", accent: "#F4A6A0" }, // coral
  { href: "/about", label: "About", accent: "#FCD34D" }, // pastel yellow
  { href: "/gallery", label: "Gallery", accent: "#A8D5B5" }, // muted mint
  { href: "/contact", label: "Contact", accent: "#C4B5FD" }, // pastel lavender
] as const;

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
