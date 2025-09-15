import { useLocation } from 'react-router-dom';

export const PortfolioItem = () => {
	const { state } = useLocation();
	const park = state?.park;

	if (!park) return <p>No park data found.</p>;

	return (
		<div className='p-6 flex flex-col items-center space-y-12'>
			<img
				src={`/images/playgrounds/${park.image}`}
				alt={`${park.name} Image 1`}
				className='w-full max-w-250 rounded-xl'
			/>
			<div className='text-center max-w-300 space-y-4'>
				<h1 className='text-5xl font-bold'>{park.name}</h1>
				<p className='text-xl text-grey'>
					A 13,000 sq ft accessible playground featuring an aeroglider
					playcubes. The PlayCubes 13.0SL is a unique climbing and slide
					component where children must navigate their way across PlayCubes to
					get to the slides. Wheelchair Ramps encourages cooperation & teamwork
					among children of all ages and abilities.
				</p>
			</div>
		</div>
	);
};
