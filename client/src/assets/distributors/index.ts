const images = import.meta.glob('./*.{jpg,png,webp}', { eager: true, import: 'default' });
export const imageArray: string[] = Object.values(images) as string[];
