import { Link } from 'react-router-dom';
import { Image } from '../../components/ui/Image';
import playground from '@/assets/images/generic/products-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import './hotspots.css';
import { useState, useEffect } from 'react';
import { Loading } from '../../components/ui/Loading';
import { Pen } from '../../components/ui/Pen';
import { ProductsCard } from '../../components/ui/ProductsCard';
import { AddCardButton } from '../../components/ui/AddCardButton';
import { Check } from '../../components/ui/Check';
import { useAuth } from '../../contexts/AuthContext';
import type { ProductCategory } from '../types';

export const Products = () => {
	const testCategories: ProductCategory[] = [
		{
			id: 1,
			title: 'Playgrounds',
			description:
				'From Toddlers to Tweens, our playgrounds are designed for fun and accessibility for all!',
		},
		{
			id: 2,
			title: 'Sports and Fitness',
			description:
				'Functional, full body and integrated, our outfoor sports and fitness equipment is designed to help people achieve their physical goals.',
		},
		{
			id: 3,
			title: 'Electronic Play',
			description:
				'Outdoor electronic playground equipment combines interactivity and movement, designed for players of all ages and abilities.',
		},
		{
			id: 4,
			title: 'Water Play',
			description:
				'Colourful, durable and environmentally responsible water play equipment that lasts!',
		},
	];

	const [categories, setCategories] = useState<ProductCategory[]>(testCategories);
	const [loading, setLoading] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	const { user } = useAuth();

	const hotspotClasses =
		'absolute z-11 bg-brand-orange hover:bg-white hover:text-brand-orange transition p-2 rounded-4xl text-white';

	return (
		<main className='min-h-screen flex flex-col items-center justify-center p-12'>
			{loading ? (
				<Loading />
			) : (
				<div className='flex flex-col items-center min-h-screen space-y-16'>
					{/* Hero Image */}
					<div className='relative rounded-xl overflow-hidden shadow-lg'>
						<Image
							src={playground}
							alt='Playground with hotspots'
							className='w-full h-full object-cover relative z-10'
						/>
						<Link
							to='/products/playgrounds'
							className={`top-[18%] left-[38%] hotspot ${hotspotClasses}`}
						>
							<FontAwesomeIcon icon={faInfo} className='text-lg' /> Playgrounds
						</Link>
						<Link
							to='/products/safety-surfacing'
							className={`top-[58%] left-[69%] hotspot ${hotspotClasses}`}
						>
							<FontAwesomeIcon icon={faInfo} className='text-lg' /> Safety
							Surfacing
						</Link>
						<Link
							to='/products/park-amenities'
							className={`top-[89%] left-[30%] hotspot ${hotspotClasses}`}
						>
							<FontAwesomeIcon icon={faInfo} className='text-lg' /> Park
							Amenities
						</Link>
					</div>

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
							{user && (
								<>
									{isEditMode ? (
										<Check
											onClick={() => setIsEditMode(false)}
											className='text-xl'
										/>
									) : (
										<Pen
											onClick={() => setIsEditMode(true)}
											className='text-xl'
										/>
									)}
								</>
							)}
						</div>
					</div>

					{/* Categories */}
					<div className='grid grid-cols-2 gap-10 max-w-350'>
						{/* ADMIN ONLY --- Add Products Page */}
						{isEditMode && (
							<AddCardButton navigationRoute='/admin/add-edit-products' />
						)}

						{testCategories.map((category) => (
							<ProductsCard
								category={category}
								className='last:odd:col-span-2 last:odd:justify-self-center last:odd:w-1/2'
							/>
						))}
					</div>
				</div>
			)}
		</main>
	);
};
