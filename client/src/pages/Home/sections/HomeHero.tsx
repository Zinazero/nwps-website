import { useNavigate } from 'react-router-dom';
import { HeroVideo } from '../../../components/ui/HeroVideo';
import { RequestQuoteButton } from '../../../components/ui/RequestQuoteButton';
import { VisitStoreButton } from '../../../components/ui/VisitStoreButton';
import { useIsMobile } from '../../../utils/useIsMobile';

export const Hero = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const title = 'Ontario’s Premier Park and Play Equipment Provider';
  const subtitle = 'Building Worlds of Fun';

  return (
    <section className="h-[50vh]">
      {isMobile ? (
        <div className="flex flex-col items-center justify-evenly h-full text-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-brand-orange">{title}</h1>
            <h2 className="text-2xl text-gray-400">{subtitle}</h2>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 w-full px-4">
            <RequestQuoteButton />
            <VisitStoreButton />
          </div>
        </div>
      ) : (
        <HeroVideo
          videoSrc="/videos/hero-video.webm"
          title={title}
          subtitle={subtitle}
          ctaText="See Our Products"
          onCtaClick={() => navigate('/products')}
        />
      )}
    </section>
  );
};
