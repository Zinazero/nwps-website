import { Image } from './Image';

interface ImageMaskProps {
	src: string;
	alt: string;
	maskUrl: string;
	className?: string;
}

export const ImageMask: React.FC<ImageMaskProps> = ({
	src,
	alt,
	maskUrl,
	className
}) => {
	return (
		<div
			className={`inline-block relative overflow-hidden ${className}`}
			style={{
				backgroundColor: '#fff',
				mask: `url(${maskUrl})`,
				WebkitMask: `url(${maskUrl})`,
				WebkitMaskComposite: 'destination-in',
				maskRepeat: 'no-repeat',
				WebkitMaskRepeat: 'no-repeat',
				maskSize: 'contain',
				WebkitMaskSize: 'contain',
				maskPosition: 'center',
				WebkitMaskPosition: 'center',
				maskMode: 'alpha',
			}}
		>
			<Image
				src={src}
				alt={alt}
				className='w-full h-full object-cover relative z-10'
			/>
		</div>
	);
};
