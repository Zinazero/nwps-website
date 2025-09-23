import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { imageArray } from '../../../assets/providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Image } from '../../../components/ui/Image';
import { Link, useNavigate } from 'react-router-dom';
import { Pen } from '../../../components/ui/Pen';
import { useAuth } from '../../../contexts/AuthContext';

export const AuthorizedDistributor = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

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

					{imageArray.map((image, i) => (
						<SwiperSlide key={i}>
							<Link
								to={`/providers/${image.name}`}
								state={{ name: image.name }}
							>
								<div className='flex items-center justify-center h-full hover:scale-110 transition'>
									<Image
										src={image.src}
										alt={`${image.name} image`}
										className='object-contain max-w-full'
									/>
								</div>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};
