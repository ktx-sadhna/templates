"use client";
import { motion } from "framer-motion";
import type { PageHero as PageHeroType } from "../types";

interface PageHeroProps {
  pageHero: PageHeroType;
}

export default function PageHero({ pageHero }: PageHeroProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-surface">
      {pageHero.image && (
        <div className="absolute inset-0 z-0">
          <img
            src={pageHero.image}
            alt={pageHero.heading}
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/50 to-bg"></div>
        </div>
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {pageHero.label}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6">
            {pageHero.heading}
          </h1>
          {pageHero.subtext && (
            <p className="text-xl text-text-muted leading-relaxed">
              {pageHero.subtext}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
