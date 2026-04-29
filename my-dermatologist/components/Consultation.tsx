"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

interface ConsultationProps {
  consultation: {
    heading: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
    features: string[];
  };
}

export default function Consultation({ consultation }: ConsultationProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-primary-fg rounded-3xl p-12 text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            {consultation.heading}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {consultation.text}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {consultation.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 justify-center">
                <CheckCircle size={20} className="flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <Link
            href={consultation.ctaHref}
            className="inline-flex items-center gap-2 bg-bg text-text px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform group"
          >
            {consultation.ctaLabel}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
