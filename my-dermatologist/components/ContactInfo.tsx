"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface Hours {
  days: string;
  time: string;
}

interface ContactInfoProps {
  contactInfo: {
    heading: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    hours: Hours[];
  };
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {contactInfo.heading}
          </h2>
          <p className="text-xl text-text-muted">
            {contactInfo.description}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface rounded-2xl p-8 border border-border"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-fg flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-text mb-2">Email</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-text-muted hover:text-primary transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-fg flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-text mb-2">Phone</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-text-muted hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-fg flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-text mb-2">Address</h3>
                  <p className="text-text-muted">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface rounded-2xl p-8 border border-border"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-fg flex-shrink-0">
                <Clock size={24} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-text">Office Hours</h3>
            </div>
            <div className="space-y-4 ml-16">
              {contactInfo.hours.map((hour, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-text font-medium">{hour.days}</span>
                  <span className="text-text-muted">{hour.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
