import { Hero } from './sections/Hero';
import { PlayworldSection } from './sections/PlayworldSection';
import { RecentProjects } from './sections/RecentProjects';
import { TestimonialSection } from './sections/TestimonialSection';

export const Home = () => {
	return (
		<main className='min-h-screen'>
			<Hero />

			<PlayworldSection />

			<RecentProjects />

			<TestimonialSection />
		</main>
	);
};
