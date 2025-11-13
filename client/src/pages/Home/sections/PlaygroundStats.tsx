import { Image } from '../../../components/ui/Image';
import { cn } from '../../../utils/cn';

export const PlaygroundStats = () => {
  return (
    <section>
      <div className="w-full overflow-hidden mt-10">
        <svg
          className="w-full h-20 md:h-16 sm:h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="rgb(196, 226, 252)"
          aria-hidden="true"
        >
          <path d="M0 100 C 20 0 50 0 100 100 Z" />
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center bg-brand-blue-light p-4">
        <h3 className="text-5xl font-bold text-black mb-16 text-center">Unofficial Playground Stats</h3>
        <div
          className={cn(
            'flex flex-col gap-8 items-center justify-evenly w-full max-w-350',
            'md:flex-row md:gap-0',
          )}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Image src="/icons/slide-icon.png" alt="Slide Icon" className="h-40" />
            <h4 className="text-4xl mt-6 mb-3">300,000+</h4>
            <span className="text-xl text-gray-600">Slide Rides</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image src="/icons/seesaw-icon.png" alt="Slide Icon" className="h-40" />
            <h4 className="text-4xl mt-6 mb-3">100,000+</h4>
            <span className="text-xl text-gray-600">See-Saws</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image src="/icons/swing-icon.png" alt="Slide Icon" className="h-40" />
            <h4 className="text-4xl mt-6 mb-3">500,000+</h4>
            <span className="text-xl text-gray-600">Underducks</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <Image src="/icons/smile-icon.png" alt="Slide Icon" className="h-40" />
            <h4 className="text-4xl mt-6 mb-3">1,000,000+</h4>
            <span className="text-xl text-gray-600">Happy Kids</span>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <svg
          className="w-full h-24 md:h-16 sm:h-8 scale-x-[-1] rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="rgb(196, 226, 252)"
          aria-hidden="true"
        >
          <path d="M0 100 C 20 0 50 0 100 100 Z" />
        </svg>
      </div>
    </section>
  );
};
