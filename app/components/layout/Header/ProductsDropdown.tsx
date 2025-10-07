import { getAllProductsCategories } from '@/lib/products.repository';
import { LinkType } from '@/app/types';
import { NavLink } from '../../ui/NavLink';

export const ProductsDropdown = async () => {
	const productsCategories = await getAllProductsCategories();
	const productsLinks: LinkType[] = productsCategories.map((category) => ({
		label: category.title,
		to: `/products/${category.slug}`,
	}));

	return (
		<div
			className='flex flex-col absolute z-50 w-60 left-0 top-full bg-white text-black rounded-lg shadow-lg transition-opacity overflow-hidden
               									opacity-0 invisible group-hover:opacity-100 group-hover:visible'
		>
			{productsLinks.length === 0 ? (
				<li className='px-4 py-2 text-gray-400'>No products available</li>
			) : (
				productsLinks.map((sublink) => (
					<NavLink
						key={sublink.label}
						href={sublink.to}
						className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'
                        activeClass='text-brand-orange'
					>
						{sublink.label}
					</NavLink>
				))
			)}
		</div>
	);
};
