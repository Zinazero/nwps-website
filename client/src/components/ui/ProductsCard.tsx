import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import { Image } from './Image';
import type { ProductsCategory } from '../../pages/types';
import { slugConverter } from '../../utils/parkNavConverter';
import { Trash } from './Trash';

interface ProductsCardProps {
	category: ProductsCategory;
	disabled?: boolean;
	isEditMode?: boolean;
	deleteItem?: (category: ProductsCategory) => void;
	className?: string;
}

export const ProductsCard = ({
	category,
	disabled,
	isEditMode,
	deleteItem,
	className,
}: ProductsCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: category.id, disabled });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const slug = slugConverter(category.title);

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`relative ${isEditMode ? 'draggable' : ''} ${className}`}
		>
			<Link to={`/products/${slug}`} state={{ category }}>
				<div className='flex items-center space-x-8 hover:scale-105 transition'>
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
				</div>
			</Link>

			{/* Delete Button */}
			{isEditMode && deleteItem && (
				<Trash
					onClick={() => deleteItem(category)}
					className='absolute top-1 right-6'
				/>
			)}
		</div>
	);
};
