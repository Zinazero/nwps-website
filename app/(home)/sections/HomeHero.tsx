import { HeroVideo } from '@/app/components/ui/HeroVideo';

export const HomeHero = () => {
	return (
		<section id='home-hero' className='h-[50vh]'>
				<HeroVideo
					videoSrc='/videos/hero-video.mp4'
					title='Ontario’s Premier Park and Play Equipment Provider'
					subtitle='Building Worlds of Fun'
					ctaText='See Our Products'
					ctaRoute={'/products'}
				/>
		</section>
	);
};
