"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface InsuranceProps {
  insurance: {
    heading: string;
    text: string;
    providers: string[];
  };
}

export default function Insurance({ insurance }: InsuranceProps) {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {insurance.heading}
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            {insurance.text}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-surface rounded-2xl p-10 border border-border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insurance.providers.map((provider, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="text-primary flex-shrink-0" size={24} />
                <span className="text-text font-medium">{provider}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
