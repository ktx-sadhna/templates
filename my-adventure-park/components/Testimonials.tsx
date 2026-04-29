"use client";

import { Star } from "lucide-react";
import type { TestimonialsProps } from "../types/index";

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-4">
            {testimonials.heading}
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {testimonials.subtext}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-bg p-8 rounded-2xl border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" className="text-accent" />
                ))}
              </div>
              
              <p className="text-text-muted italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <div className="font-semibold text-text">{testimonial.name}</div>
                  <div className="text-sm text-text-muted">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
