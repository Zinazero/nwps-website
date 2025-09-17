import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { JSX } from 'react';
import { Loading } from '../components/ui/Loading';

interface ProtectedRouteProps {
	children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<Loading />;
			</div>
		);
	}

	if (!user) {
		return <Navigate to='/login' replace />;
	}

	return children;
};
