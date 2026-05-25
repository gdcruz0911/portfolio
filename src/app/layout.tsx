import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { personalInfo } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} — ${personalInfo.tagline}`,
  description: personalInfo.about,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
