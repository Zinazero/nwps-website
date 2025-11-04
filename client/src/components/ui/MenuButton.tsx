import { useState } from 'react';
import { cn } from '../../utils/cn';

interface MenuButtonProps {
  onClick?: () => void;
}

export const MenuButton = ({ onClick }: MenuButtonProps) => {
  const [open, setOpen] = useState(false);

  const barClasses = 'absolute block h-0.5 w-6 bg-black transition-all duration-300 ease-in-out';

  const buttonClick = () => {
    if (onClick) onClick();
    setOpen(!open);
  };

  return (
    <button
      type="button"
      onClick={buttonClick}
      className="relative w-8 h-8 flex flex-col justify-center items-center"
    >
      <span className={cn(barClasses, open ? 'rotate-45 translate-y-0' : '-translate-y-2')} />
      <span className={cn(barClasses, open ? 'opacity-0' : 'opacity-100')} />
      <span className={cn(barClasses, open ? '-rotate-45 translate-y-0' : 'translate-y-2')} />
      <div
        className={cn(
          'absolute inset-0 transition-transform duration-500 ease-in-out',
          open ? 'rotate-180' : 'rotate-0',
        )}
      ></div>
    </button>
  );
};
