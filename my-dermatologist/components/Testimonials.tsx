"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  quote: string;
  avatar: string;
  role: string;
}

interface TestimonialsProps {
  testimonials: {
    heading: string;
    testimonials: Testimonial[];
  };
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
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
            {testimonials.heading}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-surface rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <Quote className="text-primary mb-4" size={32} />
              <p className="text-text-muted leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-surface"
                />
                <div>
                  <div className="font-semibold text-text">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-text-muted">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
