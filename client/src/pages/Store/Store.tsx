import { useState } from 'react';
import type { ProductOrder } from '../../components/forms/types';
import { cn } from '../../utils/cn';
import { Order } from './Order';
import { Shop } from './Shop';

export const Store = () => {
  const [cart, setCart] = useState<ProductOrder[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="flex flex-col space-y-40">
        {!isCheckout ? (
          <Shop cart={cart} setCart={setCart} />
        ) : (
          <div className="flex gap-30">
            {/* Cart Display */}
            <div className="flex gap-10">
              {cart.map((prod) => (
                <div
                  key={prod.id}
                  className={cn(
                    'flex flex-col items-center bg-white h-110 shadow-lg rounded-2xl overflow-hidden',
                  )}
                >
                  <img
                    src={`/images/store/store-${prod.id}.jpg`}
                    alt={`Product ${prod.id}`}
                    className={cn('h-100 w-100')}
                  />
                  <span className="text-xl font-bold text-brand-green">{prod.quantity}</span>
                </div>
              ))}
            </div>

            {/* Order */}
            <Order cart={cart} />
          </div>
        )}

        {/* Checkout Button */}
        {cart.length > 0 && (
          <button
            type="button"
            onClick={() => setIsCheckout(true)}
            className={cn(
              'p-2 bg-brand-orange hover:bg-brand-blue transition',
              'text-light font-bold rounded-lg active:scale-95 cursor-pointer',
            )}
          >
            Checkout
          </button>
        )}
      </div>
    </main>
  );
};
