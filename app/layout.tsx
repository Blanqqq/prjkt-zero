import type { Metadata, Viewport } from "next";
import { AppFrame } from "@/components/AppFrame";
import { PortfolioProvider } from "@/components/PortfolioContext";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "John Paul Giftson — AI & ML Engineer",
    template: "%s — John Paul Giftson",
  },
  description:
    "Portfolio of John Paul Giftson — AI & Machine Learning Engineering student at the University of Manitoba. Building data pipelines, BI dashboards, and intelligent systems.",
  keywords: [
    "John Paul Giftson",
    "AI Engineer",
    "Machine Learning",
    "Data Science",
    "Portfolio",
    "University of Manitoba",
  ],
  authors: [{ name: "John Paul Giftson" }],
  openGraph: {
    title: "John Paul Giftson — AI & ML Engineer",
    description:
      "An exhibition of work in AI, data, and engineering. Curated like a museum.",
    type: "website",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFE4EC",
  width: "device-width",
  initialScale: 1,
};

/**
 * Person schema for Google's knowledge graph. Makes a `John Paul Giftson`
 * search show the right name, role, location, and links in the SERP card.
 */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "John Paul Giftson",
  alternateName: "Blanqqq",
  url: SITE_URL,
  jobTitle: "AI & Machine Learning Engineering Student",
  email: "mailto:johnpaul081023@gmail.com",
  telephone: "+1-951-307-0269",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Winnipeg",
    addressRegion: "MB",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Manitoba",
  },
  sameAs: [
    "https://github.com/Blanqqq",
    "https://www.linkedin.com/in/john-paul-70a213277",
    "https://www.youtube.com/@notblanq",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Engineering",
    "Python",
    "Next.js",
    "PyTorch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Marks JS as available BEFORE first paint so scroll-reveal elements
            can start hidden only when they can actually animate in. Without
            this (no JS / crawlers) content stays fully visible (audit A2). */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-reveal')",
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        <PortfolioProvider>
          <AppFrame>{children}</AppFrame>
        </PortfolioProvider>
      </body>
    </html>
  );
}
