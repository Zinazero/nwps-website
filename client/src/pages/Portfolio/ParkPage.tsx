import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Loading } from '../../components/ui/Loading';
import { Image } from '../../components/ui/Image';

interface Section {
	id: number;
	title: string;
	description: string;
}

export const ParkPage = () => {
	const [sections, setSections] = useState<Section[]>([]);
	const [loading, setLoading] = useState(true);

	const { state } = useLocation();
	const park = state?.park;
	const slug = state?.slug;

	if (!park) return <p>No park data found.</p>;

	useEffect(() => {
		const fetchSections = async () => {
			try {
				const res = await api.get<Section[]>(`/parks/${park.id}`);
				setSections(res.data);
			} catch (err) {
				console.error('Error fetching portfolio sections:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchSections();
	}, []);

	useEffect(() => {
		console.log(sections);
	}, [sections]);

	return (
		<main className='min-h-screen flex flex-col items-center justify-center space-y-12 bg-white p-16'>
			{loading ? (
				<Loading />
			) : (
				<>
					{/* Hero */}
					<div className='p-6 flex flex-col items-center space-y-12'>
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

					{/* Other Sections */}
					{sections.map((section, index) => (
						<div
							className={`flex items-center justify-center max-w-300 space-x-12 ${
								index % 2 !== 0 ? 'flex-row-reverse' : ''
							}`}
						>
							<Image
								src={`/images/playgrounds/${slug}/${slug}-${index + 2}.jpg`}
								alt={`${section.title} Image`}
								className='w-150 rounded-xl'
							/>
							<div className='flex flex-col space-y-4'>
								<h2 className='text-3xl font-bold'>{section.title}</h2>
								<p className='text-lg '>{section.description}</p>
							</div>
						</div>
					))}
				</>
			)}
		</main>
	);
};
