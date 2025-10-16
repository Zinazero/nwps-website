import Link from 'next/link';
import { LinkType } from '@/app/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ProductsDropdown } from './ProductsDropdown';
import { NavLink } from '../../ui/NavLink';

export const NavLinks = () => {
	const links: LinkType[] = [
		{ label: 'Home', to: '/' },
		{ label: 'About', to: '/about' },
		{ label: 'Portfolio', to: '/portfolio' },
		{ label: 'Products', to: '/products', isDropdown: true },
		{ label: 'Testimonials', to: '/testimonials' },
	];

	return (
		<nav className='hidden md:flex items-center xl:space-x-20 space-x-10 text-xl font-medium'>
			{links.map((link: LinkType) =>
				link.isDropdown ? (
					<div key={link.label} className='relative group'>
						<NavLink
							href={link.to}
							className='hover:text-brand-orange transition relative bg-transparent border-none outline-none cursor-pointer flex items-center font-bold'
							activeClass='text-brand-orange'
						>
							{link.label}
							<FontAwesomeIcon icon={faChevronDown} className='fa-icon ml-2' />
						</NavLink>
						<ProductsDropdown />
					</div>
				) : (
					<NavLink
						key={link.label}
						href={link.to}
						className='hover:text-brand-orange transition bg-transparent border-none outline-none cursor-pointer relative font-bold'
						activeClass='text-brand-orange'
					>
						{link.label}
					</NavLink>
				)
			)}

			<Link
				href='/contact'
				className='p-4 rounded-lg cursor-pointer bg-brand-orange text-white font-bold hover:bg-brand-blue transition'
			>
				Request a Quote
			</Link>
		</nav>
	);
};
