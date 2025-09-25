import { useNavigate } from 'react-router-dom';
import { HeroVideo } from '../../../components/ui/HeroVideo';
import heroMp4 from '@/assets/videos/hero-video.mp4';

export const Hero = () => {
	const navigate = useNavigate();

	return (
		<section id='home-hero' className='h-[50vh]'>
				<HeroVideo
					videoSrc={heroMp4}
					title='Ontario’s Premier Park and Play Equipment Provider'
					subtitle='Building Worlds of Fun'
					ctaText='See Our Products'
					onCtaClick={() => navigate('/products')}
				/>
		</section>
	);
};
