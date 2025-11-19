import { CLIENT_BASE, MODE, OPTIMIZER_BASE } from '../config';

export const getOptimizedImageUrl = (src: string, width?: number, quality = 80, format = 'webp', dpr = 1) => {
  if (src.endsWith('.svg') || MODE === 'development') return src;

  const absoluteSrc = src.startsWith('http') ? src : `${CLIENT_BASE}${src}`;

  const params = new URLSearchParams({
    src: absoluteSrc,
    q: quality.toString(),
    format,
  });
  if (width) params.set('w', (width * dpr).toString());

  return `${OPTIMIZER_BASE}/image?${params.toString()}`;
};
