import { Link, useNavigate } from 'react-router-dom';
import { UnderlineHeader } from '../../components/ui/UnderlineHeader';
import api from '../../api/axios';
import { useEffect, useState } from 'react';
import { parkNavConverter } from '../../utils/parkNavConverter';
import { Loading } from '../../components/ui/Loading';
import { useAuth } from '../../contexts/AuthContext';

interface Park {
	id: number;
	title: string;
	location: string;
	description: string;
}

export const Portfolio = () => {
	const [parks, setParks] = useState<Park[]>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchParks = async () => {
			try {
				const res = await api.get<Park[]>('/parks');
				setParks(res.data);
			} catch (err) {
				console.error('Error fetching parks:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchParks();
	}, []);

	return (
		<main className='min-h-screen flex flex-col items-center p-6 space-y-16'>
			{loading ? (
				<Loading />
			) : (
				<>
					<UnderlineHeader text='Portfolio' withArrow />
					<h2 className='text-4xl font-semibold'>
						Designing Playgrounds That Inspire Imagination and Outdoor Play
					</h2>
					<div className='grid grid-cols-2 lg:grid-cols-4 max-w-350'>
						{/* ADMIN ONLY --- Add Portfolio Item */}
						{user && (
							<button
								type='button'
								onClick={() => navigate('/admin/add-park')}
								className='border-1 min-w-30 border-dashed border-brand-green text-brand-green hover:scale-105 active:scale-100 h-50 rounded-xl text-4xl transition'
							>
								+
							</button>
						)}

						{/* Portfolio Items */}
						{parks.map((park) => {
							const slug = parkNavConverter(park.title);

							return (
								<Link
									key={park.title}
									to={`/portfolio/${slug}`}
									state={{ park, slug }}
								>
									<div className='mx-5 mb-30 relative h-50 hover:scale-105 active:scale-100 transition'>
										<img
											src={`/images/playgrounds/${slug}/${slug}-1.jpg`}
											alt={`${park.title} Image`}
											className='rounded-xl w-full h-full object-cover z-0 relative'
										/>
										<div className='rounded-lg p-3 bg-white flex flex-col text-center w-9/10 mx-auto -mt-12 z-1 relative'>
											<div className='border-b-1 border-dotted p-2'>
												<h3 className='text-2xl font-bold text-brand-orange'>
													{park.title}
												</h3>
												<p className='lg '>{park.location}</p>
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</>
			)}
		</main>
	);
};
