import type { LinkType } from '../src/components/layout/types';
import type {
  Park,
  ParkSection,
  ProductsCategory,
  ProductsSection,
  Provider,
  StoreItem,
} from '../src/pages/types';

export type PrProductsCategory = {
  category: ProductsCategory;
  sections: ProductsSection[];
};

export type PrPark = {
  park: Park;
  sections: ParkSection[];
};

export type PrerenderData = {
  prProducts?: PrProductsCategory[];
  prProductsLinks?: LinkType[];
  prProviders?: Provider[];
  prParks?: PrPark[];
  prRecentProjects?: Park[];
  prProjectLinks?: LinkType[];
  prStoreItems?: StoreItem[];
};
