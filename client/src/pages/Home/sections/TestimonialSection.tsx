import { Link } from 'react-router-dom';
import testimonialImage from '@/assets/images/generic/testimonial-image.jpg';
import { cn } from '../../../utils/cn';

export const TestimonialSection = () => {
  return (
    <section className="shadow-md">
      <div
        className="relative bg-cover bg-center px-10"
        style={{ backgroundImage: `url(${testimonialImage})` }}
      >
        <div className="max-w-350 mx-auto">
          <div className={cn('flex flex-col bg-white h-full p-4 py-8 space-y-10', 'md:p-32 md:w-7/12')}>
            <h2 className="text-5xl font-bold">What Our Clients Have To Say</h2>
            <h4 className="text-xl font-semibold">
              {'Faith Hale, Executive Director (Ska:na Family Learning Centre, Windsor)'}
            </h4>
            <p className="text-xl ">
              It is a pleasure to recommend Mark Jones and New World Park Solutions as a service provider to
              our community members. Also important is the ability to deliver the product on time and at the
              agreed-upon price. When working on a strict budget, it is imperative that Ska:na build
              relationships with trustworthy and dependable vendors and they fit our criteria.
            </p>
            <Link
              to="/testimonials"
              className="rounded-lg p-2 bg-brand-blue text-light font-semibold text-center hover:bg-brand-orange transition"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
