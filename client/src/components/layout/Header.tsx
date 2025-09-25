import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import nwpsLogo from '@/assets/logos/nwps-logo.svg';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Image } from '../ui/Image';
import { useEffect, useState } from 'react';
import type { ProductsCategory } from '../../pages/types';
import api from '../../api/axios';
import { slugConverter } from '../../utils/parkNavConverter';

export type LinkType = {
	label: string;
	to: string;
	isDropdown?: boolean;
};

export const Header = () => {
	const location = useLocation();

	const [productsDropdownLinks, setProductsDropdownLinks] = useState<LinkType[]>([]);

	useEffect(() => {
		const fetchProductsCategories = async () => {
			try {
				const res = await api.get<ProductsCategory[]>('/products');
				const productsLinks: LinkType[] = [];

				for (const category of res.data) {
					const link: LinkType = {
						label: category.title,
						to: `/products/${slugConverter(category.title)}`,
					};

					productsLinks.push(link);
				}

				setProductsDropdownLinks(productsLinks);
			} catch (err) {
				console.error('Error fetching product categories:', err);
			}
		};

		fetchProductsCategories();
	}, []);

	const links: LinkType[] = [
		{ label: 'Home', to: '/' },
		{ label: 'About', to: '/about' },
		{ label: 'Portfolio', to: '/portfolio' },
		{ label: 'Products', to: '/products', isDropdown: true },
		{ label: 'Testimonials', to: '/testimonials' },
	];

	return (
		<header className='sticky top-0 z-50 w-full shadow-md bg-white p-4'>
			<div className='mx-auto px-4 flex items-center justify-between'>
				<Link to='/'>
					<Image
						src={nwpsLogo}
						alt='NWPS Logo'
						className='h-16 cursor-pointer'
					/>
				</Link>

				<nav className='hidden md:flex items-center xl:space-x-20 space-x-10 text-xl font-medium'>
					{links.map((link: LinkType) =>
						link.isDropdown ? (
							<div key={link.label} className='relative group'>
								<Link
									to={link.to}
									className={`hover:text-brand-orange transition relative bg-transparent border-none outline-none cursor-pointer flex items-center font-bold ${
										location.pathname.includes(link.to)
											? 'text-brand-orange'
											: ''
									}`}
								>
									{link.label}
									<FontAwesomeIcon
										icon={faChevronDown}
										className='text-lg ml-2'
									/>
									{location.pathname.includes(link.to) && (
										<hr className='absolute w-full top-full mt-2 text-orange' />
									)}
								</Link>
								<ul className='absolute z-50 w-60 left-0 top-full bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity overflow-hidden'>
									{productsDropdownLinks.map((sublink) => (
										<li
											key={sublink.label}
											className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'
										>
											<Link to={sublink.to} className={location.pathname.includes(sublink.to)
											? 'text-brand-orange'
											: ''}>{sublink.label}</Link>
										</li>
									))}
								</ul>
							</div>
						) : (
							<Link
								key={link.label}
								to={link.to}
								className={`hover:text-brand-orange transition bg-transparent border-none outline-none cursor-pointer relative font-bold ${
									location.pathname === link.to ? 'text-brand-orange' : ''
								}`}
							>
								{link.label}
								{location.pathname === link.to && (
									<hr className='absolute w-full top-full mt-2 text-orange' />
								)}
							</Link>
						)
					)}

					<Link
						to='/contact'
						className='p-4 rounded-lg cursor-pointer bg-brand-orange text-white font-bold hover:bg-brand-blue transition'
					>
						Request a Quote
					</Link>
				</nav>
			</div>
		</header>
	);
};
