import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Sparks } from "@/components/Sparks";
import { Wind } from "@/components/Wind";
import { personalInfo } from "@/data/content";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap",
});

const signature = Caveat({ subsets: ["latin"], variable: "--font-signature", display: "swap" });

const INTRO_SCRIPT = `try{if(location.pathname==="/"&&!sessionStorage.getItem("intro")){sessionStorage.setItem("intro","1");var r=document.documentElement;r.classList.add("intro");setTimeout(function(){r.classList.remove("intro")},5500)}}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://gdcruz.me"),
  title: `${personalInfo.name} - ${personalInfo.tagline}`,
  description: personalInfo.about,
  applicationName: "Gabriel Dela Cruz",
  authors: [{ name: personalInfo.name, url: "https://gdcruz.me" }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    url: "https://gdcruz.me",
    siteName: "Gabriel Dela Cruz",
    title: `${personalInfo.name} - ${personalInfo.tagline}`,
    description: personalInfo.about,
    images: [{ url: "/projects/portfolio-home.jpg", width: 1400, height: 740, alt: "Gabriel Dela Cruz's portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - ${personalInfo.tagline}`,
    description: personalInfo.about,
    images: ["/projects/portfolio-home.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${monoFont.variable} ${signature.variable}`} suppressHydrationWarning>
      <head>
        {/* Plays the handwriting intro on the first visit to home each session, before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
          <a href="#main-content" className="skip-link">skip to content</a>
          <Wind />
          <Sparks />
          <div className="site-shell">
            <Navigation />
            <main id="main-content" tabIndex={-1}>{children}</main>
          </div>
          <Footer />
      </body>
    </html>
  );
}
