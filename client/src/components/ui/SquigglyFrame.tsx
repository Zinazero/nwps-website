import { Image } from "./Image";

interface SquigglyFrameProps {
	src: string;
	alt: string;
	maskUrl: string;
	width?: string | number;
	height?: string | number;
}

export const SquigglyFrame: React.FC<SquigglyFrameProps> = ({
	src,
	alt,
	maskUrl,
	width = '100%',
	height = 'auto',
}) => {
	return (
		<div
			className='inline-block relative'
			style={{
				width,
				height,
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
