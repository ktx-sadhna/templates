"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactProps {
  contact: {
    heading: string;
    description: string;
    email: string;
    phone: string;
    address: string;
  };
}

export default function Contact({ contact }: ContactProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {contact.heading}
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {contact.description}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center p-8 bg-bg rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-fg mx-auto mb-4">
              <Mail size={28} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-text mb-2">Email Us</h3>
            <a href={`mailto:${contact.email}`} className="text-text-muted hover:text-primary transition-colors">
              {contact.email}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-8 bg-bg rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-fg mx-auto mb-4">
              <Phone size={28} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-text mb-2">Call Us</h3>
            <a href={`tel:${contact.phone}`} className="text-text-muted hover:text-primary transition-colors">
              {contact.phone}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-8 bg-bg rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-fg mx-auto mb-4">
              <MapPin size={28} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-text mb-2">Visit Us</h3>
            <p className="text-text-muted">
              {contact.address}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
