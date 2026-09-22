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

export const metadata: Metadata = {
  title: `${personalInfo.name} - ${personalInfo.tagline}`,
  description: personalInfo.about,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${monoFont.variable} ${signature.variable}`}>
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
