import type { Provider } from '../../pages/types';
import { cn } from '../../utils/cn';
import { Image } from './Image';

interface ProviderBubbleProps {
  provider: Provider;
}

export const ProviderBubble = ({ provider }: ProviderBubbleProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center h-full rounded-full overflow-hidden',
        'hover:scale-110 transition shadow-lg w-30! h-30! p-2 mx-auto active:scale-95',
        'md:w-40! lg:w-50! md:h-40! lg:h-50!'
      )}
    >
      <Image src={provider.logoSrc} alt={`${provider.title} Logo`} className="object-cover" />
    </div>
  );
};
