import { useState } from 'react';
import { OrderForm } from '../../components/forms/OrderForm';
import type { OrderFormValues, ProductOrder } from '../../components/forms/types';
import { OrderThanks } from './components/OrderThanks';

interface OrderProps {
  cart: ProductOrder[];
}

export const Order = ({ cart }: OrderProps) => {
  const defaultForm: OrderFormValues = {
    cart,
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
    <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="p-8 md:p-12">
        <h1 className="text-4xl font-bold text-brand-orange mb-4 text-center">Swing Seats</h1>
        <p className="text-center mb-8">
          Beautifully made, built to last. Submit an order request and we’ll send you an invoice.
        </p>

        {!submitted ? (
          <OrderForm form={form} setForm={setForm} handleSubmit={handleSubmit} loading={loading} />
        ) : (
          <OrderThanks onClick={() => setSubmitted(false)} />
        )}
      </div>

      <div className="bg-gray-100 py-6 px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">Each swing seat is handcrafted from sustainably sourced wood.</p>
        <span className="font-semibold mt-3 md:mt-0">Starting at $185</span>
      </div>
    </div>
  );
};
