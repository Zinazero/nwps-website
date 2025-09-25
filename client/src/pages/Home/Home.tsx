import { AuthorizedDistributor } from './sections/AuthorizedDistributor';
import { Hero } from './sections/HomeHero';
import { PlaygroundStats } from './sections/PlaygroundStats';
import { PlayworldBanner } from '../../components/ui/PlayworldBanner';
import { RecentProjects } from './sections/RecentProjects';
import { TestimonialSection } from './sections/TestimonialSection';

export const Home = () => {
	return (
		<main className='flex flex-col space-y-12'>
			<Hero />

			<PlayworldBanner />

			<RecentProjects />

			<TestimonialSection />

			<PlaygroundStats />

			<AuthorizedDistributor />
		</main>
	);
};
