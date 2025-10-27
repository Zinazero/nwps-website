import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { getOptimizedImageUrl } from '../../utils/getOptimizedImageUrl';

interface ImageProps {
  src: string;
  alt: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
  className?: string;
  priority?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  quality = 80,
  format = 'webp',
  className,
  priority = false,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(priority);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Lazy-load for non-priority images
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '100px', threshold: 0.1 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Generate srcSet for 1x, 2x, 3x DPR
  const srcSet = visible
    ? [1, 2, 3]
        .map((dpr) => {
          const url = getOptimizedImageUrl(src, undefined, quality, format, dpr);
          return `${url} ${dpr}x`;
        })
        .join(', ')
    : undefined;

  const optimizedSrc = visible ? getOptimizedImageUrl(src, undefined, quality, format) : undefined;

  return (
    <span ref={containerRef}>
      {!error && optimizedSrc && (
        <motion.img
          src={optimizedSrc}
          srcSet={srcSet}
          alt={alt}
          draggable={false}
          initial={priority ? {} : { opacity: 0, scale: 0.95 }}
          animate={priority ? {} : { opacity: 1, scale: 1 }}
          transition={priority ? {} : { duration: 0.5, ease: 'easeOut' }}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          style={{ display: loading ? 'none' : 'block' }}
          className={className}
        />
      )}
      {error && <div>Error loading image</div>}
    </span>
  );
};
