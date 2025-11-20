export const getLogoSrc = () => {
  const CLIENT_BASE = process.env.CLIENT_BASE || 'http://localhost:5173';
  return `${CLIENT_BASE}/nwps-192x192.png`;
};
