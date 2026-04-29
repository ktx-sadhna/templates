"use client";
import { motion } from "framer-motion";

interface StoryProps {
  story: {
    heading: string;
    text: string;
    image: string;
  };
}

export default function Story({ story }: StoryProps) {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
              {story.heading}
            </h2>
            <p className="text-lg text-text-muted leading-relaxed">
              {story.text}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={story.image}
              alt={story.heading}
              className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
