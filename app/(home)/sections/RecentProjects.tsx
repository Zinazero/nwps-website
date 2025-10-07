import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Park } from '../../types';
import api from '../../../api/axios';
import { ParkCard } from '../../../components/ui/ParkCard';
import { Loading } from '../../../components/ui/Loading';
import { CallToAction } from '../../../components/ui/CallToAction';

export const RecentProjects = () => {
	const [recentProjects, setRecentProjects] = useState<Park[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecentParks = async () => {
			try {
				const res = await api.get<Park[]>('/parks/recent');
				setRecentProjects(res.data);
			} catch (err) {
				console.error('Error fetching parks:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchRecentParks();
	}, []);

	return (
		<section id='recent-projects'>

			{/* Recent Projects */}
			<div className='flex flex-col max-w-400 mx-auto px-20 py-14 space-y-10'>
				<Link to='/portfolio'>
					<div className='flex items-center w-full group'>
						<h2 className='text-5xl font-bold text-nowrap mr-6 group-hover:translate-x-4 transition'>
							Recent Projects
						</h2>
						<hr className='w-full text-brand-orange group-hover:translate-x-4 transition' />
					</div>
				</Link>
				{loading ? (
					<Loading />
				) : (
					<div className='grid grid-cols-1 xl:grid-cols-3 gap-10 text-center'>
						{recentProjects.map((park, i) => (
							<div key={`Recent Project ${i}`}>
								<ParkCard key={park.id} park={park} className='mb-24' />
								<p className='text-lg/loose'>
									{park.blurb || park.description}
								</p>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Call To Action Banner */}
			<CallToAction />
		</section>
	);
};
