import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import type { ProductsCategory } from '../pages/types';
import type { ReactNode } from 'react';
import type { LinkType } from '../components/layout/types';

interface ProductsContextType {
	productsCategories: ProductsCategory[];
	setProductsCategories: React.Dispatch<
		React.SetStateAction<ProductsCategory[]>
	>;
	productsLinks: LinkType[];
	loading: boolean;
	fetchProductsCategories: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
	undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
	const [productsCategories, setProductsCategories] = useState<
		ProductsCategory[]
	>([]);
	const [productsLinks, setProductsLinks] = useState<LinkType[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchProductsCategories = async () => {
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
	};

	useEffect(() => {
		fetchProductsCategories();
	}, []);

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
	if (!context)
		throw new Error('useProducts must be used within a ProductsProvider');
	return context;
};
