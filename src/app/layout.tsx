import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aptitude Practice",
  description: "Timed multiple-choice mock tests for interview practice.",
  icons: { icon: "/favicon.svg" },
};

function RootLayoutContent({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <body className={roboto.variable}>{children}</body>
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <RootLayoutContent>{children}</RootLayoutContent>
    </html>
  );
}
