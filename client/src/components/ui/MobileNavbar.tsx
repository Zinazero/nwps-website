import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import type { LinkType } from '../layout/types';
import { Loading } from './Loading';
import type { NavbarProps } from './types';
import { AnimatePresence, motion } from 'framer-motion';

/* 
 productsLinks is hardcoded as the only dropdown so additional logic has to be added to accomodate more dropdowns.
 openDropdown is coded to respect multiple dropdowns.
*/

export const MobileNavbar = ({ locationPathname, links, productsLinks, loading }: NavbarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string>('');

  return (
    <nav className="flex flex-col w-full text-2xl">
      {links.map((link: LinkType) =>
        link.isDropdown ? (
          <div key={link.label}>
            {/* Dropdown Link */}
            <div className="flex justify-between pl-4">
              <Link
                to={link.to}
                className={cn('w-full py-4', { 'text-brand-orange': locationPathname.includes(link.to) })}
              >
                {link.label}
              </Link>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === link.label ? '' : link.label)}
                className="flex items-center justify-center px-4"
              >
                <FontAwesomeIcon
                  icon={openDropdown === link.label ? faChevronUp : faChevronDown}
                  className={cn('text-lg', { 'text-brand-orange': locationPathname.includes(link.to) })}
                />
              </button>
            </div>
            <hr className="text-transparent-grey" />

            {/* Sublinks */}
            <AnimatePresence>
              {openDropdown === link.label && (
                <motion.div
                  key="mobile-nav"
                  initial={{ height: 0, y: -20 }}
                  animate={{ height: 'auto', y: 0 }}
                  exit={{ height: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex flex-col overflow-hidden origin-top"
                >
                  {loading ? (
                    <Loading />
                  ) : productsLinks.length < 1 ? (
                    <Link to="#">
                      <div className="pl-8 pr-4 py-4 text-gray-400">No products available</div>
                      <hr className=" text-transparent-grey" />
                    </Link>
                  ) : (
                    productsLinks.map((sublink) => (
                      <Link to={sublink.to} key={sublink.label}>
                        <div
                          className={cn('pl-8 pr-4 py-4', {
                            'text-brand-orange': locationPathname.includes(sublink.to),
                          })}
                        >
                          {sublink.label}
                        </div>
                        <hr className="text-transparent-grey" />
                      </Link>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link key={link.label} to={link.to}>
            <div className={cn('p-4', { 'text-brand-orange': locationPathname === link.to })}>
              {link.label}
            </div>
            <hr className="text-transparent-grey" />
          </Link>
        ),
      )}
      <Link to="/contact">
        <div className="p-4 bg-brand-orange text-white">Request a Quote</div>
      </Link>
      <Link to="/store">
        <div className="p-4 bg-brand-green text-white">Visit Store</div>
      </Link>
    </nav>
  );
};
