import { Link } from 'react-router-dom';
import videoThumbnail from '@/assets/images/generic/video-thumbnail.jpg';
import { Image } from '../../../components/ui/Image';

export const Hero = () => {
	return (
		<section id='home-hero'>
			<div className='flex flex-col xl:flex-row items-center justify-evenly space-y-10 xl:space-y-0 xl:space-x-16 p-20'>
				<Image
					src={videoThumbnail}
					alt='Video Thumbnail'
					className='max-w-240 rounded-lg shadow-md'
				/>
				<div className='flex flex-col max-w-240 space-y-8'>
					<h1 className='text-5xl font-bold text-brand-orange'>
						Ontario’s Premier Park and Play Equipment Provider
					</h1>
					<h4 className='text-2xl'>Building Worlds of Fun</h4>
					<Link
						to='products'
						className='rounded-lg p-2 bg-brand-blue text-light font-semibold w-60 text-center hover:bg-brand-orange transition'
					>
						See Our Products
					</Link>
				</div>
			</div>
		</section>
	);
};
