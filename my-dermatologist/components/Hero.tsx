"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  hero: {
    heading: string;
    subtext: string;
    image: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
}

export default function Hero({ hero }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.image}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/80 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-6 leading-tight">
            {hero.heading}
          </h1>
          <p className="text-xl md:text-2xl text-text-muted mb-10 leading-relaxed">
            {hero.subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 bg-primary text-primary-fg px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-accent-fg transition-all hover:scale-105 group"
            >
              {hero.primaryCta.label}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 bg-surface text-text border-2 border-border px-8 py-4 rounded-full font-semibold text-lg hover:border-primary hover:text-primary transition-all"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
