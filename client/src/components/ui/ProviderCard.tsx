import type { Provider } from '../../pages/types';
import { Image } from './Image';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <div className="flex items-center justify-center h-full hover:scale-110 transition">
      <Image src={provider.logoSrc} alt={`${provider.title} Logo`} className="object-cover" />
    </div>
  );
};
