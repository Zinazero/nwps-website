import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export const RequestQuoteButton = ({ className }: { className?: string }) => (
  <Link
    to="/contact"
    className={cn(
      className,
      'p-4 text-center rounded-lg cursor-pointer',
      'bg-brand-orange text-white font-bold hover:bg-brand-blue transition',
    )}
  >
    Request a Quote
  </Link>
);
