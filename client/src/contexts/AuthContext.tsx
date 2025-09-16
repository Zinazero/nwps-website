import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../api/axios';

interface AuthContextType {
	user: { username: string } | null;
	login: (usename: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<{ username: string } | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const res = await api.get('/auth/check-auth');
				if (res.data.authenticated) {
					setUser({ username: res.data.username });
				}
			} catch {
				setUser(null);
			}
		};
		checkAuth();
	}, []);

	const login = (username: string) => setUser({ username });
	const logout = () => setUser(null);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};
