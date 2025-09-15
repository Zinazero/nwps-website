import mike from '@/assets/images/team/mike-hexamer.jpg';
import { MikeBlurb, BrianBlurb, WendyBlurb, MarkBlurb } from './Blurbs.ts';
import brian from '@/assets/images/team/brian-salter.jpg';
import wendy from '@/assets/images/team/wendy-hudgins.jpg';
import mark from '@/assets/images/team/mark-jones.jpg';

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
			title:
				'Territory Manager — Windsor, South Western Ontario, Northern Ontario',
			blurb: MarkBlurb,
		},
	];

	return (
		<section id='our-team'>
			<div className='flex flex-col items-center mt-20 p-16'>
				<h2 className='text-5xl font-bold p-10'>Our Team</h2>
				<div className='grid grid-cols-2'>
					{profiles.map((profile, i) => (
						<div
							className={`max-w-200 flex flex-col items-center text-center p-4 ${
								i % 2 !== 0 ? 'border-l border-transparent-grey' : ''
							}`}
						>
							<div className='w-64 h-64 overflow-hidden relative rounded-lg'>
								<img
									src={profile.image}
									alt={`${profile.name} Image`}
									className='w-full h-full object-cover object-top'
								/>
							</div>
							<div className='min-h-24'>
								<h4 className='text-2xl font-bold'>{profile.name}</h4>
								<h5 className='text-xl text-brand-orange'>{profile.title}</h5>
							</div>
							<p className='text-left text-grey text-lg/relaxed indent-8'>
								{profile.blurb}
							</p>
						</div>
					))}
				</div>
				<div></div>
			</div>
		</section>
	);
};
