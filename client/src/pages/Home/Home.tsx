import { SEO } from '../../components/seo/SEO';
import { PlayworldBanner } from '../../components/ui/PlayworldBanner';
import { AuthorizedDistributor } from './sections/AuthorizedDistributor';
import { Hero } from './sections/HomeHero';
import { PlaygroundStats } from './sections/PlaygroundStats';
import { RecentProjects } from './sections/RecentProjects';
import { TestimonialSection } from './sections/TestimonialSection';

export const Home = () => {
  const metadata = {
    title: 'New World Park Solutions - Building Worlds of Fun',
    description:
      'Building worlds of fun: Explore New World Park Solutions products, parks and playgrounds. Exclusive Ontario distributor for Playworld products.',
    pathname: '/',
  };

  return (
    <>
      <SEO {...metadata} />
      <div className="flex flex-col space-y-12">
        <Hero />

        <PlayworldBanner />

        <RecentProjects />

        <TestimonialSection />

        <PlaygroundStats />

        <AuthorizedDistributor />
      </div>
    </>
  );
};
