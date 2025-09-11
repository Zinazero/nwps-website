import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import { imageArray } from '../../../../assets/distributors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const AuthorizedDistributor = () => {
	console.log(imageArray);
	return (
		<section id='authorized-distributor'>
			<div className='flex flex-col items-center justify-center bg-white mt-10 p-8'>
				<h2 className='text-5xl font-bold text-brand-orange'>Authorized Distributor</h2>
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
						<FontAwesomeIcon icon={faChevronLeft} className='group-hover:scale-120 active:scale-100 transition' />
					</div>
					<div className='custom-next absolute right-0 top-0 z-10 text-3xl text-brand-orange cursor-pointer bg-transparent-grey/30 h-full flex items-center group'>
						<FontAwesomeIcon icon={faChevronRight} className='group-hover:scale-120 active:scale-100 transition' />
					</div>

					{imageArray.map((src, i) => (
						<SwiperSlide key={i}>
							<div className='flex items-center justify-center h-full'>
								<img
									src={src}
									alt={`Distributor ${i}`}
									className='object-contain max-w-full'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};
