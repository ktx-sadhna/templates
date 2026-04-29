"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Question {
  question: string;
  answer: string;
}

interface FaqProps {
  faq: {
    heading: string;
    questions: Question[];
  };
}

export default function Faq({ faq }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {faq.heading}
          </h2>
        </motion.div>
        <div className="space-y-4">
          {faq.questions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-bg rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-muted transition-colors"
              >
                <span className="font-heading font-semibold text-lg text-text pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-text-muted leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
