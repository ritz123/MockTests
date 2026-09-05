import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ThemeProvider } from "../components/ThemeProvider";
import { SITE_DESCRIPTION, SITE_KEYWORDS, HOME_TITLE } from "../lib/seo";
import { SITE_AUTHOR, SITE_NAME, getGoogleSiteVerification, absoluteUrl, getSiteUrl } from "../lib/site";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${HOME_TITLE} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${HOME_TITLE} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

function RootLayoutContent({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <body className={roboto.variable}>
        <div className="site-shell">
          <SiteHeader />
          <div className="site-content">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </ThemeProvider>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content={getGoogleSiteVerification()} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"?"ocean":s==="dark"?"midnight":s;var ok=/^(ocean|sand|rose|midnight|forest|plum)$/.test(t);if(!ok){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"midnight":"ocean"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`,
          }}
        />
      </head>
      <RootLayoutContent>{children}</RootLayoutContent>
    </html>
  );
}
