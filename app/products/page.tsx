import { getAllProductsCategories } from '@/lib/products.repository';
import { Categories } from './sections/Categories';
import { HotspotImage } from './sections/HotspotImage';

const Products = async () => {
	const categories = await getAllProductsCategories();

	return (
		<main className='min-h-screen flex flex-col items-center justify-center p-12'>
			<div className='flex flex-col items-center min-h-screen space-y-16'>
				<HotspotImage />

				{/* Blurb */}
				<div className='mx-40'>
					<p className='text-xl/relaxed text-center'>
						Since 2008, we’ve built playgrounds exemplifying our belief that
						play is for everyone, regardless of ability. That’s why we make
						inclusion a priority – not an option.
					</p>
				</div>

				{/* Headers */}
				<div className='flex flex-col text-center space-y-12'>
					<h2 className='text-4xl font-semibold text-brand-orange'>
						Let’s make playing fun!
					</h2>
					<div className='flex items-center space-x-4'>
						<h1 className='text-6xl font-bold'>Product Categories</h1>
					</div>
				</div>
				{/* Product Categories */}
				<Categories categories={categories} />
			</div>
		</main>
	);
};

export default Products;
