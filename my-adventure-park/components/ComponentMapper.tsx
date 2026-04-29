"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero"));
const Activities = dynamic(() => import("./Activities"));
const About = dynamic(() => import("./About"));
const Features = dynamic(() => import("./Features"));
const Testimonials = dynamic(() => import("./Testimonials"));
const Contact = dynamic(() => import("./Contact"));

const componentMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  activities: Activities,
  about: About,
  features: Features,
  testimonials: Testimonials,
  contact: Contact,
};

export default function ComponentMapper({ section }: { section: any }) {
  const { id, ...props } = section;
  const Component = componentMap[id];
  
  if (!Component) {
    return null;
  }
  
  return <Component {...{ [id]: props }} />;
}
