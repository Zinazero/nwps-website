import type { Testimonial } from '../../pages/types';
import { cn } from '../../utils/cn';
import { Image } from './Image';
import { ImageMask } from './ImageMask';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const maskType = index % 2 === 0 ? 'boomerang' : 'squiggly';
  const mask = `${maskType}-mask.svg`;

  const priority = index < 2;

  return (
    <div className={cn('rounded-xl shadow-xl bg-white p-4', 'md:p-10')}>
      <div
        className={cn(
          'flex flex-col-reverse items-center gap-4 border-b border-brand-orange pb-8 my-6',
          'md:flex-row md:gap-10 md:my-10',
        )}
      >
        <div className={cn('flex flex-col gap-6', 'md:w-1/2 md:gap-14')}>
          <h2 className={cn('text-2xl text-center font-bold text-brand-blue', 'md:text-left')}>
            {testimonial.title}
          </h2>
          <p className="text-lg">{testimonial.blurb}</p>
        </div>
        <div className="flex justify-center w-1/2">
          {testimonial.skipMask ? (
            <Image
              src={testimonial.imageSrc}
              alt={`Testimonial ${index}`}
              priority={priority}
              className="w-40 md:w-full"
            />
          ) : (
            <ImageMask
              src={testimonial.imageSrc}
              alt={`Testimonial ${index}`}
              mask={mask}
              priority={priority}
            />
          )}
        </div>
      </div>
    </div>
  );
};
