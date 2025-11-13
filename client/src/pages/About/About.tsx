import { SEO } from '../../components/seo/SEO';
import { AboutHero } from './sections/AboutHero';
import { OurStory } from './sections/OurStory';
import { OurTeam } from './sections/OurTeam/OurTeam';

export const About = () => {
  const metadata = {
    title: 'About Us - New World Park Solutions',
    description:
      'Discover New World Park Solutions’ approach to creating safe and engaging playgrounds. Learn our story and meet our expert team.',
    pathname: '/about',
  };

  return (
    <>
      <SEO {...metadata} />
      <div className="min-h-screen">
        <AboutHero />

        <OurStory />

        <OurTeam />
      </div>
    </>
  );
};
