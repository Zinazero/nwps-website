import type { Provider } from '@/types';
import { getAllProviders } from '@/lib/providers.repository';
import { DistributorSwiper } from '@/app/components/ui/DistributorSwiper';

export const AuthorizedDistributor = async () => {
	const providers: Provider[] = await getAllProviders();

	return (
		<section id='authorized-distributor'>
			<DistributorSwiper providers={providers} />
		</section>
	);
};
