import { createContext, type ReactNode, useContext } from 'react';
import type { LinkType } from '../components/layout/types';
import type {
  Park,
  ParkSection,
  ProductsCategory,
  ProductsSection,
  Provider,
  StoreItem,
} from '../pages/types';

interface PrProductsCategory {
  category: ProductsCategory;
  sections: ProductsSection[];
}

interface PrPark {
  park: Park;
  sections: ParkSection[];
}

interface PrerenderData {
  prProducts?: PrProductsCategory[];
  prProductsLinks?: LinkType[];
  prParks?: PrPark[];
  prRecentProjects?: Park[];
  prProjectLinks?: LinkType[];
  prProviders?: Provider[];
  prStoreItems?: StoreItem[];
}

const PrerenderContext = createContext<PrerenderData | null>(null);

export const PrerenderProvider = ({ data, children }: { data: PrerenderData; children: ReactNode }) => {
  return <PrerenderContext.Provider value={data}>{children}</PrerenderContext.Provider>;
};

export const usePrerender = () => useContext(PrerenderContext);
