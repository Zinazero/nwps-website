import { UnderlineHeader } from '../../ui/UnderlineHeader';
import farrowRiverside from '/images/playgrounds/farrow-riverside-miracle-league-park/farrow-riverside-miracle-league-park-1.jpg';
import goreMeadows from '/images/playgrounds/gore-meadows-park/gore-meadows-park-1.jpg';
import rbjSchlegel from '/images/playgrounds/rbj-schlegel-park/rbj-schlegel-park-1.jpg';
import churchillPark from '/images/playgrounds/churchill-park/churchill-park-1.jpg';
import happyRolphs from '/images/playgrounds/happy-rolphs-animal-farm/happy-rolphs-animal-farm-1.jpg';
import johnMcGivney from '/images/playgrounds/john-mcgivney-childrens-centre/john-mcgivney-childrens-centre-1.jpg';
import captainCornelius from '/images/playgrounds/captain-cornelius-park/captain-cornelius-park-1.jpg';
import mohawkPark from '/images/playgrounds/mohawk-park/mohawk-park-1.jpg';
import kiwanisPark from '/images/playgrounds/kiwanis-park/kiwanis-park-1.jpg';
import delcrestPark from '/images/playgrounds/delcrest-park/delcrest-park-1.jpg';
import johnGamble from '/images/playgrounds/john-gamble-park/john-gamble-park-1.jpg';
import duncanFerguson from '/images/playgrounds/duncan-ferguson-park/duncan-ferguson-park-1.jpg';

export const Portfolio = () => {
	interface PortfolioItem {
		name: string;
		location: string;
		image: string;
	}

	const portfolioItems: PortfolioItem[] = [
		{
			name: 'Farrow Riverside Miracle League Park',
			location: 'Windsor, Ontario',
			image: farrowRiverside,
		},
		{
			name: 'Gore Meadows Park',
			location: 'Brampton, Ontario',
			image: goreMeadows,
		},
		{
			name: 'RBJ Schlegel Park',
			location: 'Kitchener, Ontario',
			image: rbjSchlegel,
		},
		{
			name: 'Churchill Park',
			location: 'Hamilton, Ontario',
			image: churchillPark,
		},
		{
			name: 'Happy Rolph’s Animal Farm',
			location: 'St. Catherines, Ontario',
			image: happyRolphs,
		},
		{
			name: 'John McGivney Children’s Centre',
			location: 'Windsor, Ontario',
			image: johnMcGivney,
		},
		{
			name: 'Captain Cornelius Park',
			location: 'Hamilton, Ontario',
			image: captainCornelius,
		},
		{ name: 'Mohawk Park', location: 'Brantford, Ontario', image: mohawkPark },
		{
			name: 'Kiwanis Park',
			location: 'Kitchener, Ontario',
			image: kiwanisPark,
		},
		{ name: 'Delcrest Park', location: 'Delhi, Ontario', image: delcrestPark },
		{
			name: 'John Gamble Park',
			location: 'Guelph, Ontario',
			image: johnGamble,
		},
		{
			name: 'Duncan Ferguson Park',
			location: 'Cambridge, Ontario',
			image: duncanFerguson,
		},
	];

	return (
		<main className='min-h-screen'>
			<div className='flex flex-col items-center p-6 space-y-16'>
				<UnderlineHeader text='Portfolio' withArrow />
				<h2 className='text-4xl font-semibold'>
					Designing Playgrounds That Inspire Imagination and Outdoor Play
				</h2>
				<div className='grid grid-cols-4 max-w-350'>
					{portfolioItems.map((park) => (
						<div className='mx-5 mb-30 relative h-50 hover:scale-105 transition'>
							<img
								src={park.image}
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
					))}
				</div>
			</div>
		</main>
	);
};
