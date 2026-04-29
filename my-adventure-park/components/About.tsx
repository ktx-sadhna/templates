import type { AboutProps } from "../types/index";

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
              {about.heading}
            </h2>
            <p className="text-lg text-text-muted leading-relaxed whitespace-pre-line">
              {about.text}
            </p>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={about.image}
                alt={about.heading}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {about.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-bg rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-text-muted font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
