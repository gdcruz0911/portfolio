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
export const gallery: GalleryImage[] = [];

// TODO: Replace placeholder URLs.
export const socialLinks = {
  github: "https://github.com/gdcruz0911",
  linkedin: "https://www.linkedin.com/in/jgdcruz/",
  email: "mailto:jgdcruz1179@gmail.com",
};

export const navItems = [
  { href: "/", label: "Home", accent: "#1a1a1a" },
  { href: "/work", label: "Work", accent: "#F4A6A0" }, // coral
  { href: "/about", label: "About", accent: "#93C5FD" }, // pastel blue
  { href: "/gallery", label: "Gallery", accent: "#86EFAC" }, // pastel green
  { href: "/contact", label: "Contact", accent: "#FCD34D" }, // pastel yellow
] as const;

export interface NowPlayingTrack {
  title: string;
  artist: string;
  album?: string;
  albumColor: string;
  url?: string;
}

// TODO: Wire up Spotify Web API (/me/player/currently-playing) to replace static fallback.
export const nowPlayingFallback: NowPlayingTrack = {
  title: "Pink + White",
  artist: "Frank Ocean",
  album: "Blonde",
  albumColor: "#F4A6A0",
};

// TODO: Update seasonally. Used in the footer marquee.
export const interests: string[] = [
  "Volleyball",
  "SEVENTEEN",
];
