import { Link } from 'react-router-dom';
import videoThumbnail from '@/assets/images/generic/video-thumbnail.jpg';
import { Image } from '../../../components/ui/Image';

export const Hero = () => {
	return (
		<section id='home-hero'>
			<div className='flex items-center justify-evenly p-20'>
				<Image
					src={videoThumbnail}
					alt='Video Thumbnail'
					className='max-w-240 w-3/5 rounded-lg shadow-md'
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
