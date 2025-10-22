import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import nwpsLogo from '@/assets/logos/nwps-logo.svg';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Image } from '../ui/Image';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../ui/Loading';
import type { LinkType } from './types';
import { cn } from '../../utils/cn';

export const Header = () => {
	const location = useLocation();
	const { productsLinks, loading } = useProducts();

	const links: LinkType[] = [
		{ label: 'Home', to: '/' },
		{ label: 'About', to: '/about' },
		{ label: 'Portfolio', to: '/portfolio' },
		{ label: 'Products', to: '/products', isDropdown: true },
		{ label: 'Testimonials', to: '/testimonials' },
	];

	return (
		<header className={cn('sticky top-0 z-50 w-full shadow-md bg-white p-4')}>
			<div className={cn('mx-auto px-4 flex items-center justify-between')}>
				<Link to='/'>
					<Image
						src={nwpsLogo}
						alt='NWPS Logo'
						className={cn('h-16 cursor-pointer')}
					/>
				</Link>

				<nav
					className={cn(
						'hidden md:flex items-center xl:space-x-20 space-x-10 text-xl font-medium'
					)}
				>
					{links.map((link: LinkType) =>
						link.isDropdown ? (
							<div key={link.label} className={cn('relative group')}>
								<Link
									to={link.to}
									className={cn(
										'hover:text-brand-orange transition relative bg-transparent border-none',
										'outline-none cursor-pointer flex items-center font-bold',
										{ 'text-brand-orange': location.pathname.includes(link.to) }
									)}
								>
									{link.label}
									<FontAwesomeIcon
										icon={faChevronDown}
										className={cn('text-lg ml-2')}
									/>
									{location.pathname.includes(link.to) && (
										<hr
											className={cn(
												'absolute w-full top-full mt-2 text-orange'
											)}
										/>
									)}
								</Link>
								<div
									className={cn(
										'flex flex-col absolute z-50 w-60 left-0 top-full bg-white text-black',
										'rounded-lg shadow-lg transition-opacity overflow-hidden',
										'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
									)}
								>
									{loading ? (
										<Loading />
									) : productsLinks.length === 0 ? (
										<Link to='#' className={cn('px-4 py-2 text-gray-400')}>
											No products available
										</Link>
									) : (
										productsLinks.map((sublink) => (
											<Link
												key={sublink.label}
												to={sublink.to}
												className={cn(
													'px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition',
													{
														'text-brand-orange': location.pathname.includes(
															sublink.to
														),
													}
												)}
											>
												{sublink.label}
											</Link>
										))
									)}
								</div>
							</div>
						) : (
							<Link
								key={link.label}
								to={link.to}
								className={cn(
									'hover:text-brand-orange transition bg-transparent border-none',
									'outline-none cursor-pointer relative font-bold',
									{ 'text-brand-orange': location.pathname === link.to }
								)}
							>
								{link.label}
								{location.pathname === link.to && (
									<hr
										className={cn('absolute w-full top-full mt-2 text-orange')}
									/>
								)}
							</Link>
						)
					)}

					<div className={cn('flex gap-6')}>
						<Link
							to='/contact'
							className={cn(
								'p-4 w-50 text-center rounded-lg cursor-pointer',
								'bg-brand-orange text-white font-bold hover:bg-brand-blue transition'
							)}
						>
							Request a Quote
						</Link>
						<Link
							to='/store'
							className={cn(
								'p-4 w-50 text-center rounded-lg cursor-pointer',
								'bg-brand-green text-white font-bold hover:bg-brand-blue transition'
							)}
						>
							Visit Store
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
};
