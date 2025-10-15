import { AboutHero } from './sections/AboutHero';
import { OurStory } from './sections/OurStory';
import { OurTeam } from './sections/OurTeam/OurTeam';

const About = () => {
	return (
		<main className=''>
			<AboutHero />

			<OurStory />

			<OurTeam />
		</main>
	);
};

export default About;
