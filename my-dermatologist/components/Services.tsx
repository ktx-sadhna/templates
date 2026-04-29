"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServicesProps {
  services: {
    heading: string;
    subtext: string;
    services: Service[];
    exploreHref?: string;
  };
}

export default function Services({ services }: ServicesProps) {
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
            {services.heading}
          </h2>
          <p className="text-xl text-text-muted">
            {services.subtext}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.services.map((service, index) => {
            const Icon = (Icons as any)[service.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                  {Icon && (
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-fg">
                      <Icon size={24} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-text mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        {services.exploreHref && (
          <div className="text-center">
            <Link
              href={services.exploreHref}
              className="inline-flex items-center gap-2 bg-primary text-primary-fg px-8 py-4 rounded-full font-semibold hover:bg-accent hover:text-accent-fg transition-all hover:scale-105 group"
            >
              View All Services
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
