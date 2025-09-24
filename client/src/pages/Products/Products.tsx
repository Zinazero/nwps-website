import { Link } from 'react-router-dom';
import { Image } from '../../components/ui/Image';
import playground from '@/assets/images/generic/products-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import './hotspots.css';

export const Products = () => {
	const hotspotClasses =
		'absolute z-11 bg-brand-orange hover:bg-white hover:text-brand-orange transition p-2 rounded-4xl text-white';

	return (
		<main className='min-h-screen flex flex-col items-center justify-center p-12'>
			<div className='flex flex-col min-h-screen'>
				<div className='relative rounded-xl overflow-hidden shadow-lg'>
					<Image
						src={playground}
						alt='Playground with hotspots'
						className='w-full h-full object-cover relative z-10'
					/>
					<Link
						to='/'
						className={`top-[18%] left-[38%] hotspot ${hotspotClasses}`}
					>
						<FontAwesomeIcon icon={faInfo} className='text-lg' /> Playgrounds
					</Link>
					<Link
						to='/'
						className={`top-[58%] left-[69%] hotspot ${hotspotClasses}`}
					>
						<FontAwesomeIcon icon={faInfo} className='text-lg' /> Safety
						Surfacing
					</Link>
					<Link
						to='/'
						className={`top-[89%] left-[30%] hotspot ${hotspotClasses}`}
					>
						<FontAwesomeIcon icon={faInfo} className='text-lg' /> Park Amenities
					</Link>
				</div>
			</div>
		</main>
	);
};
