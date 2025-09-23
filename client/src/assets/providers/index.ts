// Vite returns Record<string, string>
const images: Record<string, string> = import.meta.glob('./*.{jpg,png,webp}', {
	eager: true,
	import: 'default',
});

export interface ImageItem {
	name: string;
	src: string;
}

export const imageArray: ImageItem[] = Object.entries(images).map(
	([path, src]) => {
		const fileName = path.split('/').pop() ?? '';
		const name = fileName.replace(/\.[^/.]+$/, '');
		return { name, src };
	}
);
