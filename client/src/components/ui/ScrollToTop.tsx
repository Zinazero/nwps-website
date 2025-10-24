import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const scrollUp = () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 10);
};

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  // biome-ignore lint: pathname change triggers scroll
  useEffect(() => {
    scrollUp();
  }, [pathname]);

  return null;
};
