import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../../utils/cn';

interface OrderThanksProps {
  orderNumber: string;
  onClick: () => void;
}

export const OrderThanks = ({ orderNumber, onClick }: OrderThanksProps) => (
  <div className="flex flex-col items-center justify-center text-center py-12">
    <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-brand-green mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Thank you for your request!</h2>
    <p className="text-gray-600 max-w-md">
      We’ve received your order details and will send an invoice to your email soon.
    </p>

    <h3 className='my-10 text-brand-orange font-semibold'>Order #: {orderNumber}</h3>
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'mt-6 p-2 w-1/2 bg-brand-blue hover:bg-brand-orange transition',
        'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
      )}
    >
      Place another order
    </button>
  </div>
);
