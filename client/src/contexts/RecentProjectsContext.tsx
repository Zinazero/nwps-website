import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import type { Park } from '../pages/types';

interface RecentProjectsContextType {
  recentProjects: Park[];
  loading: boolean;
  fetchRecentProjects: () => void;
}

const RecentProjectsContext = createContext<RecentProjectsContextType | undefined>(undefined);

export const RecentProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [recentProjects, setRecentProjects] = useState<Park[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentProjects = useCallback(async () => {
    try {
      const res = await api.get<Park[]>('/parks/recent');
      setRecentProjects(res.data);
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
