export interface Brand {
  name: string;
  tagline: string;
  logo: string;
  siteDescription?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Nav {
  links: NavLink[];
  cta: { label: string; href: string };
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface Footer {
  copyright: string;
  navLinks: NavLink[];
  links: NavLink[];
  socials: Social[];
  brandName?: string;
  description?: string;
}

export interface GlobalData {
  theme: string;
  headingFont: string;
  bodyFont: string;
  brand: Brand;
  nav: Nav;
  footer: Footer;
}

// Hero Section
export interface HeroSection {
  id: string;
  headline: string;
  subtext: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: string;
}

export interface HeroProps {
  hero: HeroSection;
}

// Activities Section
export interface Activity {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  image: string;
}

export interface ActivitiesSection {
  id: string;
  heading: string;
  subtext: string;
  activities: Activity[];
}

export interface ActivitiesProps {
  activities: ActivitiesSection;
}

// About Section
export interface Stat {
  value: string;
  label: string;
}

export interface AboutSection {
  id: string;
  heading: string;
  text: string;
  image: string;
  stats: Stat[];
}

export interface AboutProps {
  about: AboutSection;
}

// Features Section
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesSection {
  id: string;
  heading: string;
  subtext: string;
  features: Feature[];
}

export interface FeaturesProps {
  features: FeaturesSection;
}

// Testimonials Section
export interface Testimonial {
  name: string;
  quote: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface TestimonialsSection {
  id: string;
  heading: string;
  subtext: string;
  testimonials: Testimonial[];
}

export interface TestimonialsProps {
  testimonials: TestimonialsSection;
}

// Contact Section
export interface ContactSection {
  id: string;
  heading: string;
  subtext: string;
  email: string;
  phone: string;
  address: string;
  hours: string;
  ctaText: string;
  ctaButton: string;
}

export interface ContactProps {
  contact: ContactSection;
}

// Component Props
export interface NavbarProps {
  nav: Nav;
  brand: Brand;
}

export interface FooterProps {
  footer: Footer;
}
