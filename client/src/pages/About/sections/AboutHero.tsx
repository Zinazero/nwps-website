import { Link } from 'react-router-dom';
import aboutImage from '@/assets/images/generic/about-image.jpg';
import { ImageMask } from '../../../components/ui/ImageMask';
import { UnderlineHeader } from '../../../components/ui/UnderlineHeader';
import { cn } from '../../../utils/cn';
import { useIsMobile } from '../../../utils/useIsMobile';

export const AboutHero = () => {
  const isMobile = useIsMobile();

  return (
    <section>
      <div className={cn('flex flex-col items-center gap-y-12 py-8 px-6', 'md:py-16')}>
        <UnderlineHeader text="About Us" withArrow />
        <div className="max-w-350 flex items-center gap-30">
          <div
            className={cn(
              'flex flex-col items-center gap-6 text-center',
              'md:items-start md:w-1/2 md:text-left',
            )}
          >
            <h3 className="text-4xl font-semibold">Our Approach</h3>
            <p className="text-xl/relaxed ">
              New World Park Solutions is a full-service park and playground equipment supplier dedicated to
              consistently providing high customer satisfaction through excellent service, unique high quality
              products, and unparalleled consultation services acquired from many years of experience.
            </p>
            <Link
              to="/portfolio"
              className={cn(
                'rounded-lg bg-brand-blue hover:bg-brand-orange transition text-light font-bold p-4 text-center',
                'md:w-1/2',
              )}
            >
              Check Out Some of Our Work
            </Link>
          </div>
          {!isMobile && (
            <ImageMask
              src={aboutImage}
              alt="Accessible Surfacing Playground"
              mask="squiggly-mask.svg"
              priority
              className='w-1/2'
            />
          )}
        </div>
      </div>
    </section>
  );
};
