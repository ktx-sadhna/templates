"use client";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  credentials: string;
}

interface TeamProps {
  team: {
    heading: string;
    subtext: string;
    members: TeamMember[];
  };
}

export default function Team({ team }: TeamProps) {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {team.heading}
          </h2>
          <p className="text-xl text-text-muted">
            {team.subtext}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-bg rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-primary font-semibold mb-2">
                  {member.credentials}
                </div>
                <h3 className="font-heading text-2xl font-bold text-text mb-2">
                  {member.name}
                </h3>
                <p className="text-text-muted font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-text-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
