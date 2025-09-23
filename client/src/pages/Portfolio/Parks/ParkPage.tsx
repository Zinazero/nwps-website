import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Loading } from '../../../components/ui/Loading';
import { Image } from '../../../components/ui/Image';
import { Pen } from '../../../components/ui/Pen';
import type { Park } from '../../types';

interface Section {
	id: number;
	title: string;
	description: string;
}

export const ParkPage = () => {
	const { state } = useLocation();
	const [park, setPark] = useState<Park>(state?.park);
	const [sections, setSections] = useState<Section[]>([]);
	const [loading, setLoading] = useState(true);

	const { park: slug } = useParams<{ park: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			if (!park) {
				// Fetch park by slug
				try {
					const res = await api.get(`/parks/by-park/${slug}`);
					setPark(res.data.park);
					setSections(res.data.sections || []);
				} catch (err) {
					console.error('Error fetching park:', err);
				} finally {
					setLoading(false);
				}
			} else {
				// Fetch sections for existing park
				try {
					const res = await api.get<Section[]>(`/parks/${park.id}`);
					setSections(res.data);
				} catch (err) {
					console.error('Error fetching portfolio sections:', err);
				} finally {
					setLoading(false);
				}
			}
		};

		fetchData();
	}, [park, slug]);

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
					<div className='p-6 flex flex-col items-center space-y-12'>
						{park && (
							<Image
								src={`/images/playgrounds/${slug}/${slug}-1.jpg`}
								alt={`${park.title} Image 1`}
								className='w-full max-w-250 rounded-xl'
							/>
						)}
						<div className='text-center max-w-300 space-y-4'>
							<div>
								<h1 className='text-5xl font-bold'>{park.title}</h1>
								<h3 className='text-lg text-grey'>{park.location}</h3>
							</div>
							<p className='text-xl '>{park.description}</p>
						</div>
					</div>

					{/* Other Sections */}
					{sections.map((section, index) => (
						<div
							key={`Section ${index}`}
							className={`flex items-center justify-center max-w-300 space-x-12 ${
								index % 2 !== 0 ? 'flex-row-reverse' : ''
							}`}
						>
							{park && (
								<Image
									src={`/images/playgrounds/${slug}/${slug}-${index + 2}.jpg`}
									alt={`${section.title} Image`}
									className='w-150 rounded-xl'
								/>
							)}
							<div className='flex flex-col space-y-4'>
								<h2 className='text-3xl font-bold'>{section.title}</h2>
								<p className='text-lg '>{section.description}</p>
							</div>
						</div>
					))}
				</>
			)}

			{/* Edit Button */}
			<Pen
				onClick={handleEditPark}
				className='absolute top-10 right-10 text-2xl'
			/>
		</main>
	);
};
