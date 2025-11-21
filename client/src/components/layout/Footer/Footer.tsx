import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { cn } from '../../../utils/cn';
import { useIsMobile } from '../../../utils/useIsMobile';
import { LogoutButton } from '../LogoutButton';
import { FooterContact } from './Components/FooterContact';
import { FooterInfo } from './Components/FooterInfo';
import { FooterProducts } from './Components/FooterProducts';
import { FooterRecentProjects } from './Components/FooterRecentProjects';

export const Footer = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const adminButtonClasses =
    'text-sm text-transparent-grey hover:text-brand-green transition cursor-pointer min-w-18';

  return (
    <footer className="text-white">
      <div
        className="relative bg-center bg-black/85 p-2 flex flex-col items-center"
        style={{ backgroundImage: 'url(/images/generic/background-playground-icons.png)' }}
      >
        {/* Top Border */}
        <div className="absolute top-0 left-0 w-full h-2 grid grid-cols-3">
          <div className="bg-brand-orange"></div>
          <div className="bg-brand-green"></div>
          <div className="bg-brand-blue"></div>
        </div>

        {/* Footer Content */}
        <div className={cn('flex flex-col my-6', 'md:flex-row')}>
          {/* Section 1 */}
          <FooterInfo />

          {/* Section 2 */}
          <FooterProducts />

          {/* Section 3 */}
          <FooterContact />

          {/* Section 4 */}
          <FooterRecentProjects />
        </div>

        {/* Copyright */}
        <span className="text-brand-orange text-center">
          © 2025 | New World Park Solutions | All Rights Reserved
        </span>

        {/* Admin Login */}
        {!isMobile &&
          (user ? (
            <div className="flex items-center">
              {user.roleLevel <= 1 && (
                <>
                  <Link to="/admin/send-invite" className={adminButtonClasses}>
                    Invite Staff
                  </Link>
                  <span className="mx-10">|</span>
                </>
              )}
              <LogoutButton classes={adminButtonClasses} />
            </div>
          ) : (
            <Link to="/login" state={{ from: location }} replace className={adminButtonClasses}>
              Admin Login
            </Link>
          ))}
      </div>
    </footer>
  );
};
