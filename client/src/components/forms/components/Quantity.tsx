import { useId } from 'react';
import { cn } from '../../../utils/cn';
import type { OrderItem } from '../types';

interface QuantityProps {
  product: OrderItem;
  onChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const Quantity = ({ product, onChange, onRemove }: QuantityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(product.id, Number(e.target.value));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inc = product.increment;
    const value = Number(e.target.value);
    const rounded = Math.max(inc, Math.round(value / inc) * inc); // round to nearest multiple of {increment}, min {increment}
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
        className="w-full"
        required
      />
      <button
        type="button"
        onClick={() => onRemove(product.id)}
        className={cn('mx-auto mt-2 text-sm text-red active:scale-95')}
      >
        Remove
      </button>
    </div>
  );
};
