import { LinkType } from '@/app/types';
import { getAllProductsCategories } from '@/lib/products.repository';
import { NavLink } from '../../ui/NavLink';

export const FooterLinks = async () => {
	const productsCategories = await getAllProductsCategories();
	const productsLinks: LinkType[] = productsCategories.map((category) => ({
		label: category.title,
		to: `/products/${category.slug}`,
	}));

	return (
		<div className='flex flex-col border-l border-transparent-grey px-8 space-y-10'>
			<div>
				<h5 className='text-2xl font-semibold'>OUR PRODUCTS</h5>
				<div className='w-10 border-b-2 border-brand-orange border-dotted mt-3'></div>
			</div>
			<ul className='space-y-4'>
				{productsLinks.length === 0 ? (
					<li className='px-4 py-2 text-gray-400'>No products available</li>
				) : (
					productsLinks.map((link) => (
						<li key={link.label}>
							<NavLink
								href={link.to}
								className='text-xl curser-pointer hover:text-brand-green transition'
                                activeClass='text-brand-green'
							>
								{link.label}
							</NavLink>
						</li>
					))
				)}
			</ul>
		</div>
	);
};
