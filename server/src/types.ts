export type DbError = {
  code?: string;
  message?: string;
};

export type Park = {
  id: number;
  title: string;
  location: string;
  description: string;
  blurb: string;
  slug: string;
};

export type ParkOrder = {
  id: number;
  sort_order: number;
};

export type PortfolioSection = {
  id: number;
  park_id: number;
  title: string;
  description: string;
};

export type ProductsCategory = {
  id: number;
  title: string;
  subheading?: string;
  description: string;
  slug: string;
};

export type ProductOrder = {
  id: number;
  sort_order: number;
};

export type ProductsSection = {
  id: number;
  products_id: number;
  title: string;
  subheading?: string;
  description: string;
  externalLink?: string;
};

export type ContactFieldsetValues = {
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
};

export type MessageValue = {
  message: string;
};

export type ContactFormValues = ContactFieldsetValues & MessageValue;

export type ShippingFieldsetValues = {
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
};

export type StoreItem = {
  id: number;
  increment: number;
  title: string;
};

export interface OrderItem extends StoreItem {
  quantity: number;
}

export type OrderInfo = ContactFormValues & ShippingFieldsetValues;

export interface InvoiceInfo extends OrderInfo {
  orderNumber: string;
}

export type Field = {
  label: string;
  info: string;
}
