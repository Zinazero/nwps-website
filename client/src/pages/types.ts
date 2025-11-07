export type Park = {
  id: number;
  title: string;
  location: string;
  description: string;
  blurb: string;
  slug: string;
};

export type ParkSection = {
  id: number;
  title: string;
  description: string;
};

export type ProductsCategory = {
  id: number;
  title: string;
  description: string;
  slug: string;
};

export type ProductsSection = {
  id: number;
  title: string;
  subheading?: string;
  description: string;
  externalLink?: string;
};

export type Provider = {
  title: string;
  blurb?: string;
  description?: string;
  externalLink: string;
  logoSrc: string;
  slug: string;
};

export type Testimonial = {
  title: string;
  blurb: string;
  imageSrc: string;
  skipMask?: boolean;
};

export type StoreItem = {
  id: number;
  increment: number;
  title: string;
};
