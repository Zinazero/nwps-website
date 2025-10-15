'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Park } from '../../types';
import { Trash } from './Trash';
import { slugConverter } from '../../utils/slugConverter';
import Image from 'next/image';
import Link from 'next/link';

interface ParkCardProps {
	park: Park;
	disabled?: boolean;
	isEditMode?: boolean;
	deleteItem?: (park: Park) => void;
	className?: string;
}

export const ParkCard = ({
	park,
	disabled,
	isEditMode,
	deleteItem,
	className,
}: ParkCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: park.id, disabled });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const slug = slugConverter(park.title);

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`relative ${isEditMode ? 'draggable' : ''}`}
		>
			{/* Item Card */}
			<Link
				href={`/portfolio/${slug}`}
				className={isEditMode ? 'pointer-events-none' : ''}
			>
				<div
					className={`${className} mx-5 relative h-50 hover:scale-105 active:scale-100 transition`}
				>
					<Image
						src={`/images/playgrounds/${slug}/${slug}-1.jpg`}
						alt={`${park.title} Image`}
						fill
						className='rounded-xl object-cover z-0 relative'
					/>
					<div className='rounded-lg p-3 bg-white flex flex-col text-center w-9/10 z-1 absolute top-5/7 left-1/2 -translate-x-1/2'>
						<div className='border-b-1 border-dotted p-2'>
							<h3 className='text-2xl font-bold text-brand-orange'>
								{park.title}
							</h3>
							<p className='lg'>{park.location}</p>
						</div>
					</div>
				</div>
			</Link>

			{/* Delete Button */}
			{isEditMode && deleteItem && (
				<Trash
					onClick={() => deleteItem(park)}
					className='absolute top-1 right-6'
				/>
			)}
		</div>
	);
};
