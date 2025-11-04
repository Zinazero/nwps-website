import type { MouseEvent } from 'react';
import type { LinkType } from '../layout/types';

export interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface NavbarProps {
  locationPathname: string;
  links: LinkType[];
  productsLinks: LinkType[];
  loading: boolean;
}
