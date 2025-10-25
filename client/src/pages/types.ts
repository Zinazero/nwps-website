export type Park = {
  id: number;
  title: string;
  location: string;
  description: string;
  blurb: string;
  slug: string;
};

export type ProductsCategory = {
  id: number;
  title: string;
  description: string;
  slug: string;
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
