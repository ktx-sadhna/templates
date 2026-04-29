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

export interface PageHero {
  id: string;
  label: string;
  heading: string;
  subtext?: string;
  image?: string;
}
