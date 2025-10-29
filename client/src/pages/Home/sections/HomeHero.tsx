import { useNavigate } from 'react-router-dom';
import { HeroVideo } from '../../../components/ui/HeroVideo';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="h-[50vh]">
      <HeroVideo
        videoSrc="/videos/hero-video.webm"
        title="Ontario’s Premier Park and Play Equipment Provider"
        subtitle="Building Worlds of Fun"
        ctaText="See Our Products"
        onCtaClick={() => navigate('/products')}
      />
    </section>
  );
};
