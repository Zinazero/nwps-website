import Image from 'next/image';
import Link from 'next/link';

export const PlayworldBanner = () => {
	return (
		<div id='playworld' className='bg-brand-blue-light shadow-md w-full'>
			<div className='flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 p-10'>
				<div className='w-140 flex flex-col lg:items-start items-center lg:text-left text-center space-y-4 justify-between'>
					<div className='w-70 h-30 relative'>
						<Image src='/logos/pw-logo.svg' alt='Playworld Logo' fill />
					</div>
					<h3 className='text-4xl font-bold'>
						EXCLUSIVE ONTARIO DISTRIBUTOR FOR PLAYWORLD PRODUCTS
					</h3>
					<Link
						href='/providers/playworld'
						className='rounded-lg p-2 bg-brand-orange text-light font-semibold text-center hover:bg-brand-blue transition'
					>
						Learn More
					</Link>
				</div>
				<div className='w-140 h-16 rounded-lg shadow-md relative'>
					<Image
						src='/images/generic/playworld-image.jpg'
						alt='Children on Playground Image'
						fill
						className='object-contain'
					/>
				</div>
			</div>
		</div>
	);
};
