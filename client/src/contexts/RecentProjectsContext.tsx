import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import type { LinkType } from '../components/layout/types';
import type { Park } from '../pages/types';

interface RecentProjectsContextType {
  recentProjects: Park[];
  projectLinks: LinkType[];
  loading: boolean;
  fetchRecentProjects: () => void;
}

const RecentProjectsContext = createContext<RecentProjectsContextType | undefined>(undefined);

export const RecentProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [recentProjects, setRecentProjects] = useState<Park[]>([]);
  const [projectLinks, setProjectLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentProjects = useCallback(async () => {
    try {
      const res = await api.get<Park[]>('/parks/recent/7');

      const parks = res.data.slice(0, 3);

      const projectLinksArray: LinkType[] = res.data.map((park) => ({
        label: park.title,
        to: `/portfolio/${park.slug}`,
      }));

      setRecentProjects(parks);
      setProjectLinks(projectLinksArray);
    } catch (err) {
      console.error('Error fetching recent projects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentProjects();
  }, [fetchRecentProjects]);

  return (
    <RecentProjectsContext.Provider
      value={{
        recentProjects,
        projectLinks,
        loading,
        fetchRecentProjects,
      }}
    >
      {children}
    </RecentProjectsContext.Provider>
  );
};

export const useRecentProjects = () => {
  const context = useContext(RecentProjectsContext);
  if (!context) throw new Error('useRecentProjects must be used within a RecentProjectsProvider');
  return context;
};
