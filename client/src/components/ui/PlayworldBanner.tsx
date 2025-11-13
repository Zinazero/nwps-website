import { useId } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Image } from './Image';

export const PlayworldBanner = () => {
  const playworldBannerId = useId();

  return (
    <article id={playworldBannerId} className="bg-brand-blue-light shadow-md w-full">
      <div
        className={cn('flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 p-10')}
      >
        <div
          className={cn(
            'w-90 flex flex-col items-center text-center space-y-4 justify-between',
            'lg:w-140 lg:items-start lg:text-left',
          )}
        >
          <Image src="/logos/pw-logo.svg" alt="Playworld Logo" className="w-70" priority />
          <h3 className="text-4xl font-bold">EXCLUSIVE ONTARIO DISTRIBUTOR FOR PLAYWORLD PRODUCTS</h3>
          <Link
            to="/providers/playworld"
            className="rounded-lg p-2 bg-brand-orange text-light font-semibold text-center hover:bg-brand-blue transition"
          >
            Learn More
            <span className="sr-only"> About Playworld</span>
          </Link>
        </div>
        <Image
          className="w-140 rounded-lg shadow-md"
          src="/images/generic/playworld-image.jpg"
          alt="Children on Playground Image"
          priority
        />
      </div>
    </article>
  );
};
