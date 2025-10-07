'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollUp } from '../../ui/ScrollToTop';

export const AdminButton = () => {
	const { user, logout } = useAuth();
	const pathname = usePathname();

	const adminButtonClasses =
		'text-sm text-transparent-grey hover:text-brand-green transition cursor-pointer';

	const handleLogout = async () => {
		try {
			//await api.post('/auth/logout');
			logout();
			//navigate('/');
			scrollUp();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			{user ? (
				<button
					type='button'
					className={adminButtonClasses}
					onClick={handleLogout}
				>
					Logout
				</button>
			) : (
				<Link
					href={`/login?returnTo=${encodeURIComponent(pathname)}`}
					replace
					className={adminButtonClasses}
				>
					Admin Login
				</Link>
			)}
		</>
	);
};
