"use client";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero"));
const Services = dynamic(() => import("./Services"));
const About = dynamic(() => import("./About"));
const Testimonials = dynamic(() => import("./Testimonials"));
const Contact = dynamic(() => import("./Contact"));
const Story = dynamic(() => import("./Story"));
const Team = dynamic(() => import("./Team"));
const Values = dynamic(() => import("./Values"));
const Medical = dynamic(() => import("./Medical"));
const Cosmetic = dynamic(() => import("./Cosmetic"));
const Laser = dynamic(() => import("./Laser"));
const Consultation = dynamic(() => import("./Consultation"));
const ContactInfo = dynamic(() => import("./ContactInfo"));
const Faq = dynamic(() => import("./Faq"));
const Insurance = dynamic(() => import("./Insurance"));
const Blog = dynamic(() => import("./Blog"));
const Article = dynamic(() => import("./Article"));
const PageHero = dynamic(() => import("./PageHero"));

const componentMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  services: Services,
  about: About,
  testimonials: Testimonials,
  contact: Contact,
  story: Story,
  team: Team,
  values: Values,
  medical: Medical,
  cosmetic: Cosmetic,
  laser: Laser,
  consultation: Consultation,
  contactInfo: ContactInfo,
  faq: Faq,
  insurance: Insurance,
  blog: Blog,
  article: Article,
  pageHero: PageHero,
};

export default function ComponentMapper({ section }: { section: any }) {
  const { id, ...props } = section;
  const Component = componentMap[id];
  if (!Component) return null;
  return <Component {...{ [id]: props }} />;
}
