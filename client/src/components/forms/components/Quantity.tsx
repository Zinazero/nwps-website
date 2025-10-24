import { useId } from 'react';
import { cn } from '../../../utils/cn';
import type { QuantityValue } from '../types';

interface QuantityProps {
  form: QuantityValue;
  onChange: <K extends keyof QuantityValue>(name: K, value: QuantityValue[K]) => void;
}

export const Quantity = ({ form, onChange }: QuantityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name as keyof QuantityValue, Number(e.target.value));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const rounded = Math.max(5, Math.round(value / 5) * 5); // round to nearest multiple of 5, min 5
    onChange(e.target.name as keyof QuantityValue, rounded);
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
        value={form.quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        min={5}
        step={5}
        required
      />
    </div>
  );
};
