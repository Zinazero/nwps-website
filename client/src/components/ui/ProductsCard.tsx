import { Link } from 'react-router-dom';
import { Image } from './Image';
import type { ProductsCategory } from '../../pages/types';
import { slugConverter } from '../../utils/parkNavConverter';

interface ProductsCardProps {
	category: ProductsCategory;
	className?: string;
}

export const ProductsCard = ({ category, className }: ProductsCardProps) => {
	const slug = slugConverter(category.title);

	return (
		<Link
			to={`/products/${slug}`}
			state={{ category }}
			className={`flex items-center space-x-8 hover:scale-105 transition ${className}`}
		>
			<Image
				src='/images/playgrounds/mohawk-park/mohawk-park-1.jpg'
				alt='test-image'
				className='w-54 h-44 rounded-lg object-cover shadow-sm'
			/>
			<div className='flex flex-col space-y-2'>
				<h3 className='text-2xl font-bold text-brand-orange'>
					{category.title}
				</h3>
				<p className='text-lg/relaxed'>{category.description}</p>
			</div>
		</Link>
	);
};
