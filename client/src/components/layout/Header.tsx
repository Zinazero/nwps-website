import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import nwpsLogo from '@/assets/logos/nwps-logo.svg';
import { useProducts } from '../../contexts/ProductsContext';
import { cn } from '../../utils/cn';
import { useIsMobile } from '../../utils/useIsMobile';
import { Image } from '../ui/Image';
import { MenuButton } from '../ui/MenuButton';
import { MobileNavbar } from '../ui/MobileNavbar';
import { Navbar } from '../ui/Navbar';
import { scrollUp } from '../ui/ScrollToTop';
import type { NavbarProps } from '../ui/types';
import type { LinkType } from './types';
import { AnimatePresence, motion } from 'framer-motion';

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { productsLinks, loading } = useProducts();
  const isMobile = useIsMobile(1024);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // biome-ignore lint: pathname change triggers nav close
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  const links: LinkType[] = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Products', to: '/products', isDropdown: true },
    { label: 'Testimonials', to: '/testimonials' },
  ];

  const navbarProps: NavbarProps = {
    locationPathname: pathname,
    links,
    productsLinks,
    loading,
  };

  return (
    <header className={cn('fixed top-0 z-50 w-full shadow-md bg-white', mobileNavOpen ? 'pt-4' : 'py-4')}>
      <div className="flex flex-col w-full">
        <div className={cn('px-4 flex items-center justify-between')}>
          <button type="button" onClick={() => (pathname === '/' ? scrollUp() : navigate('/'))}>
            <Image src={nwpsLogo} alt="NWPS Logo" className={cn('min-w-55 cursor-pointer')} priority />
          </button>

          {isMobile ? (
            <MenuButton open={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)} />
          ) : (
            <Navbar {...navbarProps} />
          )}
        </div>
        <AnimatePresence>
          {isMobile && mobileNavOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ height: 0, y: -20 }}
              animate={{ height: 'auto', y: 0 }}
              exit={{ height: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col overflow-hidden origin-top"
            >
              <MobileNavbar {...navbarProps} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
