import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { Image } from '../components/ui/Image';
export const ProviderPage = () => {

	const { state } = useLocation();
	const name = state?.name;

	return (
		<main className=' flex flex-col items-center justify-center'>
			<div className='flex flex-col p-8 space-y-16 max-w-350'>
				{/* Hero */}
				<div className='flex justify-center space-x-12'>
					<Image
						src={`/images/distributors/${name}/${name}-1.jpg`}
						alt='Children playing in play structure'
						className='rounded-lg h-120'
					/>
					<div className='flex flex-col space-y-24'>
						<div className='flex flex-col space-y-2'>
							<span className='text-brand-blue'>
								We can help make your playground dreams a reality.
							</span>
							<h1 className='text-6xl font-bold'>Playworld</h1>
						</div>
						<p className='text-2xl '>
							Uniting communities through innovative and inclusive play.
							High-quality playground equipment for all, creating a positive
							future through play.
						</p>
					</div>
				</div>

				{/* Links */}
				<div className='flex items-center justify-between space-x-8 text-center'>
					<a
						href='https://playworld.com/'
						target='_blank'
						rel='noopener noreferrer'
						className='w-1/2'
					>
						<div className='p-6 border rounded-lg space-x-2 text-xl font-semibold'>
							<FontAwesomeIcon icon={faUpRightFromSquare} />
							<span>Visit Playworld's Website</span>
						</div>
					</a>
					<Link
						to='/contact'
						className='w-1/2 p-6 bg-brand-blue text-light rounded-lg text-xl font-semibold'
					>
						I'M INTERESTED IN THIS PRODUCT
					</Link>
				</div>

				{/* Blurb */}
				<div className='flex flex-col space-y-4 mt-30'>
					<h3 className='text-4xl font-bold'>Playworld</h3>
					<p className='text-xl/relaxed '>
						A leading force in the playground industry, uniting communities
						through innovative and inclusive play. They offer high-quality
						playground equipment designed to enrich lives and create a positive
						future through outdoor, unstructured play. With a focus on inclusive
						design and craftsmanship, Playworld continues to lead with
						innovative solutions that reinvent and redefine play experiences for
						children of all abilities.
					</p>
				</div>
			</div>
		</main>
	);
};
