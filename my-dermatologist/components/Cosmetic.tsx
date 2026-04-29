"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface CosmeticProps {
  cosmetic: {
    heading: string;
    subtext: string;
    services: Service[];
  };
}

export default function Cosmetic({ cosmetic }: CosmeticProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {cosmetic.heading}
          </h2>
          <p className="text-xl text-text-muted">
            {cosmetic.subtext}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cosmetic.services.map((service, index) => {
            const Icon = (Icons as any)[service.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-bg rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  {Icon && (
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-fg flex-shrink-0">
                      <Icon size={24} />
                    </div>
                  )}
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-text mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-text-muted">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
