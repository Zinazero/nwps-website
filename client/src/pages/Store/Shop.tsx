import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Quantity } from '../../components/forms/components/Quantity';
import type { OrderItem } from '../../components/forms/types';
import { Image } from '../../components/ui/Image';
import { Loading } from '../../components/ui/Loading';
import { ShopLabel } from '../../components/ui/ShopLabel';
import { cn } from '../../utils/cn';
import type { StoreItem } from '../types';

interface ShopProps {
  cart: OrderItem[];
  setCart: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export const Shop = ({ cart, setCart }: ShopProps) => {
  const [productList, setProductList] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (id: number, quantity: number) => {
    setCart((prev) => prev.map((prod) => (prod.id === id ? { ...prod, quantity } : prod)));
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((prod) => prod.id !== id));
  };

  useEffect(() => {
    const fetchStoreItems = async () => {
      setLoading(true);
      try {
        const res = await api.get<StoreItem[]>('/store');
        setProductList(res.data);
      } catch (err) {
        console.error('Error fetching store items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreItems();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={cn('flex flex-col items-center gap-36 mb-40', 'md:flex-row md:gap-20')}>
          {productList.map((prod) => {
            const activeProduct = cart.find((p) => p.id === prod.id);

            return (
              <div
                key={prod.id}
                className={cn(
                  'cursor-pointer rounded-2xl relative transition-transform',
                  'shadow-lg h-60 w-60',
                  'md:h-100 md:w-100',
                  activeProduct
                    ? 'scale-105 shadow-xl border-2 border-brand-green'
                    : 'hover:scale-105 hover:shadow-xl active:scale-102',
                )}
              >
                <Image
                  src={`/images/store/store-${prod.id}.jpg`}
                  alt={`Product ${prod.id}`}
                  className="rounded-2xl w-full"
                />

                {activeProduct ? (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="mt-4"
                  >
                    <Quantity product={activeProduct} onChange={handleChange} onRemove={handleRemove} />
                  </motion.div>
                ) : (
                  <button
                    type="button"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onClick={() => setCart((prev) => [...prev, { ...prod, quantity: prod.increment }])}
                  />
                )}

                <ShopLabel text={prod.title} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
