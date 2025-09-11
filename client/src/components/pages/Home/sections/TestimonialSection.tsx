import { Link } from 'react-router-dom';
import testimonialImage from '@/assets/images/generic/testimonial-image.jpg';

export const TestimonialSection = () => {
	return (
		<section id='testimonial'>
			<div
				className='relative bg-cover bg-center px-[40px]'
				style={{ backgroundImage: `url(${testimonialImage})` }}
			>
				<div className='max-w-350 mx-auto'>
					<div className='flex flex-col bg-white h-full w-7/12 p-32 space-y-10'>
						<h2 className='text-5xl font-bold'>What Our Clients Have To Say</h2>
						<h4 className='text-xl font-semibold'>
							{
								'Faith Hale, Executive Director (Ska:na Family Learning Centre, Windsor)'
							}
						</h4>
						<p className='text-xl text-grey'>
							It is a pleasure to recommend Mark Jones and New World Park
							Solutions as a service provider to our community members. Also
							important is the ability to deliver the product on time and at the
							agreed-upon price. When working on a strict budget, it is
							imperative that Ska:na build relationships with trustworthy and
							dependable vendors and they fit our criteria.
						</p>
						<Link
							to='/testimonials'
							className='rounded-lg p-2 bg-brand-blue text-light font-semibold text-center hover:bg-brand-orange transition'
						>
							Read More
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
