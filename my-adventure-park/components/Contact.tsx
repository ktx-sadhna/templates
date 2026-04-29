import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ContactProps } from "../types/index";

export default function Contact({ contact }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-4">
            {contact.heading}
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {contact.subtext}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4 p-6 bg-surface rounded-xl border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text mb-1">Email</h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-surface rounded-xl border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text mb-1">Phone</h3>
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-surface rounded-xl border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text mb-1">Location</h3>
                <p className="text-text-muted">{contact.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-6 bg-surface rounded-xl border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text mb-1">Hours</h3>
                <p className="text-text-muted">{contact.hours}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-surface p-8 rounded-2xl border border-border">
            <h3 className="font-heading text-2xl font-bold text-text mb-4">
              {contact.ctaText}
            </h3>
            <a
              href={`mailto:${contact.email}`}
              className="block w-full px-8 py-4 bg-primary text-primary-fg rounded-full font-bold text-lg text-center hover:bg-accent hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {contact.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
