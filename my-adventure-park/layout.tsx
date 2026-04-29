import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import { getGlobalData } from "./lib/content";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

// Load the 2 fonts for this template at module scope (required by Next.js)
const headingFont = Archivo_Black({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: "--font-heading", 
  display: "swap" 
});

const bodyFont = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body", 
  display: "swap" 
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { brand, nav, footer, theme } = getGlobalData();
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} ${theme}`}>
        <Navbar nav={nav} brand={brand} />
        {children}
        <Footer footer={footer} />
      </body>
    </html>
  );
}
