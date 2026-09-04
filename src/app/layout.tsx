import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aptitude Practice",
  description: "Timed multiple-choice mock tests for interview practice.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${sourceSans.variable}`}>{children}</body>
    </html>
  );
}
