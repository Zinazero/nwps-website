import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import nwpsVeritcalLogo from '../../assets/logos/nwps-vertical-logo.svg';
import type { OrderItem } from '../../components/forms/types';
import { ShopLabel } from '../../components/ui/ShopLabel';
import { cn } from '../../utils/cn';
import { largeNumberFormatter } from '../../utils/largeNumberFormatter';
import { Order } from './Order';
import { Shop } from './Shop';

export const Store = () => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12 relative">
      <div className="flex flex-col items-center w-full max-w-6xl">
        <AnimatePresence mode={'wait'}>
          {!isCheckout ? (
            <motion.div
              key="shop"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* LOGO */}
              <img src={nwpsVeritcalLogo} alt="New World Park Solutions Logo" className="w-50 mb-6" />

              {/* HEADER */}
              <header className="text-center mb-10 space-y-3">
                <h1 className="text-5xl font-extrabold text-brand-orange tracking-tight">
                  Swing Supply Store
                </h1>
                <p className="text-lg text-brand-blue! max-w-md mx-auto">
                  Get the best deal on swing seats in just a few clicks.
                </p>
              </header>
              {/* SHOP */}
              <Shop cart={cart} setCart={setCart} />

              {/* FOOTER ACTIONS */}
              <div className="mt-10 flex flex-col items-center space-y-6">
                {cart.length > 0 && (
                  <>
                    <p className="text-lg font-medium">
                      {largeNumberFormatter(totalItems)} item{totalItems !== 1 && 's'} in cart
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCheckout(true)}
                      className={cn(
                        'px-8 py-3 bg-brand-orange hover:bg-brand-blue transition-all',
                        'text-white font-semibold rounded-xl shadow-md active:scale-95',
                      )}
                    >
                      Proceed to Checkout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              className="flex flex-col md:flex-row gap-16 w-full justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* CART DISPLAY */}
              <section className="flex flex-col gap-10">
                {cart.map((prod) => (
                  <div
                    key={prod.id}
                    className={cn(
                      'flex flex-col items-center bg-white h-[260px] w-[220px] shadow-lg rounded-2xl overflow-hidden',
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
              </section>

              {/* ORDER SUMMARY */}
              <Order cart={cart} />
              <button
                type="button"
                onClick={() => setIsCheckout(false)}
                className={cn(
                  'absolute top-10 left-10 flex items-center gap-2 text-brand-orange',
                  'font-bold text-lg hover:text-brand-blue active:scale-95 transition',
                )}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} /> Continue Shopping
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};
