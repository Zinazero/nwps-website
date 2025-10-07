'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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
				const res = await fetch('/api/auth/check-auth', { cache: 'no-store' });
				const data = await res.json();
				if (data.authenticated) {
					setUser({ username: data.username, isSu: data.isSu });
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
