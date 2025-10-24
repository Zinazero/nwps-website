import { AboutHero } from './sections/AboutHero';
import { OurStory } from './sections/OurStory';
import { OurTeam } from './sections/OurTeam/OurTeam';

export const About = () => {
  return (
    <main className="">
      <AboutHero />

      <OurStory />

      <OurTeam />
    </main>
  );
};
