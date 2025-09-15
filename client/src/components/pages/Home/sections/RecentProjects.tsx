import { Link } from 'react-router-dom';
import goreMeadows from '/images/playgrounds/gore-meadows-park/gore-meadows-park-1.jpg';
import captainCornelius from '/images/playgrounds/captain-cornelius-park/captain-cornelius-park-1.jpg';
import happyRolphs from '/images/playgrounds/happy-rolphs-animal-farm/happy-rolphs-animal-farm-1.jpg';
import nwpsVerticalLogo from '@/assets/logos/nwps-vertical-logo.svg';

export const RecentProjects = () => {
	return (
		<section id='recent-projects'>
			<div className='flex flex-col max-w-400 mx-auto px-20 py-14 space-y-10'>
				<Link to='/projects'>
					<div className='flex items-center w-full group'>
						<h2 className='text-5xl font-bold text-nowrap mr-6 group-hover:translate-x-4 transition'>
							Recent Projects
						</h2>
						<hr className='w-full text-brand-orange group-hover:translate-x-4 transition' />
					</div>
				</Link>
				<div className='grid grid-cols-3 gap-10 text-center'>
					<Link to='/portfolio'>
						<div className='flex flex-col group'>
							<img
								src={goreMeadows}
								alt='Gore Meadows Park Playground'
								className='rounded-lg shadow-md group-hover:scale-110 transition'
							/>
							<h4 className='text-2xl font-semibold mt-5 mb-2'>
								Gore Meadows Park
							</h4>
							<p className='text-grey text-lg'>
								The power of a thunderclap, the brilliance of a rainbow, the
								gentle tapping of the rain; we’ve harnessed the power of the
								elements for Sky Towers, our modern take on a Playworld classic.
							</p>
						</div>
					</Link>
					<Link to='/portfolio'>
						<div className='flex flex-col group'>
							<img
								src={captainCornelius}
								alt='Captain Cornelius Park Playground'
								className='rounded-lg shadow-md group-hover:scale-110 transition'
							/>
							<h4 className='text-2xl font-semibold mt-5 mb-2'>
								Captain Cornelius Park
							</h4>
							<p className='text-grey text-lg'>
								Explore, Imagine, and Play in a World of Adventure. Discover a
								Safe and Exciting Haven for Children of All Ages, Where Memories
								Are Made and Fun Never Ends.
							</p>
						</div>
					</Link>
					<Link to='/portfolio'>
						<div className='flex flex-col group'>
							<img
								src={happyRolphs}
								alt='Happy Rolphs Animal Farm Playground'
								className='rounded-lg shadow-md group-hover:scale-110 transition'
							/>
							<h4 className='text-2xl font-semibold mt-5 mb-2'>
								Happy Rolph's Animal Farm
							</h4>
							<p className='text-grey text-lg'>
								Discover the Wonder of Nature and the Joy of Play. Experience
								Fun-Filled Adventures and Create Lasting Memories at Our Park,
								Where Every Visit is a New Adventure.
							</p>
						</div>
					</Link>
				</div>
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
