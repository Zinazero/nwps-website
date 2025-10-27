import { useId } from 'react';
import { Link } from 'react-router-dom';
import playworldImage from '@/assets/images/generic/playworld-image.jpg';
import playworldLogo from '@/assets/logos/pw-logo.svg';
import { Image } from './Image';

export const PlayworldBanner = () => {
  const playworldBannerId = useId();

  return (
    <div id={playworldBannerId} className="bg-brand-blue-light shadow-md w-full">
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 p-10">
        <div className="w-140 flex flex-col lg:items-start items-center lg:text-left text-center space-y-4 justify-between">
          <Image src={playworldLogo} alt="Playworld Logo" className="w-70" priority />
          <h3 className="text-4xl font-bold">EXCLUSIVE ONTARIO DISTRIBUTOR FOR PLAYWORLD PRODUCTS</h3>
          <Link
            to="/providers/playworld"
            className="rounded-lg p-2 bg-brand-orange text-light font-semibold text-center hover:bg-brand-blue transition"
          >
            Learn More
          </Link>
        </div>
        <Image
          className="w-140 rounded-lg shadow-md"
          src={playworldImage}
          alt="Children on Playground Image"
          priority
        />
      </div>
    </div>
  );
};
