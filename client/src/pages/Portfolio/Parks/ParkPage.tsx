import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Loading } from '../../../components/ui/Loading';
import { Image } from '../../../components/ui/Image';
import { Pen } from '../../../components/ui/Pen';
import type { Park } from '../../types';
import { useAuth } from '../../../contexts/AuthContext';

interface ParkSection {
	id: number;
	title: string;
	description: string;
}

export const ParkPage = () => {
	const { user } = useAuth();
	const { state } = useLocation();
	const [park, setPark] = useState<Park>(state?.park);
	const [sections, setSections] = useState<ParkSection[]>([]);
	const [loading, setLoading] = useState(true);

	const { park: slug } = useParams<{ park: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				if (state?.park && state.park.slug === slug) {
					// Use preloaded park from state, still fetch sections
					setPark(state.park);
					const res = await api.get<ParkSection[]>(`/parks/${state.park.id}`);
					setSections(res.data);
				} else {
					// Fallback to full fetch by slug
					const res = await api.get(`/parks/by-slug/${slug}`);
					setPark(res.data.park);
					setSections(res.data.sections || []);
				}
			} catch (err) {
				console.error('Error fetching park:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [slug, state?.park]);

	const handleEditPark = () => {
		const parkId = park.id;
		const parkCity = park.location.replace(', Ontario', '');
		const parkBlurb = park.blurb;
		const parkSections = [park, ...sections].map((section, index) => ({
			...section,
			image: `/images/playgrounds/${slug}/${slug}-${index + 1}.jpg`,
		}));
		navigate('/admin/add-edit-park', {
			state: { parkId, parkCity, parkBlurb, parkSections },
		});
	};

	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center space-y-12 bg-white p-16'>
			{loading ? (
				<Loading />
			) : (
				<>
					{/* Hero */}
					{park && (
						<div className='p-6 flex flex-col items-center space-y-12 border-b-1 border-transparent-grey pb-8 xl:border-0'>
							<Image
								src={`/images/playgrounds/${slug}/${slug}-1.jpg`}
								alt={`${park.title} Image 1`}
								className='w-full max-w-250 rounded-xl'
							/>
							<div className='text-center max-w-300 space-y-4'>
								<div>
									<h1 className='text-5xl font-bold'>{park.title}</h1>
									<h3 className='text-lg text-grey'>{park.location}</h3>
								</div>
								<p className='text-xl '>{park.description}</p>
							</div>
						</div>
					)}

					{/* Other Sections */}
					{sections.map((section, index) => (
						<div
							key={`Section ${index}`}
							className={`
								flex flex-col xl:flex-row items-center justify-center max-w-400
								space-y-12 xl:space-y-0 border-b-1 border-transparent-grey pb-8 xl:border-0
								${index % 2 !== 0 ? 'xl:flex-row-reverse' : ''}`}
						>
							{park && (
								<Image
									src={`/images/playgrounds/${slug}/${slug}-${index + 2}.jpg`}
									alt={`${section.title} Image`}
									className='w-150 rounded-xl'
								/>
							)}
							<div className='flex flex-col space-y-4 max-w-200 mx-12'>
								<h2 className='text-3xl font-bold'>{section.title}</h2>
								<p className='text-lg '>{section.description}</p>
							</div>
						</div>
					))}
				</>
			)}

			{/* Edit Button */}
			{user && (
				<Pen
					onClick={handleEditPark}
					className='absolute top-10 right-10 text-2xl'
				/>
			)}
		</main>
	);
};
