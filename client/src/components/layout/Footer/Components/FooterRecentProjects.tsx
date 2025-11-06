import { Link } from 'react-router-dom';
import { useRecentProjects } from '../../../../contexts/RecentProjectsContext';
import { cn } from '../../../../utils/cn';
import { Loading } from '../../../ui/Loading';

export const FooterRecentProjects = () => {
  const { projectLinks, loading } = useRecentProjects();

  return (
    <div
      className={cn(
        'flex flex-col border-transparent-grey px-8 pb-20 space-y-10',
        'md:w-1/4 md:border-l md:pb-0',
      )}
    >
      <div className={cn('flex flex-col items-center', 'md:inline')}>
        <h5 className="text-2xl font-semibold">PORTFOLIO</h5>
        <div className="w-10 border-b-2 border-brand-orange border-dotted mt-3"></div>
      </div>
      <ul className={cn('text-center space-y-4', 'md:text-left')}>
        {loading ? (
          <Loading />
        ) : projectLinks.length === 0 ? (
          <li className="text-xl text-gray-400">No parks available</li>
        ) : (
          projectLinks.map((link) => (
            <li key={link.label} className="text-xl curser-pointer hover:text-brand-green transition">
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
