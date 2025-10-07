'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const scrollUp = () => {
	setTimeout(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, 10);
};

export const ScrollToTop: React.FC = () => {
	const pathname = usePathname();

	useEffect(() => {
		scrollUp();
	}, [pathname]);

	return null;
};
