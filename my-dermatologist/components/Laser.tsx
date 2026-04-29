"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface Treatment {
  title: string;
  description: string;
  icon: string;
}

interface LaserProps {
  laser: {
    heading: string;
    subtext: string;
    treatments: Treatment[];
  };
}

export default function Laser({ laser }: LaserProps) {
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
            {laser.heading}
          </h2>
          <p className="text-xl text-text-muted">
            {laser.subtext}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {laser.treatments.map((treatment, index) => {
            const Icon = (Icons as any)[treatment.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-surface rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 text-center"
              >
                {Icon && (
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-fg mx-auto mb-6">
                    <Icon size={32} />
                  </div>
                )}
                <h3 className="font-heading text-xl font-bold text-text mb-4">
                  {treatment.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {treatment.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
