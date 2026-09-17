import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { personalInfo } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${signature.variable}`}>
      <body>
        <MotionProvider>
          <a href="#main-content" className="skip-link">skip to content</a>
          <div className="site-shell">
            <Navigation />
            <main id="main-content" tabIndex={-1}>{children}</main>
          </div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
