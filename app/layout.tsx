import type { Metadata, Viewport } from "next";
import { AppFrame } from "@/components/AppFrame";
import { PortfolioProvider } from "@/components/PortfolioContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://giftson.dev"),
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PortfolioProvider>
          <AppFrame>{children}</AppFrame>
        </PortfolioProvider>
      </body>
    </html>
  );
}
