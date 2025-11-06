import brian from '@/assets/images/team/brian-salter.jpg';
import mark from '@/assets/images/team/mark-jones.jpg';
import mike from '@/assets/images/team/mike-hexamer.jpg';
import wendy from '@/assets/images/team/wendy-hudgins.jpg';
import { Image } from '../../../../components/ui/Image.tsx';
import { UnderlineHeader } from '../../../../components/ui/UnderlineHeader.tsx';
import { cn } from '../../../../utils/cn.ts';
import { BrianBlurb, MarkBlurb, MikeBlurb, WendyBlurb } from './ProfileBlurbs.ts';

export const OurTeam = () => {
  interface Profile {
    image: string;
    name: string;
    title: string;
    blurb: string;
  }

  const profiles: Profile[] = [
    { image: mike, name: 'Mike Hexamer', title: 'President', blurb: MikeBlurb },
    {
      image: brian,
      name: 'Brian Salter',
      title: 'Territory Manager — Niagara, GTA West and Golden Horseshoe',
      blurb: BrianBlurb,
    },
    {
      image: wendy,
      name: 'Wendy Hudgins',
      title: 'Territory Manager — GTA North and Eastern Ontario',
      blurb: WendyBlurb,
    },
    {
      image: mark,
      name: 'Mark Jones',
      title: 'Territory Manager — Windsor, South Western Ontario, Northern Ontario',
      blurb: MarkBlurb,
    },
  ];

  return (
    <section>
      <div className="flex flex-col items-center p-6">
        <div className="pt-4 pb-20">
          <UnderlineHeader text="Our Team" />
        </div>
        <div className={cn('grid grid-cols-1', 'md:grid-cols-2')}>
          {profiles.map((profile, i) => (
            <div
              key={profile.name}
              className={cn(
                'max-w-200 flex flex-col items-center text-center py-8',
                i % 2 !== 0 ? 'md:border-l md:border-transparent-grey md:pl-30' : 'md:pr-30',
              )}
            >
              <div className="w-64 h-64 overflow-hidden relative rounded-lg">
                <Image
                  src={profile.image}
                  alt={`${profile.name} Image`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h4 className="text-2xl font-bold">{profile.name}</h4>
              <h5 className="text-xl text-brand-orange">{profile.title}</h5>
              <p className="text-left text-lg/relaxed indent-8 mt-8">{profile.blurb}</p>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};
