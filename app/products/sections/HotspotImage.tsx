import Image from 'next/image';
import './hotspots.css';
import Link from 'next/link';
import { cn } from '@/app/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export const HotspotImage = () => {
	interface HotspotLink {
		slug: string;
		top: string;
		left: string;
		label: string;
	}

	const hotspotLinks: HotspotLink[] = [
		{
			slug: 'playgrounds',
			top: '18%',
			left: '38%',
			label: 'Playgrounds',
		},
		{
			slug: 'safety-surfacing',
			top: '58%',
			left: '69%',
			label: 'Safety Surfacing',
		},
		{
			slug: 'park-amenities',
			top: '89%',
			left: '30%',
			label: 'Park Amenities',
		},
	];

	return (
		<div className='relative rounded-xl overflow-hidden shadow-lg'>
			<Image
				src='/images/generic/products-image.jpg'
				alt='Playground with hotspots'
                width={1536}
                height={863}
				className='w-full max-w-350 h-full object-cover relative z-10'
			/>
			{hotspotLinks.map((link, i) => (
				<Link
					key={`Hotspot ${i}`}
					href={`/products/${link.slug}`}
                    style={{ top: link.top, left: link.left }}
					className={cn(
						'absolute z-11 bg-brand-orange hover:bg-white hotspot',
						'hover:text-brand-orange transition p-2 rounded-4xl text-white'
					)}
				>
					<FontAwesomeIcon icon={faInfo} className='text-lg fa-icon' /> {link.label}
				</Link>
			))}
		</div>
	);
};
