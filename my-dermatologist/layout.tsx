import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { getGlobalData } from "./lib/content";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

// Load the 2 fonts for this template at module scope (required by Next.js)
const headingFont = DM_Serif_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading", 
  display: "swap",
  weight: "400"
});
const bodyFont = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body", 
  display: "swap",
  weight: ["300", "400", "500", "600", "700"]
});

export function generateMetadata(): Metadata {
  const { brand } = getGlobalData();
  return {
    title: { default: brand.name, template: "%s" },
    description: brand.siteDescription ?? brand.tagline,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { brand, nav, footer, theme } = getGlobalData();
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} ${theme} min-h-screen antialiased`}>
        <Navbar nav={nav} brand={brand} />
        {children}
        <Footer footer={footer} />
      </body>
    </html>
  );
}
