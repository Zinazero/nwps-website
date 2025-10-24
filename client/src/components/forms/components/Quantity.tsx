import { useId } from 'react';
import { cn } from '../../../utils/cn';
import type { ProductOrder } from '../types';

interface QuantityProps {
  product: ProductOrder;
  onChange: (id: number, quantity: number) => void;
}

export const Quantity = ({ product, onChange }: QuantityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(product.id, Number(e.target.value));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const rounded = Math.max(5, Math.round(value / 5) * 5); // round to nearest multiple of 5, min 5
    onChange(product.id, rounded);
  };

  const quantityId = useId();

  return (
    <div className={cn('flex flex-col')}>
      <label htmlFor={quantityId} className={cn('font-bold mb-1')}>
        Quantity
      </label>
      <input
        type="number"
        id={quantityId}
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        min={product.increment}
        step={product.increment}
        required
      />
    </div>
  );
};
