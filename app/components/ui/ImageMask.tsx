import React, { useEffect, useRef, useState } from 'react';
import { Image as AppImage } from './Image';
import { Loading } from './Loading';

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
	className,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [maskSize, setMaskSize] = useState<{
		width: number;
		height: number;
	} | null>(null);

	useEffect(() => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.src = maskUrl;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			ctx.drawImage(img, 0, 0);
			const imageData = ctx.getImageData(0, 0, img.width, img.height);
			const data = imageData.data;

			let minX = img.width,
				minY = img.height,
				maxX = 0,
				maxY = 0;
			for (let y = 0; y < img.height; y++) {
				for (let x = 0; x < img.width; x++) {
					const alpha = data[(y * img.width + x) * 4 + 3];
					if (alpha > 0) {
						if (x < minX) minX = x;
						if (y < minY) minY = y;
						if (x > maxX) maxX = x;
						if (y > maxY) maxY = y;
					}
				}
			}

			setMaskSize({ width: maxX - minX + 1, height: maxY - minY + 1 });
		};
	}, [maskUrl]);

	if (!maskSize) return <Loading />;

	return (
		<div
			ref={containerRef}
			className={className}
			style={{
				width: maskSize.width,
				height: maskSize.height,
				overflow: 'hidden',
				display: 'inline-block',
				position: 'relative',
				maskImage: `url(${maskUrl})`,
				WebkitMaskImage: `url(${maskUrl})`,
				maskRepeat: 'no-repeat',
				WebkitMaskRepeat: 'no-repeat',
				maskSize: 'contain',
				WebkitMaskSize: 'contain',
				maskPosition: 'center',
				WebkitMaskPosition: 'center',
				maskMode: 'alpha',
			}}
		>
			<AppImage
				src={src}
				alt={alt}
				className='w-full h-full object-cover relative z-10'
			/>
		</div>
	);
};
