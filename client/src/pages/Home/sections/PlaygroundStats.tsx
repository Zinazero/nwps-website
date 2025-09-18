import slideIcon from '@/assets/icons/slide-icon.png';
import seesawIcon from '@/assets/icons/seesaw-icon.png';
import swingIcon from '@/assets/icons/swing-icon.png';
import smileIcon from '@/assets/icons/smile-icon.png';

export const PlaygroundStats = () => {
	return (
		<section id='playground-stats'>
			<div className='w-full overflow-hidden mt-10'>
				<svg
					className='w-full h-20 md:h-16 sm:h-8'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'
					fill='rgb(196, 226, 252)'
				>
					<path d='M0 100 C 20 0 50 0 100 100 Z' />
				</svg>
			</div>
			<div className='flex flex-col items-center justify-center bg-brand-blue-light p-8'>
				<h2 className='text-5xl font-bold text-black mb-16'>
					Unofficial Playground Stats
				</h2>
				<div className='flex items-center justify-evenly w-full max-w-350'>
					<div className='flex flex-col items-center justify-center text-center'>
						<img
							src={slideIcon}
							alt='Slide Icon'
							className='h-40'
							draggable={false}
						/>
						<h4 className='text-4xl mt-6 mb-3'>300,000+</h4>
						<span className='text-xl text-gray-600'>Slide Rides</span>
					</div>
					<div className='flex flex-col items-center justify-center text-center'>
						<img
							src={seesawIcon}
							alt='Slide Icon'
							className='h-40'
							draggable={false}
						/>
						<h4 className='text-4xl mt-6 mb-3'>100,000+</h4>
						<span className='text-xl text-gray-600'>See-Saws</span>
					</div>
					<div className='flex flex-col items-center justify-center text-center'>
						<img
							src={swingIcon}
							alt='Slide Icon'
							className='h-40'
							draggable={false}
						/>
						<h4 className='text-4xl mt-6 mb-3'>500,000+</h4>
						<span className='text-xl text-gray-600'>Underducks</span>
					</div>
					<div className='flex flex-col items-center justify-center text-center'>
						<img
							src={smileIcon}
							alt='Slide Icon'
							className='h-40'
							draggable={false}
						/>
						<h4 className='text-4xl mt-6 mb-3'>1,000,000+</h4>
						<span className='text-xl text-gray-600'>Happy Kids</span>
					</div>
				</div>
			</div>
			<div className='w-full overflow-hidden'>
				<svg
					className='w-full h-24 md:h-16 sm:h-8 scale-x-[-1] rotate-180'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'
					fill='rgb(196, 226, 252)'
				>
					<path d='M0 100 C 20 0 50 0 100 100 Z' />
				</svg>
			</div>
		</section>
	);
};
