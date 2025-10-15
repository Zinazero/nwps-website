'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Pen } from '@/app/components/ui/Pen';
import { ProviderCard } from '@/app/components/ui/ProviderCard';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Provider } from '@/types';

interface DistributorSwiperProps {
	providers: Provider[];
}

export const DistributorSwiper = ({ providers }: DistributorSwiperProps) => {
	console.log(providers);
	const { user } = useAuth();
	const router = useRouter();

	const checkDirectLink = (provider: Provider) => {
		if (!provider || !provider.blurb || !provider.description) {
			return true;
		}

		return false;
	};

	return (
		<div className='flex flex-col items-center justify-center bg-white mt-10 p-8'>
			<div className='flex items-center space-x-4'>
				<h2 className='text-5xl font-bold text-brand-orange'>
					Authorized Distributor
				</h2>
				{user?.isSu && (
					<Pen onClick={() => router.push('/admin/add-provider')} />
				)}
			</div>
			<Swiper
				modules={[Navigation, Autoplay]}
				navigation={{
					prevEl: '.custom-prev',
					nextEl: '.custom-next',
				}}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				loop={true}
				slidesPerView={6}
				spaceBetween={40}
				className='w-full max-w-400 h-50 rounded-2xl shadow-lg'
			>
				<div className='custom-prev absolute left-0 top-0 z-10 text-3xl text-brand-orange cursor-pointer bg-transparent-grey/30 h-full flex items-center group'>
					<FontAwesomeIcon
						icon={faChevronLeft}
						className='group-hover:scale-120 active:scale-100 transition'
					/>
				</div>
				<div className='custom-next absolute right-0 top-0 z-10 text-3xl text-brand-orange cursor-pointer bg-transparent-grey/30 h-full flex items-center group'>
					<FontAwesomeIcon
						icon={faChevronRight}
						className='group-hover:scale-120 active:scale-100 transition'
					/>
				</div>

				{providers.map((provider, i) => (
					<SwiperSlide key={i}>
						{checkDirectLink(provider) ? (
							<a
								href={provider.externalLink}
								target='_blank'
								rel='noopener noreferrer'
							>
								<ProviderCard provider={provider} />
							</a>
						) : (
							<Link href={`/providers/${provider.slug}`}>
								{/* state={{ provider }} */}
								<ProviderCard provider={provider} />
							</Link>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
