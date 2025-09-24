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
import type { ProductsCategory } from '../types';
import api from '../../api/axios';

export const Products = () => {


	const [categories, setCategories] = useState<ProductsCategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [isEditMode, setIsEditMode] = useState(false);
	const { user } = useAuth();

    useEffect(() => {
        const fetchProductsCategories = async () => {
            try {
                const res = await api.get<ProductsCategory[]>('/products');
                setCategories(res.data);
            } catch (err) {
                console.error('Error fetching product categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsCategories();
    }, []);

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
							<AddCardButton navigationRoute='/admin/add-edit-products' className='min-w-100 min-h-40 last:odd:col-span-2 last:odd:justify-self-center' />
						)}

						{categories.map((category) => (
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
