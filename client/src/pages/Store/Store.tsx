import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { OrderItem } from '../../components/forms/types';
import { cn } from '../../utils/cn';
import { largeNumberFormatter } from '../../utils/largeNumberFormatter';
import { Shop } from './Shop';

export const Store = () => {
  const [cart, setCart] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem('cart');
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 relative">
      <div className="flex flex-col items-center w-full max-w-6xl">
        {/* LOGO */}
        <img src="/logos/nwps-vertical-logo.svg" alt="New World Park Solutions Logo" className="w-50 mb-6" />

        {/* HEADER */}
        <header className="text-center mb-10 space-y-3">
          <h1 className={cn('text-4xl font-extrabold text-brand-orange tracking-tight', 'md:text-5xl')}>
            Swing Supply Store
          </h1>
          <p className="text-lg text-brand-blue! max-w-md mx-auto">
            Get the best deal on swing seats in just a few clicks.
          </p>
        </header>
        {/* SHOP */}
        <Shop cart={cart} setCart={setCart} />

        {/* FOOTER ACTIONS */}
        <div className={'mt-10 flex flex-col items-center space-y-6'}>
          {cart.length > 0 && (
            <>
              <p className="text-lg font-medium">
                {largeNumberFormatter(totalItems)} item{totalItems !== 1 && 's'} in cart
              </p>
              <Link
                to="checkout"
                state={{}}
                className={cn(
                  'px-8 py-3 bg-brand-orange hover:bg-brand-blue transition-all',
                  'text-white font-semibold rounded-xl shadow-md active:scale-95',
                )}
              >
                Proceed to Checkout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
