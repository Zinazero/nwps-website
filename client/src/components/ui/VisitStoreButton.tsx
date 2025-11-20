import { Link } from 'react-router-dom';
import { STORE_ENABLED } from '../../config';
import { cn } from '../../utils/cn';

export const VisitStoreButton = ({ className }: { className?: string }) => {
  if (STORE_ENABLED)
    return (
      <Link
        to="/store"
        className={cn(
          className,
          'p-4 text-center rounded-lg cursor-pointer',
          'bg-brand-green text-white font-bold hover:bg-brand-blue transition',
        )}
      >
        Visit Store
      </Link>
    );
};
