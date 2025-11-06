import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { OrderForm } from '../../components/forms/OrderForm';
import type { OrderFormValues, OrderItem } from '../../components/forms/types';
import { Image } from '../../components/ui/Image';
import { scrollUp } from '../../components/ui/ScrollToTop';
import { ShopLabel } from '../../components/ui/ShopLabel';
import { cn } from '../../utils/cn';
import { largeNumberFormatter } from '../../utils/largeNumberFormatter';
import { phoneNumberFormatter } from '../../utils/phoneNumberFormatter';
import { OrderThanks } from './components/OrderThanks';

export const Order = () => {
  const [cart, setCart] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem('cart');
      return [];
    }
  });

  const navigate = useNavigate();

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
      localStorage.removeItem('cart');
      setCart([]);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  scrollUp();

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 relative">
      <div className="flex flex-col items-center w-full max-w-6xl">
        <div className={cn('flex flex-col mt-8 md:flex-row gap-8 w-full justify-center', 'md:gap-16')}>
          {/* CART DISPLAY */}
          <AnimatePresence mode="wait">
            {!submitted && (
              <motion.section
                key="cart-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn('flex gap-4', 'md:flex-col md:gap-10')}
              >
                {cart.map((prod) => (
                  <div
                    key={prod.id}
                    className={cn(
                      'flex flex-col items-center bg-white w-1/2 shadow-lg rounded-2xl overflow-hidden',
                      'border border-gray-100 hover:shadow-xl transition relative',
                      'md:h-65 md:w-65',
                    )}
                  >
                    <Image
                      src={`/images/store/store-${prod.id}.jpg`}
                      alt={`Product ${prod.id}`}
                      className="w-full"
                    />
                    <ShopLabel text={`${largeNumberFormatter(prod.quantity)}`} />
                  </div>
                ))}
              </motion.section>
            )}
          </AnimatePresence>

          {/* ORDER SUMMARY */}
          <section>
            <div
              className={cn(
                'max-w-3xl w-full bg-white shadow-lg rounded-2xl overflow-hidden',
                'md:min-w-180',
              )}
            >
              <div className={cn('p-8', 'md:p-12')}>
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
                      <p className="text-center mb-8">
                        Submit an order request and we’ll send you an invoice.
                      </p>

                      <OrderForm
                        form={form}
                        setForm={setForm}
                        handleSubmit={handleSubmit}
                        loading={loading}
                      />

                      {/* Error Message */}
                      {error && <span className="text-[red] mx-auto mt-2">{error}</span>}

                      {/* Return to Store */}
                      <Link
                        to="/store"
                        className={cn(
                          'absolute top-10 left-10 flex items-center gap-2 text-brand-orange',
                          'font-bold text-lg hover:text-brand-blue active:scale-95 transition',
                        )}
                      >
                        <FontAwesomeIcon icon={faArrowLeftLong} /> Continue Shopping
                      </Link>
                    </motion.div>
                  ) : (
                    <OrderThanks
                      orderNumber={orderNumber}
                      onClick={() => {
                        setOrderNumber('');
                        setSubmitted(false);
                        navigate('/store');
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
        </div>
      </div>
    </div>
  );
};
