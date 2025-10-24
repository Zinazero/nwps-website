import { useState } from 'react';
import { Loading } from './Loading';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <>
      {loading && <Loading />}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={className}
          draggable={false}
          style={{ display: loading ? 'none' : 'block' }}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
        />
      )}
      {error && <div>Error loading image</div>}
    </>
  );
};
