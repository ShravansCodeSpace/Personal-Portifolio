import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.title}`,
  description: profile.summary,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | SAP Commerce Cloud Specialist`,
    description: profile.summary,
    type: "website",
    url: siteUrl,
    images: [{ url: "/assets/commerce-cloud-hero.webp", width: 1200, height: 675 }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | SAP Commerce Cloud Specialist`,
    description: profile.summary,
    images: ["/assets/commerce-cloud-hero.webp"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
