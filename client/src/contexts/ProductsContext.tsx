import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import type { LinkType } from '../components/layout/types';
import type { ProductsCategory } from '../pages/types';
import { usePrerender } from './PrerenderContext';

interface ProductsContextType {
  productsCategories: ProductsCategory[];
  setProductsCategories: React.Dispatch<React.SetStateAction<ProductsCategory[]>>;
  productsLinks: LinkType[];
  loading: boolean;
  fetchProductsCategories: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const prerenderData = usePrerender();
  const [productsCategories, setProductsCategories] = useState<ProductsCategory[]>(
    prerenderData?.prProducts?.map((p) => p.category) || [],
  );
  const [productsLinks, setProductsLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(!prerenderData?.prProducts);

  const fetchProductsCategories = useCallback(async () => {
    try {
      const res = await api.get<ProductsCategory[]>('/products');

      const productsLinksArray: LinkType[] = res.data.map((category) => ({
        label: category.title,
        to: `/products/${category.slug}`,
      }));

      setProductsCategories(res.data);
      setProductsLinks(productsLinksArray);
    } catch (err) {
      console.error('Error fetching product categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsCategories();
  }, [fetchProductsCategories]);

  return (
    <ProductsContext.Provider
      value={{
        productsCategories,
        setProductsCategories,
        productsLinks,
        loading,
        fetchProductsCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
};
