import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import type { LinkType } from '../layout/types';
import { Loading } from './Loading';
import type { NavbarProps } from './types';

/* 
 productsLinks is hardcoded as the only dropdown so additional logic has to be added to accomodate more dropdowns.
 openDropdown is coded to respect multiple dropdowns.
*/

export const MobileNavbar = ({ locationPathname, links, productsLinks, loading }: NavbarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string>('');

  return (
    <nav className="flex flex-col w-full text-2xl">
      {links.map((link: LinkType, i) =>
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
            {openDropdown === link.label && (
              <div className={cn('flex flex-col ')}>
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
              </div>
            )}
          </div>
        ) : (
          <Link key={link.label} to={link.to}>
            <div
              className={cn(
                'px-4',
                { 'text-brand-orange': locationPathname === link.to },
                i !== links.length - 1 ? 'py-4' : 'pt-4',
              )}
            >
              {link.label}
            </div>
            {i !== links.length - 1 && <hr className="text-transparent-grey" />}
          </Link>
        ),
      )}
    </nav>
  );
};
