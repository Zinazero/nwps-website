import { useState } from 'react';
import api from '../../api/axios';
import { OrderForm } from '../../components/forms/OrderForm';
import type { OrderFormValues, OrderItem } from '../../components/forms/types';
import { phoneNumberFormatter } from '../../utils/phoneNumberFormatter';
import { OrderThanks } from './components/OrderThanks';
import { ShopLabel } from '../../components/ui/ShopLabel';
import { largeNumberFormatter } from '../../utils/largeNumberFormatter';
import { cn } from '../../utils/cn';
import { AnimatePresence, motion } from 'framer-motion';

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
    <>
      {/* CART DISPLAY */}
      <AnimatePresence mode="wait">
        {!submitted && (
          <motion.section
            key="cart-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-10"
          >
            {cart.map((prod) => (
              <div
                key={prod.id}
                className={cn(
                  'flex flex-col items-center bg-white h-65 w-60 shadow-lg rounded-2xl overflow-hidden',
                  'border border-gray-100 hover:shadow-xl transition relative',
                )}
              >
                <img
                  src={`/images/store/store-${prod.id}.jpg`}
                  alt={`Product ${prod.id}`}
                  className="w-full object-cover"
                />
                <ShopLabel text={`${largeNumberFormatter(prod.quantity)}`} />
              </div>
            ))}
          </motion.section>
        )}
      </AnimatePresence>

      {/* ORDER SUMMARY */}
      <section>
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl overflow-hidden min-w-180">
          <div className="p-8 md:p-12">

            {/* Order Form */}
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="order-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col"
                >
                  <h1 className="text-4xl font-bold text-brand-orange mb-4 text-center">Order Form</h1>
                  <p className="text-center mb-8">Submit an order request and we’ll send you an invoice.</p>

                  <OrderForm form={form} setForm={setForm} handleSubmit={handleSubmit} loading={loading} />

                  {/* Error Message */}
                  {error && <span className="text-[red] mx-auto mt-2">{error}</span>}
                </motion.div>
              ) : (
                <OrderThanks
                  orderNumber={orderNumber}
                  onClick={() => {
                    setOrderNumber('');
                    setSubmitted(false);
                  }}
                />
              )}
            </AnimatePresence>

          </div>

          {/* 
          <div className="bg-gray-100 py-6 px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">Placeholder text goes here.</p>
          <span className="font-semibold mt-3 md:mt-0">Starting at $999</span>
          </div>
          */}
        </div>
      </section>
    </>
  );
};
