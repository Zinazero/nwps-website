import { ImageMask } from '@/app/components/ui/ImageMask';
import { UnderlineHeader } from '@/app/components/ui/UnderlineHeader';
import Link from 'next/link';

export const AboutHero = () => {
	return (
		<section id='about-hero'>
			<div className='flex flex-col items-center space-y-12 p-8'>
				<UnderlineHeader text='About Us' withArrow />
				<div className='max-w-350 flex items-center space-x-30'>
					<div className='flex flex-col w-1/2 space-y-6'>
						<h3 className='text-4xl font-semibold'>Our Approach</h3>
						<p className='text-xl/relaxed '>
							New World Park Solutions is a full-service park and
							playground equipment supplier dedicated to consistently providing
							high customer satisfaction through excellent service, unique high
							quality products, and unparalleled consultation services acquired
							from many years of experience.
						</p>
						<Link
							href='/portfolio'
							className='rounded-lg bg-brand-blue hover:bg-brand-orange transition text-light font-bold w-1/2 p-4 text-center'
						>
							Check Out Some of Our Work
						</Link>
					</div>
					<ImageMask
						src='/images/generic/about-image.jpg'
						alt='Accessible Surfacing Playground'
						maskUrl='/masks/squiggly-mask.svg'
					/>
				</div>
			</div>
		</section>
	);
};
