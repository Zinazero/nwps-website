import { Link } from 'react-router';
import nwpsVerticalLogo from '@/assets/logos/nwps-vertical-logo.svg';
import { cn } from '../../utils/cn';
import { Image } from './Image';

export const CallToAction = () => {
  return (
    <div
      className={cn(
        'max-w-300 mx-4 rounded-2xl shadow-xl bg-brand-blue-light',
        'p-12 flex flex-col items-center space-y-6',
        'xl:mx-auto xl:flex-row xl:space-y-0 md:mx-20',
      )}
    >
      <Image src={nwpsVerticalLogo} alt="NWPS Logo" className="h-48" />
      <div className="flex-1 flex flex-col items-center gap-6 text-center">
        <p className="text-4xl text-brand-orange">Not sure which product to choose?</p>
        <div className="flex flex-col xl:flex-row gap-2 text-4xl font-bold">
          <h3 className="text-brand-blue">Call Us</h3>
          <h3 className="text-brand-blue text-nowrap">{'(519) 304-3437'}</h3>
          <span className="text-brand-blue">or</span>
          <Link to="/contact" className="text-white hover:text-brand-orange transition">
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};
