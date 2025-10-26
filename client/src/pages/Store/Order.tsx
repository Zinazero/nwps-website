import { useState } from 'react';
import api from '../../api/axios';
import { OrderForm } from '../../components/forms/OrderForm';
import type { OrderFormValues, OrderItem } from '../../components/forms/types';
import { phoneNumberFormatter } from '../../utils/phoneNumberFormatter';
import { OrderThanks } from './components/OrderThanks';

interface OrderProps {
  cart: OrderItem[];
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
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Trim all string values
    const trimmedForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) =>
        typeof value === 'string' ? [key, value.trim()] : [key, value],
      ),
    );

    // Ensure phone number is formatted correctly
    const formattedPhone = phoneNumberFormatter(trimmedForm.phone);

    // Esnure postal code is capitalized
    const postalCode = trimmedForm.postalCode.toUpperCase();

    // Validate postal code format
    const canadianPostalCodeRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

    if (!canadianPostalCodeRegex.test(postalCode)) {
      setError('Invalid Postal Code');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/store/orders', {
        ...trimmedForm,
        phone: formattedPhone,
        postalCode,
      });

      console.log('Order submission successful. Order Id:', res.data.orderNumber);
      setOrderNumber(res.data.orderNumber);
      setForm(defaultForm);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="p-8 md:p-12">
        <h1 className="text-4xl font-bold text-brand-orange mb-4 text-center">Order Form</h1>
        <p className="text-center mb-8">Submit an order request and we’ll send you an invoice.</p>

        {!submitted ? (
          <div className="flex flex-col">
            {/* Order Form */}
            <OrderForm form={form} setForm={setForm} handleSubmit={handleSubmit} loading={loading} />

            {/* Error Message */}
            {error && <span className="text-[red] mx-auto mt-2">{error}</span>}
          </div>
        ) : (
          <OrderThanks
            orderNumber={orderNumber}
            onClick={() => {
              setOrderNumber('');
              setSubmitted(false);
            }}
          />
        )}
      </div>

      {/* 
      <div className="bg-gray-100 py-6 px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">Placeholder text goes here.</p>
        <span className="font-semibold mt-3 md:mt-0">Starting at $999</span>
      </div>
      */}
    </div>
  );
};
