import masks from '../../masks.json';
import { Image } from './Image';

interface ImageMaskProps {
  src: string;
  alt: string;
  mask: string;
  className?: string;
  priority?: boolean;
}

export const ImageMask: React.FC<ImageMaskProps> = ({ src, alt, mask, className, priority = false }) => {
  const maskSize = (masks as Record<string, { width: number; height: number }>)[mask];

  if (!maskSize) {
    console.warn('Mask size not found for', mask);
    return <Image src={src} alt={alt} className={className} priority={priority} />;
  }

  return (
    <div
      className={className}
      style={{
        width: maskSize.width,
        height: maskSize.height,
        overflow: 'hidden',
        display: 'inline-block',
        position: 'relative',
        maskImage: `url(/masks/${mask})`,
        WebkitMaskImage: `url(/masks/${mask})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskMode: 'alpha',
      }}
    >
      <Image src={src} alt={alt} className="w-full h-full object-cover relative z-10" priority={priority} />
    </div>
  );
};
