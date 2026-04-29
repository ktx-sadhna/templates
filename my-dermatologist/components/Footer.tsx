import Link from "next/link";
import * as Icons from "lucide-react";
import type { Footer as FooterType } from "../types";

interface FooterProps {
  footer: FooterType;
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="font-heading font-bold text-2xl text-primary mb-4">
              {footer.brandName}
            </div>
            <p className="text-text-muted leading-relaxed mb-6">
              {footer.description}
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-text">Quick Links</h3>
            <ul className="space-y-3">
              {footer.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-text">Legal</h3>
            <ul className="space-y-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-text">Follow Us</h3>
            <div className="flex gap-4">
              {footer.socials.map((social) => {
                const Icon = (Icons as any)[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center text-text hover:bg-primary hover:text-primary-fg transition-all hover:scale-110"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon size={20} />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-text-muted text-sm">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
