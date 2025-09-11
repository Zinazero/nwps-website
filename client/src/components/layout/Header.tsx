import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
export const Header = () => {
	const location = useLocation();

	type LinkType = {
		label: string;
		to: string;
		isDropdown?: boolean;
	};

	const links: LinkType[] = [
		{ label: 'Home', to: '/' },
		{ label: 'About', to: '/about' },
		{ label: 'Portfolio', to: '/portfolio' },
		{ label: 'Products', to: '/products', isDropdown: true },
		{ label: 'Testimonials', to: '/testimonials' },
	];

	const productsDropdownLinks: LinkType[] = [
		{ label: 'Playgrounds', to: '/products/playgrounds' },
		{ label: 'Safety Surfacing', to: '/products/safety-surfacing' },
		{
			label: 'Sports and Outdoor Fitness',
			to: '/products/sports-and-outdoor-fitness',
		},
		{ label: 'Park Amenities', to: '/products/park-amenities' },
		{ label: 'Park Shelters', to: '/products/park-shelters' },
		{ label: 'Electronic Play', to: '/products/electronic-play' },
		{ label: 'Water Play', to: '/products/water-play' },
	];

	return (
		<header className='sticky top-0 z-50 w-full shadow-md bg-white p-4'>
			<div className='mx-auto px-4 flex items-center justify-between'>
				<Link to='/'>
					<img
						src='nwps-logo.svg'
						alt='NWPS Logo'
						className='h-16 cursor-pointer'
						draggable={false}
					/>
				</Link>

				<nav className='hidden md:flex items-center xl:space-x-20 space-x-10 text-2xl font-medium'>
					{links.map((link: LinkType) =>
						link.isDropdown ? (
							<div key={link.label} className='relative group'>
								<Link
									to={link.to}
									className={`hover:text-brand-orange transition relative bg-transparent border-none outline-none cursor-pointer flex items-center ${
										location.pathname.includes(link.to)
											? 'text-brand-orange'
											: ''
									}`}
								>
									{link.label}
									<FontAwesomeIcon
										icon='chevron-down'
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
											<Link to={sublink.to}>{sublink.label}</Link>
										</li>
									))}
								</ul>
							</div>
						) : (
							<Link
								key={link.label}
								to={link.to}
								className={`hover:text-brand-orange transition bg-transparent border-none outline-none cursor-pointer relative ${
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
					{/*
					<Link
						to="/"
						className='hover:text-brand-orange transition relative bg-transparent border-none outline-none cursor-pointer flex items-center'
					>
						Home
						<hr className='absolute w-full top-full mt-2 text-orange' />
					</Link>

					<Link
						to="/about"
						className='hover:text-brand-orange transition bg-transparent border-none outline-none cursor-pointer'
					>
						About
					</Link>

					<Link
						to="/portfolio"
						className='hover:text-brand-orange transition bg-transparent border-none outline-none cursor-pointer'
					>
						Portfolio
					</Link>

					<div className='relative group'>
						<Link
							to="/products"
							className='hover:text-brand-orange transition relative bg-transparent border-none outline-none cursor-pointer flex items-center'
						>
							Products
							<FontAwesomeIcon icon='chevron-down' className='text-lg ml-2' />
						</Link>
						<ul className='absolute w-60 left-0 my-2 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden'>
							<li className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'>
								Playgrounds
							</li>

							<li className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'>
								Safety Surfacing
							</li>

							<li className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'>
								Sports and Outdoor Fitness
							</li>

							<li className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'>
								Park Amenities
							</li>

							<li className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'>
								Park Shelters
							</li>

							<li className='px-4 py-2 cursor-pointer border-b border-transparent-grey hover:text-brand-orange transition'>
								Electronic Play
							</li>

							<li className='px-4 py-2 cursor-pointer hover:text-brand-orange transition'>
								Water Play
							</li>
						</ul>
					</div>

					<Link
						to="#testimonials"
						className='hover:text-brand-orange transition bg-transparent border-none outline-none cursor-pointer'
						onClick={e => {
							e.preventDefault();
							document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						Testimonials
					</Link>

					<Link
						to="/quote"
						className='p-4 rounded-lg cursor-pointer bg-brand-orange text-white hover:bg-brand-blue transition'
					>
						Request a Quote
					</Link> 
                    */}
				</nav>
			</div>
		</header>
	);
};
