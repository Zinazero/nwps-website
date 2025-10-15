'use client';

import { cn } from '@/app/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
	children: React.ReactNode;
	href: string;
	className?: string;
	activeClass?: string;
}

export const NavLink = ({
	children,
	href,
	className,
	activeClass,
}: NavLinkProps) => {
	const pathname = usePathname();

	const homeChecker = (href: string) => {
		if (href === '/') {
			if (pathname === href) {
				return true;
			}

			return false;
		} else if (pathname?.includes(href)) {
			return true;
		}

		return false;
	};

	return (
		<Link href={href} className={cn(className, homeChecker(href) ? activeClass : '')}>
			{children}
			{homeChecker(href) && (
				<hr className='absolute w-full top-full mt-2 text-orange' />
			)}
		</Link>
	);
};
