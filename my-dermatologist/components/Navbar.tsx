"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Nav, Brand } from "../types";

interface NavbarProps {
  nav: Nav;
  brand: Brand;
}

export default function Navbar({ nav, brand }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="font-heading font-bold text-2xl text-primary hover:text-accent transition-colors">
          {brand.name}
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-text hover:text-primary transition-colors font-medium ${
                pathname === link.href ? "text-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.cta.href}
            className="bg-primary text-primary-fg px-6 py-2.5 rounded-full font-semibold hover:bg-accent hover:text-accent-fg transition-all hover:scale-105"
          >
            {nav.cta.label}
          </Link>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md text-text hover:bg-bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-bg">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-6 py-3 text-text hover:bg-bg-muted hover:text-primary transition-colors ${
                pathname === link.href ? "text-primary" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.cta.href}
            className="block mx-6 my-4 text-center bg-primary text-primary-fg px-6 py-3 rounded-full font-semibold hover:bg-accent hover:text-accent-fg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {nav.cta.label}
          </Link>
        </div>
      )}
    </nav>
  );
}
