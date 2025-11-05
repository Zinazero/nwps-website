import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/axios';
import { CallToAction } from '../../../components/ui/CallToAction';
import { Loading } from '../../../components/ui/Loading';
import { ParkCard } from '../../../components/ui/ParkCard';
import { cn } from '../../../utils/cn';
import type { Park } from '../../types';

export const RecentProjects = () => {
  const [recentProjects, setRecentProjects] = useState<Park[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentParks = async () => {
      try {
        const res = await api.get<Park[]>('/parks/recent');
        setRecentProjects(res.data);
      } catch (err) {
        console.error('Error fetching parks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentParks();
  }, []);

  return (
    <section>
      {/* Recent Projects */}
      <div className={cn('flex flex-col max-w-400 mx-auto px-4 py-14 space-y-10', 'md:px-20')}>
        <Link to="/portfolio">
          <div className={cn('flex flex-col items-center w-full group', 'md:flex-row')}>
            <h2
              className={cn(
                'text-5xl font-bold text-nowrap mr-0 transition',
                'md:mr-6 md:group-hover:translate-x-4',
              )}
            >
              Recent Projects
            </h2>
            <hr
              className={cn(
                'w-full text-brand-orange transition mt-4',
                'md:group-hover:translate-x-4 md:mt-0',
              )}
            />
          </div>
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 text-center">
            {recentProjects.map((park) => (
              <div key={park.id}>
                <ParkCard park={park} className="mb-24" />
                <p className="text-lg/loose">{park.blurb || park.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call To Action Banner */}
      <CallToAction />
    </section>
  );
};
