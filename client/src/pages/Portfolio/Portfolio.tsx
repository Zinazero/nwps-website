import { Link, useNavigate } from 'react-router-dom';
import { UnderlineHeader } from '../../components/ui/UnderlineHeader';
import api from '../../api/axios';
import { useEffect, useState } from 'react';
import { parkNavConverter } from '../../utils/parkNavConverter';
import { Loading } from '../../components/ui/Loading';
import { useAuth } from '../../contexts/AuthContext';

interface Park {
	id: number;
	name: string;
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

	//const portfolioItems: PortfolioItem[] = [
	//	{
	//		name: 'Farrow Riverside Miracle League Park',
	//		location: 'Windsor, Ontario',
	//		image:
	//			'/farrow-riverside-miracle-league-park/farrow-riverside-miracle-league-park-1.jpg',
	//		itemUrl: 'farrow-riverside-miracle-league-park',
	//	},
	//	{
	//		name: 'Gore Meadows Park',
	//		location: 'Brampton, Ontario',
	//		image: '/gore-meadows-park/gore-meadows-park-1.jpg',
	//		itemUrl: 'gore-meadows-park',
	//	},
	//	{
	//		name: 'RBJ Schlegel Park',
	//		location: 'Kitchener, Ontario',
	//		image: '/rbj-schlegel-park/rbj-schlegel-park-1.jpg',
	//		itemUrl: 'rbj-schlegel-park',
	//	},
	//	{
	//		name: 'Churchill Park',
	//		location: 'Hamilton, Ontario',
	//		image: '/churchill-park/churchill-park-1.jpg',
	//		itemUrl: 'churchill-park',
	//	},
	//	{
	//		name: 'Happy Rolph’s Animal Farm',
	//		location: 'St. Catherines, Ontario',
	//		image: '/happy-rolphs-animal-farm/happy-rolphs-animal-farm-1.jpg',
	//		itemUrl: 'happy-rolphs-animal-farm',
	//	},
	//	{
	//		name: 'John McGivney Children’s Centre',
	//		location: 'Windsor, Ontario',
	//		image:
	//			'/john-mcgivney-childrens-centre/john-mcgivney-childrens-centre-1.jpg',
	//		itemUrl: 'john-mcgivney-childrens-centre',
	//	},
	//	{
	//		name: 'Captain Cornelius Park',
	//		location: 'Hamilton, Ontario',
	//		image: '/captain-cornelius-park/captain-cornelius-park-1.jpg',
	//		itemUrl: 'captain-corneliuys-park',
	//	},
	//	{
	//		name: 'Mohawk Park',
	//		location: 'Brantford, Ontario',
	//		image: '/mohawk-park/mohawk-park-1.jpg',
	//		itemUrl: 'mohawk-park',
	//	},
	//	{
	//		name: 'Kiwanis Park',
	//		location: 'Kitchener, Ontario',
	//		image: '/kiwanis-park/kiwanis-park-1.jpg',
	//		itemUrl: 'kiwanis-park',
	//	},
	//	{
	//		name: 'Delcrest Park',
	//		location: 'Delhi, Ontario',
	//		image: '/delcrest-park/delcrest-park-1.jpg',
	//		itemUrl: 'delcrest-park',
	//	},
	//	{
	//		name: 'John Gamble Park',
	//		location: 'Guelph, Ontario',
	//		image: '/john-gamble-park/john-gamble-park-1.jpg',
	//		itemUrl: 'john-gamble-park',
	//	},
	//	{
	//		name: 'Duncan Ferguson Park',
	//		location: 'Cambridge, Ontario',
	//		image: '/duncan-ferguson-park/duncan-ferguson-park-1.jpg',
	//		itemUrl: 'duncan-ferguson-park',
	//	},
	//];

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
					<div className='grid grid-cols-4 max-w-350'>
						{/* ADMIN ONLY --- Add Portfolio Item */}
						{user && (
							<button
								type='button'
								onClick={() => navigate('/admin/add-park')}
								className='border-1 border-brand-green text-brand-green hover:scale-105 active:scale-100 h-50 rounded-xl text-4xl transition'
							>
								+
							</button>
						)}

						{/* Portfolio Items */}
						{parks.map((park) => {
							const slug = parkNavConverter(park.name);

							return (
								<Link
									key={park.name}
									to={`/portfolio/${slug}`}
									state={{ park, slug }}
								>
									<div className='mx-5 mb-30 relative h-50 hover:scale-105 active:scale-100 transition'>
										<img
											src={`/images/playgrounds/${slug}/${slug}-1.jpg`}
											alt={`${park.name} Image`}
											className='rounded-xl w-full h-full object-cover z-0 relative'
										/>
										<div className='rounded-lg p-3 bg-white flex flex-col text-center w-9/10 mx-auto -mt-12 z-1 relative'>
											<div className='border-b-1 border-dotted p-2'>
												<h3 className='text-2xl font-bold text-brand-orange'>
													{park.name}
												</h3>
												<p className='lg text-grey'>{park.location}</p>
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
