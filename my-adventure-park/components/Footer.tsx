import * as LucideIcons from "lucide-react";
import type { FooterProps } from "../types/index";

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-2xl text-primary mb-4">{footer.brandName}</h3>
            <p className="text-text-muted mb-6 max-w-md">{footer.description}</p>
            <div className="flex gap-4">
              {footer.socials.map((social) => {
                const IconComponent = (LucideIcons as any)[social.icon];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-bg flex items-center justify-center text-text hover:bg-primary hover:text-primary-fg transition-all duration-300"
                    aria-label={social.platform}
                  >
                    {IconComponent && <IconComponent size={20} />}
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-text mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footer.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-text mb-4">Legal</h4>
            <ul className="space-y-2">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-text-muted text-sm">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
