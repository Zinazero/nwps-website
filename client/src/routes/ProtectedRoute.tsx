import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react';

interface ProtectedRouteProps {
	children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to='/login' replace />;
	}

	return children;
};
