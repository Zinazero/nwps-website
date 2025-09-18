import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import nwpsVerticalLogo from '@/assets/logos/nwps-vertical-logo.svg';
import type { Park } from '../../types';
import api from '../../../api/axios';
import { ParkCard } from '../../../components/ui/ParkCard';
import { Loading } from '../../../components/ui/Loading';

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
					<div className='grid grid-cols-3 gap-10 text-center'>
						{recentProjects.map((park) => (
							<div>
								<ParkCard key={park.id} park={park} />
								<p>{park.blurb || park.description}</p>
							</div>
						))}
					</div>
				)}
			</div>
			<div className='max-w-300 xl:mx-auto mx-20 mb-20 rounded-2xl shadow-2xl bg-brand-blue-light p-12 flex items-center'>
				<img
					src={nwpsVerticalLogo}
					alt='NWPS Logo'
					className='h-48'
					draggable={false}
				/>
				<div className='flex-1 flex flex-col items-center gap-6'>
					<p className='text-4xl text-brand-orange'>
						Not sure which product to choose?
					</p>
					<div className='flex gap-2 text-4xl font-bold'>
						<h3 className='text-brand-blue'>{'Call Us (519) 304-3437 or'}</h3>
						<Link
							to='/contact'
							className='text-white hover:text-brand-orange transition'
						>
							Get In Touch
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
