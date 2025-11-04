import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import type { LinkType } from '../layout/types';
import { Loading } from './Loading';
import type { NavbarProps } from './types';

// productsLinks is hardcoded as the only dropdown so additional logic has to be added to accomodate more dropdowns.

export const Navbar = ({ locationPathname, links, productsLinks, loading }: NavbarProps) => {
  return (
    <nav className={cn('hidden md:flex items-center xl:space-x-20 space-x-10 text-xl font-medium')}>
      {links.map((link: LinkType) =>
        link.isDropdown ? (
          <div key={link.label} className={cn('relative group')}>
            <Link
              to={link.to}
              className={cn(
                'hover:text-brand-orange transition relative bg-transparent border-none',
                'outline-none cursor-pointer flex items-center font-bold',
                { 'text-brand-orange': locationPathname.includes(link.to) },
              )}
            >
              {link.label}
              <FontAwesomeIcon icon={faChevronDown} className={cn('text-lg ml-2')} />
              {locationPathname.includes(link.to) && (
                <hr className={cn('absolute w-full top-full mt-2 text-orange')} />
              )}
            </Link>
            <div
              className={cn(
                'flex flex-col absolute z-50 w-60 left-0 top-full bg-white text-black',
                'rounded-lg shadow-lg transition-opacity overflow-hidden',
                'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
              )}
            >
              {loading ? (
                <Loading />
              ) : productsLinks.length < 1 ? (
                <Link to="#" className={cn('px-4 py-2 text-gray-400')}>
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
                        'text-brand-orange': locationPathname.includes(sublink.to),
                      },
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
              { 'text-brand-orange': locationPathname === link.to },
            )}
          >
            {link.label}
            {locationPathname === link.to && (
              <hr className={cn('absolute w-full top-full mt-2 text-orange')} />
            )}
          </Link>
        ),
      )}

      <div className={cn('flex gap-6')}>
        <Link
          to="/contact"
          className={cn(
            'p-4 w-50 text-center rounded-lg cursor-pointer',
            'bg-brand-orange text-white font-bold hover:bg-brand-blue transition',
          )}
        >
          Request a Quote
        </Link>
        <Link
          to="/store"
          className={cn(
            'p-4 w-50 text-center rounded-lg cursor-pointer',
            'bg-brand-green text-white font-bold hover:bg-brand-blue transition',
          )}
        >
          Visit Store
        </Link>
      </div>
    </nav>
  );
};
