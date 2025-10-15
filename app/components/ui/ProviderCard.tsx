import { imagePathGenerator } from '@/app/utils/imagePathGenerator';
import type { Provider } from '@/types';
import Image from 'next/image';


interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
	return (
		<div className='flex items-center justify-center h-50 hover:scale-110 transition relative w-50'>
			<Image
				src={imagePathGenerator('providers', provider.slug, 'logo')}
				alt={`${provider.title} Logo`}
				fill
				className='object-contain'
			/>
		</div>
	);
};
