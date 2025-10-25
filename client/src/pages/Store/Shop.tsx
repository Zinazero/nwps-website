import { useState } from 'react';
import { Quantity } from '../../components/forms/components/Quantity';
import type { ProductOrder } from '../../components/forms/types';
import { ShopLabel } from '../../components/ui/ShopLabel';
import { cn } from '../../utils/cn';
import type { StoreProduct } from '../types';

interface ShopProps {
  cart: ProductOrder[];
  setCart: React.Dispatch<React.SetStateAction<ProductOrder[]>>;
}

export const Shop = ({ cart, setCart }: ShopProps) => {
  const exampleProdList: StoreProduct[] = [
    { id: 1, increment: 10, title: 'Belt Seat' },
    { id: 2, increment: 5, title: 'Infant Seat' },
  ];

  const [productList, setProductList] = useState<StoreProduct[]>(exampleProdList);

  const containerClasses = cn('cursor-pointer rounded-2xl overflow-hidden', 'shadow-lg h-100 w-100');

  const handleChange = (id: number, quantity: number) => {
    setCart((prev) => prev.map((prod) => (prod.id === id ? { ...prod, quantity } : prod)));
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((prod) => prod.id !== id));
  };

  return (
    <div className="flex items-center gap-20 h-150">
      {productList.map((prod) => {
        const activeProduct = cart.find((p) => p.id === prod.id);
        return activeProduct ? (
          <div key={activeProduct.id} className="relative scale-105">
            <img
              src={`/images/store/store-${prod.id}.jpg`}
              alt={`Product ${prod.id}`}
              className={containerClasses}
            />
            <div className={cn('mt-4')}>
              <Quantity product={activeProduct} onChange={handleChange} onRemove={handleRemove} />
            </div>
            <ShopLabel text={prod.title} />
          </div>
        ) : (
          <button
            type="button"
            key={prod.id}
            className={cn(containerClasses, 'hover:scale-105 hover:shadow-xl transition relative')}
            onClick={() => setCart((prev) => [...prev, { ...prod, quantity: prod.increment }])}
          >
            <img src={`/images/store/store-${prod.id}.jpg`} alt={`Product ${prod.id}`} />
            <ShopLabel text={prod.title} />
          </button>
        );
      })}
    </div>
  );
};
