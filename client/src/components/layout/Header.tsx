import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import nwpsLogo from '@/assets/logos/nwps-logo.svg';
import { useProducts } from '../../contexts/ProductsContext';
import { cn } from '../../utils/cn';
import { useIsMobile } from '../../utils/useIsMobile';
import { Image } from '../ui/Image';
import { MenuButton } from '../ui/MenuButton';
import { MobileNavbar } from '../ui/MobileNavbar';
import { Navbar } from '../ui/Navbar';
import type { NavbarProps } from '../ui/types';
import type { LinkType } from './types';

export const Header = () => {
  const location = useLocation();
  const { productsLinks, loading } = useProducts();
  const isMobile = useIsMobile();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const links: LinkType[] = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Products', to: '/products', isDropdown: true },
    { label: 'Testimonials', to: '/testimonials' },
  ];

  const navbarProps: NavbarProps = {
    locationPathname: location.pathname,
    links,
    productsLinks,
    loading,
  };

  return (
    <header className={cn('sticky top-0 z-50 w-full shadow-md bg-white py-4')}>
      <div className="flex flex-col w-full">
        <div className={cn('px-4 flex items-center justify-between')}>
          <Link to="/">
            <Image src={nwpsLogo} alt="NWPS Logo" className={cn('min-w-55 cursor-pointer')} />
          </Link>

          {isMobile ? (
            <MenuButton onClick={() => setMobileNavOpen(!mobileNavOpen)} />
          ) : (
            <Navbar {...navbarProps} />
          )}
        </div>
        {isMobile && mobileNavOpen && <MobileNavbar {...navbarProps} />}
      </div>
    </header>
  );
};
