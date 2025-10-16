import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ProductsCategory } from '@/types';
import { Trash } from './Trash';
import Image from 'next/image';
import Link from 'next/link';

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

	const slug = category.slug;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`relative ${isEditMode ? 'draggable' : ''} ${className}`}
		>
			<Link
				href={`/products/${slug}`}
				className={isEditMode ? 'pointer-events-none' : ''}
			>
				{/* state={{ category }} */}
				<div className='flex flex-col lg:flex-row items-center text-center lg:text-left space-x-8 space-y-4 lg:space-y-0 hover:scale-105 transition'>
					<div className='min-w-54 w-54 h-44 rounded-lg overflow-hidden shadow-sm relative'>
						<Image
							src={`/images/products/${slug}/${slug}-1.jpg`}
							alt={`${category.title} Image`}
							fill
							className='object-cover'
						/>
					</div>
					<div className='flex flex-col space-y-2'>
						<h3 className='text-2xl font-bold text-brand-orange line-clamp-2'>
							{category.title}
						</h3>
						<p className='text-lg/relaxed line-clamp-4'>
							{category.description}
						</p>
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
