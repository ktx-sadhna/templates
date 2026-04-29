"use client";

import * as LucideIcons from "lucide-react";
import type { ActivitiesProps } from "../types/index";

export default function Activities({ activities }: ActivitiesProps) {
  return (
    <section id="activities" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-4">
            {activities.heading}
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {activities.subtext}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.activities.map((activity, index) => {
            const IconComponent = (LucideIcons as any)[activity.icon];
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-surface hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-fg">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold text-text mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-text-muted mb-4 leading-relaxed">
                    {activity.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div>
                      <span className="text-sm text-text-muted">Duration</span>
                      <p className="font-semibold text-text">{activity.duration}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-text-muted">Difficulty</span>
                      <p className="font-semibold text-text">{activity.difficulty}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
