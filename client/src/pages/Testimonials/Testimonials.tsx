import { TestimonialCard } from '../../components/ui/TestimonialCard';
import { UnderlineHeader } from '../../components/ui/UnderlineHeader';
import { TestimonialsArray } from './TestimonialInfo/TestimonialsArray';

export const Testimonials = () => {
	return (
		<main className='min-h-screen p-16 flex flex-col items-center justify-center'>
			<UnderlineHeader text='Testimonials' />
			<div className='flex flex-col max-w-350 p-16 space-y-12'>
				{TestimonialsArray.map((testimonial, index) => (
					<TestimonialCard testimonial={testimonial} index={index} />
				))}
			</div>
		</main>
	);
};
