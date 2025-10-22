export const getLogoSrc = () => {
	const isDev = process.env.NODE_ENV !== 'production';
	const baseUrl = isDev ? 'http://localhost:5173' : 'https://newworldparksolutions.ca';
	return `${baseUrl}/nwps-192x192.png`;
};
