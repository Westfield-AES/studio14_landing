import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.studio14.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Studio14 — Walk in as you are. Leave iconic.",
    template: "%s — Studio14",
  },
  description:
    "Choose a fully styled three-photo studio shoot, add one clear photo, and step into every frame.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en",
    siteName: "Studio14",
    title: "Studio14 — Walk in as you are. Leave iconic.",
    description:
      "Choose a fully styled three-photo studio shoot, add one clear photo, and step into every frame.",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
