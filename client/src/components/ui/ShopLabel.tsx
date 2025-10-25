import { cn } from '../../utils/cn';

interface ShopLabelProps {
  text: string;
}

export const ShopLabel = ({ text }: ShopLabelProps) => (
  <div
    className={cn(
      'absolute top-0 w-full h-10 bg-black/10 rounded-t-2xl',
      'flex items-center justify-center text-brand-blue text-lg',
    )}
  >
    {text}
  </div>
);
