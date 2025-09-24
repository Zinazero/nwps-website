import { Image } from './Image';

interface ProductsCardProps {
    className?: string;
}

export const ProductsCard = ({ className }: ProductsCardProps) => {
	return (
		<div className={`flex items-center space-x-8 mb-10 pr-20 ${className}`}>
			<Image
				src='/images/playgrounds/mohawk-park/mohawk-park-1.jpg'
				alt='test-image'
                className='w-54 h-44 rounded-lg object-cover shadow-sm'
			/>
			<div className='flex flex-col space-y-2'>
				<h3 className='text-2xl font-bold text-brand-orange'>Playgrounds</h3>
				<p className='text-lg/relaxed'>
					From Toddlers to Tweens, our playgrounds are designed for fun and
					accessibility for all!
				</p>
			</div>
		</div>
	);
};
