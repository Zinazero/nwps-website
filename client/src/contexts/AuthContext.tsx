import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

interface AuthContextType {
  user: { username: string; roleLevel: number } | null;
  login: (usename: string, roleLevel: number) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string; roleLevel: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/check-auth');
        if (res.data.authenticated) {
          setUser({ username: res.data.username, roleLevel: res.data.roleLevel });
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (username: string, roleLevel: number) => setUser({ username, roleLevel });
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
