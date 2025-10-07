import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from './NavLinks';

export const Header = () => {
	return (
		<header className='sticky top-0 z-50 w-full shadow-md bg-white p-4'>
			<div className='mx-auto px-4 flex items-center justify-between'>
				<Link href='/' className='w-60 h-16 cursor-pointer relative'>
					<Image
						src='/logos/nwps-logo.svg'
						alt='NWPS Logo'
						fill
						className='object-contain'
					/>
				</Link>

				<NavLinks />
			</div>
		</header>
	);
};
