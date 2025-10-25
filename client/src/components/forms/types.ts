import type { StoreItem } from '../../pages/types';

export type Section = ParkSection | ProductsSection;

export interface ParkSection {
  title: string;
  description: string;
  image: File | null;
}

export interface ProductsSection {
  title: string;
  subheading?: string;
  description: string;
  image: File | null;
  externalLink?: string;
}

export type SectionFormProps =
  | {
      formType: 'park';
      section: ParkSection;
      index: number;
      setSection: (section: ParkSection) => void;
      dropSection: (index: number, section: ParkSection) => void;
    }
  | {
      formType: 'products';
      section: ProductsSection;
      index: number;
      setSection: (section: ProductsSection) => void;
      dropSection: (index: number, section: ProductsSection) => void;
    };

export type LoginFormValues = {
  username: string;
  password: string;
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

export interface OrderItem extends StoreItem {
  quantity: number;
}

export type Cart = {
  cart: OrderItem[];
};

export type OrderFormValues = Cart & ContactFormValues & ShippingFieldsetValues;
