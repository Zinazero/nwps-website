import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { OrderForm } from '../../components/forms/OrderForm';
import type { OrderFormValues } from '../../components/forms/types';
import { cn } from '../../utils/cn';

export const Store = () => {
  const defaultForm: OrderFormValues = {
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    province: 'ON',
    postalCode: '',
    message: '',
    quantity: 5,
  };

  const [form, setForm] = useState<OrderFormValues>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ENSURE ROUNDED QUANTITY BEFORE SENDING
    // ENSURE VALID POSTAL CODE BEFORE SENDING

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm(defaultForm);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center gap-20 px-4 py-12">
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img src="/images/swings/swing-1.jpg" alt="Swing" />
      </div>

      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <h1 className="text-4xl font-bold text-brand-orange mb-4 text-center">Swing Seats</h1>
          <p className="text-center mb-8">
            Beautifully made, built to last. Submit an order request and we’ll send you an invoice.
          </p>

          {!submitted ? (
            <OrderForm form={form} setForm={setForm} handleSubmit={handleSubmit} loading={loading} />
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-brand-green mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Thank you for your request!</h2>
              <p className="text-gray-600 max-w-md">
                We’ve received your order details and will send an invoice to your email soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className={cn(
                  'mt-6 p-2 w-1/2 bg-brand-blue hover:bg-brand-orange transition',
                  'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
                )}
              >
                Place another order
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-100 py-6 px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">Each swing seat is handcrafted from sustainably sourced wood.</p>
          <span className="font-semibold mt-3 md:mt-0">Starting at $185</span>
        </div>
      </div>
    </main>
  );
};
