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

export const Products = () => {
	const [loading, setLoading] = useState(false);

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
							to='/'
							className={`top-[18%] left-[38%] hotspot ${hotspotClasses}`}
						>
							<FontAwesomeIcon icon={faInfo} className='text-lg' /> Playgrounds
						</Link>
						<Link
							to='/'
							className={`top-[58%] left-[69%] hotspot ${hotspotClasses}`}
						>
							<FontAwesomeIcon icon={faInfo} className='text-lg' /> Safety
							Surfacing
						</Link>
						<Link
							to='/'
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
							<Pen
								onClick={() => {
									console.log('clicked!');
								}}
								className='text-xl'
							/>
						</div>
					</div>

					{/* Categories */}
					<div className='grid grid-cols-2 max-w-350'>
						{[1, 1, 1, 1, 1, 1, 1].map((card) => (
							<ProductsCard className='last:odd:col-span-2 last:odd:justify-self-center last:odd:w-1/2' />
						))}
					</div>
				</div>
			)}
		</main>
	);
};
