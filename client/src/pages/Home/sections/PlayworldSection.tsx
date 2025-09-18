import { Link } from 'react-router-dom';
import playworldImage from '@/assets/images/generic/playworld-image.jpg';
import playworldLogo from '@/assets/logos/pw-logo.svg';

export const PlayworldSection = () => {
	return (
		<section id='playworld' className='bg-brand-blue-light shadow-md'>
			<div className='flex justify-center p-10'>
				<div className='w-140 flex flex-col justify-between'>
					<img
						src={playworldLogo}
						alt='Playworld Logo'
						className='w-70'
						draggable={false}
					/>
					<h3 className='text-4xl font-bold'>
						EXCLUSIVE ONTARIO DISTRIBUTOR FOR PLAYWORLD PRODUCTS
					</h3>
					<Link
						to='/playworld'
						className='rounded-lg p-2 bg-brand-orange text-light font-semibold w-1/4 text-center hover:bg-brand-blue transition'
					>
						Learn More
					</Link>
				</div>
				<img
					className='w-140 rounded-lg shadow-md'
					src={playworldImage}
					alt='Children on Playground Image'
					draggable={false}
				/>
			</div>
		</section>
	);
};
