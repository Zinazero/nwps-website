import { AboutHero } from './sections/AboutHero';
import { OurStory } from './sections/OurStory';
import { OurTeam } from './sections/OurTeam/OurTeam';

export const About = () => {
  return (
    <div className="">
      <AboutHero />

      <OurStory />

      <OurTeam />
    </div>
  );
};
