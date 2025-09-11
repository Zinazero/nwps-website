import { AboutHero } from './sections/AboutHero';
import { OurStory } from './sections/OurStory';
import { OurTeam } from './sections/OurTeam/OurTeam';

export const About = () => {
	return (
		<main className='min-h-screen'>
			<AboutHero />

			<OurStory />

			<OurTeam />
		</main>
	);
};
