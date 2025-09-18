import { Link } from 'react-router-dom';
import videoThumbnail from '@/assets/images/generic/video-thumbnail.jpg';

export const Hero = () => {
	return (
		<section id='home-hero'>
			<div className='flex items-center justify-evenly p-20'>
				<img
					decoding='async'
					className='max-w-240 w-3/5 rounded-lg shadow-md'
					src={videoThumbnail}
					data-embed-url='https://www.youtube.com/embed/CTastSQZhBM?rel=0&amp;start&amp;end&amp;controls=1&amp;mute=0&amp;modestbranding=0&amp;autoplay=1'
					draggable={false}
				/>
				<div className='ml-10 w-1/4 flex flex-col space-y-8'>
					<h1 className='text-5xl font-bold text-brand-orange'>
						Ontario’s Premier Park and Play Equipment Provider
					</h1>
					<h4 className='text-2xl'>Building Worlds of Fun</h4>
					<Link
						to='products'
						className='rounded-lg p-2 bg-brand-blue text-light font-semibold w-3/4 text-center hover:bg-brand-orange transition'
					>
						See Our Products
					</Link>
				</div>
			</div>
		</section>
	);
};
