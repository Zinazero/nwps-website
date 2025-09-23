import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Pen } from '../../../components/ui/Pen';
import { useAuth } from '../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import type { Provider } from '../../types';
import { slugConverter } from '../../../utils/parkNavConverter';
import { ProviderCard } from '../../../components/ui/ProviderCard';

export const AuthorizedDistributor = () => {
	const [providers, setProviders] = useState<Provider[]>([]);
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		const fetchProviders = async () => {
			try {
				const res = await api.get<Provider[]>('/providers');

				const providerArray = [];
				for (const provider of res.data) {
					const slug = slugConverter(provider.title);
					const logo = {
						src: `/images/providers/${slug}/${slug}-logo.jpg`,
						slug,
					};
					provider.logo = logo;
					providerArray.push(provider);
				}

				console.log(providerArray)
				setProviders(providerArray);
			} catch (err) {
				console.error('Error fetching providers:', err);
			}
		};

		fetchProviders();
	}, []);

	const checkDirectLink = (provider: Provider) => {
		if (!provider || !provider.blurb || !provider.description) {
			return true;
		}

		return false;
	};

	return (
		<section id='authorized-distributor'>
			<div className='flex flex-col items-center justify-center bg-white mt-10 p-8'>
				<div className='flex items-center space-x-4'>
					<h2 className='text-5xl font-bold text-brand-orange'>
						Authorized Distributor
					</h2>
					{user?.isSu && (
						<Pen onClick={() => navigate('/admin/add-provider')} />
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
								<Link
									to={`/providers/${provider.logo.slug}`}
									state={{ provider }}
								>
									<ProviderCard provider={provider} />
								</Link>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};
