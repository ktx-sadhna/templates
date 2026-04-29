"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavbarProps } from "../types/index";

export default function Navbar({ nav, brand }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="font-heading font-bold text-2xl text-primary">{brand.name}</div>
        
        <div className="hidden lg:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text hover:text-primary transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="px-6 py-2.5 bg-primary text-primary-fg rounded-full font-semibold hover:bg-accent hover:scale-105 transition-all duration-300"
          >
            {nav.cta.label}
          </a>
        </div>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md text-text hover:bg-surface transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-bg">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-6 py-3 text-text hover:bg-surface hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="block mx-6 my-4 px-6 py-2.5 bg-primary text-primary-fg rounded-full font-semibold text-center hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {nav.cta.label}
          </a>
        </div>
      )}
    </nav>
  );
}
