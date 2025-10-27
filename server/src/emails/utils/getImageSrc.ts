export const getLogoSrc = () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
  return `${BASE_URL}/nwps-192x192.png`;
};
