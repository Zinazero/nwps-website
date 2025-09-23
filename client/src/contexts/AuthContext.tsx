import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/axios';

interface AuthContextType {
	user: { username: string; isSu: boolean } | null;
	login: (usename: string, isSu: boolean) => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<{ username: string; isSu: boolean } | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await api.get('/auth/check-auth');
				if (res.data.authenticated) {
					setUser({ username: res.data.username, isSu: res.data.isSu });
				}
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

	const login = (username: string, isSu: boolean) =>
		setUser({ username, isSu });
	const logout = () => setUser(null);

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};
