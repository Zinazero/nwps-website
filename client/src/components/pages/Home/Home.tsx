import { AuthorizedDistributor } from './sections/AuthorizedDistributor';
import { Hero } from './sections/HomeHero';
import { PlaygroundStats } from './sections/PlaygroundStats';
import { PlayworldSection } from './sections/PlayworldSection';
import { RecentProjects } from './sections/RecentProjects';
import { TestimonialSection } from './sections/TestimonialSection';

export const Home = () => {
	return (
		<main className=''>
			<Hero />

			<PlayworldSection />

			<RecentProjects />

			<TestimonialSection />

			<PlaygroundStats />

			<AuthorizedDistributor />
		</main>
	);
};
