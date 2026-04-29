import * as LucideIcons from "lucide-react";
import type { FeaturesProps } from "../types/index";

export default function Features({ features }: FeaturesProps) {
  return (
    <section id="features" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-4">
            {features.heading}
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {features.subtext}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.features.map((feature, index) => {
            const IconComponent = (LucideIcons as any)[feature.icon];
            return (
              <div
                key={index}
                className="relative p-8 bg-surface rounded-xl border border-border hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  {IconComponent && (
                    <IconComponent size={28} className="text-primary group-hover:text-primary-fg transition-colors" />
                  )}
                </div>
                <h3 className="font-heading text-xl font-bold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
