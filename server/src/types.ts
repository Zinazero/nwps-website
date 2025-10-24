export interface DbError {
  code?: string;
  message?: string;
}

export interface Park {
  id: number;
  title: string;
  location: string;
  description: string;
  blurb: string;
  slug: string;
}

export interface ParkOrder {
  id: number;
  sort_order: number;
}

export interface PortfolioSection {
  id: number;
  park_id: number;
  title: string;
  description: string;
}

export interface ProductsCategory {
  id: number;
  title: string;
  subheading?: string;
  description: string;
  slug: string;
}

export interface ProductOrder {
  id: number;
  sort_order: number;
}

export interface ProductsSection {
  id: number;
  products_id: number;
  title: string;
  subheading?: string;
  description: string;
  externalLink?: string;
}

export type ContactFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
};
