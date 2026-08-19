import type { Metadata } from "next";
import { Geist_Mono, Inter, Kanit } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

const geistLabel = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-geist-label",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shravankumar Chinnaram | Senior SAP Commerce Cloud Developer",
  description:
    "Portfolio for Shravankumar Chinnaram, a Senior SAP Commerce Cloud Developer focused on SAP Commerce modules, enterprise integrations, production rollouts, and AI-assisted delivery.",
  openGraph: {
    title: "Shravankumar Chinnaram | Senior SAP Commerce Cloud Developer",
    description:
      "SAP Commerce Cloud specialist with enterprise module ownership, production rollouts, integrations, and AI-assisted delivery workflows.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${kanit.variable} ${inter.variable} ${geistLabel.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
