"use client";
import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface AboutProps {
  about: {
    heading: string;
    text: string;
    image: string;
    stats: Stat[];
  };
}

export default function About({ about }: AboutProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={about.image}
                alt={about.heading}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary text-primary-fg rounded-2xl p-8 shadow-xl">
              <div className="text-4xl font-heading font-bold mb-1">{about.stats[0].value}</div>
              <div className="text-sm opacity-90">{about.stats[0].label}</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
              {about.heading}
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              {about.text}
            </p>
            <div className="grid grid-cols-2 gap-8">
              {about.stats.slice(1).map((stat, index) => (
                <div key={index} className="text-center p-6 bg-bg rounded-xl border border-border">
                  <div className="text-3xl font-heading font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
