import type { Testimonial } from '../../pages/types';
import { Image } from './Image';
import { ImageMask } from './ImageMask';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const maskType = index % 2 === 0 ? 'boomerang' : 'squiggly';
  const maskUrl = `/masks/${maskType}-mask.svg`;

  const priority = index < 2;

  return (
    <div className="rounded-xl shadow-xl bg-white p-10">
      <div className="flex items-center space-x-10 border-b border-brand-orange pb-8 my-10">
        <div className="flex flex-col w-1/2 space-y-14">
          <h3 className="text-2xl font-bold text-brand-blue">{testimonial.title}</h3>
          <p className="text-lg">{testimonial.blurb}</p>
        </div>
        <div className="flex justify-center w-1/2">
          {testimonial.skipMask ? (
            <Image src={testimonial.imageSrc} alt={`Testimonial ${index}`} />
          ) : (
            <ImageMask src={testimonial.imageSrc} alt={`Testimonial ${index}`} maskUrl={maskUrl} />
          )}
        </div>
      </div>
    </div>
  );
};
