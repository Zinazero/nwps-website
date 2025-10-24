import type { MouseEvent } from 'react';

export interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
