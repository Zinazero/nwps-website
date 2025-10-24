import type { Testimonial } from '../../types';
import {
  chrisZiemskiBlurb,
  debVecciaBlurb,
  faithHaleBlurb,
  heidiBaillargeonBlurb,
  joeProtulipacBlurb,
  karenMcClintockBlurb,
  scottNancekivellBlurb,
  shaneTaylorBlurb,
  shannonWestBlurb,
  steveWeirBlurb,
  trevorClappertonBlurb,
} from './TestimonialBlurbs';

export const TestimonialsArray: Testimonial[] = [
  {
    title: 'Trevor Clapperton, Manager of Parks and Facilities, Township of Hamilton',
    blurb: trevorClappertonBlurb,
    imageSrc: '/images/testimonials/trevor-clapperton-testimonial.jpg',
  },
  {
    title: 'Steve Weir, Foreman of Parks Operations Town of Wasaga Beach',
    blurb: steveWeirBlurb,
    imageSrc: '/images/testimonials/steve-weir-testimonial.jpg',
  },
  {
    title: 'Karen McClintock, Director of Community Services (Pathways Children’s centre, Sarnia)',
    blurb: karenMcClintockBlurb,
    imageSrc: '/images/testimonials/karen-mcclintock-testimonial.jpg',
    skipMask: true,
  },
  {
    title: 'Faith Hale, Executive Director (Ska:na Family Learning Centre, Windsor)',
    blurb: faithHaleBlurb,
    imageSrc: '/images/testimonials/faith-hale-testimonial.jpg',
  },
  {
    title: 'Chris Ziemski, Operations Manager (City of Cambridge)',
    blurb: chrisZiemskiBlurb,
    imageSrc: '/images/testimonials/chris-ziemski-testimonial.jpg',
  },
  {
    title: 'Heidi Baillargeon, Project Manager and Landscape Architect (City of Windsor)',
    blurb: heidiBaillargeonBlurb,
    imageSrc: '/images/testimonials/heidi-baillargeon-testimonial.jpg',
  },
  {
    title: 'Scott Nancekivell, Director of Facilities & Recreation Services (Township of Wilmot)',
    blurb: scottNancekivellBlurb,
    imageSrc: '/images/testimonials/scott-nancekivell-testimonial.jpg',
  },
  {
    title: 'Joe Protulipac, VP – Operations (Croatian Sports & Community Centre of Hamilton Inc.)',
    blurb: joeProtulipacBlurb,
    imageSrc: '/images/testimonials/joe-protulipac-testimonial.jpg',
  },
  {
    title: 'Deb Veccia, Supervisor Chatham Parks (Municipality of Chatham-Kent)',
    blurb: debVecciaBlurb,
    imageSrc: '/images/testimonials/deb-veccia-testimonial.jpg',
  },
  {
    title: 'Shane Taylor, City of Cambridge (Landscape Architect)',
    blurb: shaneTaylorBlurb,
    imageSrc: '/images/testimonials/shane-taylor-testimonial.jpg',
  },
  {
    title: 'Shannon West, Active Recreation (Playground Inspector)',
    blurb: shannonWestBlurb,
    imageSrc: '/images/testimonials/shannon-west-testimonial.jpg',
  },
];
