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
}

// TODO: Drop images into /public/gallery/ and add entries here.
export const gallery: GalleryImage[] = [];

// TODO: Replace placeholder URLs.
export const socialLinks = {
  github: "#",
  linkedin: "#",
  email: "mailto:jgdcruz1179@gmail.com",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
