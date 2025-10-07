import { AuthorizedDistributor } from './sections/AuthorizedDistributor';
import { HomeHero } from './sections/HomeHero';
import { PlaygroundStats } from './sections/PlaygroundStats';
import { PlayworldBanner } from '../components/ui/PlayworldBanner';
import { RecentProjects } from './sections/RecentProjects';
import { TestimonialSection } from './sections/TestimonialSection';

const Home = () => {
	return (
		<main className='flex flex-col space-y-12'>
			<HomeHero />

			<PlayworldBanner />

			{/* <RecentProjects /> */}

			<TestimonialSection />

			<PlaygroundStats />

			{/* <AuthorizedDistributor /> */}
		</main>
	);
};

export default Home;
