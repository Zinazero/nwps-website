import { CallToAction } from '../../components/ui/CallToAction';
import { TestimonialCard } from '../../components/ui/TestimonialCard';
import { UnderlineHeader } from '../../components/ui/UnderlineHeader';
import { cn } from '../../utils/cn';
import { TestimonialsArray } from './TestimonialInfo/TestimonialsArray';

export const Testimonials = () => {
  return (
    <div className={cn('min-h-screen flex flex-col items-center justify-center py-8 px-6', 'md:py-16')}>
      <UnderlineHeader text="Testimonials" level={1} />
      <div className={cn('flex flex-col max-w-screen py-16 px-4 gap-12', 'md:max-w-350 md:p-16')}>
        {TestimonialsArray.map((testimonial, index) => (
          <TestimonialCard key={testimonial.title} testimonial={testimonial} index={index} />
        ))}
      </div>
      <CallToAction />
    </div>
  );
};
